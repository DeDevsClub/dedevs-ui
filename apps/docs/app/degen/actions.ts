'use server'

import { v0 } from 'v0-sdk'
import { validateSubscriptionAndUsage } from '@/lib/subscription'
import { recordAIUsage } from '@/actions/ai-usage'
import { getCurrentUserId } from '@/lib/shared'
import { SubscriptionRequiredError } from '@/types/errors'

export interface ChatFile {
  name: string
  content: string
  lang?: string
  meta?: Record<string, any>
  source?: string
}

export interface ChatResponse {
  id: string
  url: string
  demo: string
  files?: ChatFile[]
}

export interface SendMessageResponse {
  files?: ChatFile[]
}

export async function createChat(message: string): Promise<ChatResponse> {
  try {
    // Check usage limits and subscription status
    const userId = await getCurrentUserId();
    const validation = await validateSubscriptionAndUsage(userId);
    
    if (!validation.canProceed) {
      throw new SubscriptionRequiredError(
        validation.error || 'Usage limit exceeded',
        { requestsRemaining: validation.requestsRemaining }
      );
    }

    const chat = await v0.chats.create({
      message: message.trim()
    })

    // Transform v0 files to our expected format
    const transformedFiles = chat.files?.map((file: any) => ({
      name: file.name || file.path || 'component.tsx',
      content: file.source || file.content || '',
      lang: file.lang || 'tsx',
      meta: file.meta || {},
      source: file.source || file.content || ''
    }))

    // Record usage after successful API call
    await recordAIUsage({
      promptTokens: message.length, // Approximate token count
      completionTokens: chat.files?.reduce((acc, file: any) => acc + ((file.source || file.content)?.length || 0), 0) || 0
    });

    return {
      id: chat.id || '',
      url: chat.url || '',
      demo: chat.demo || '',
      files: transformedFiles
    }
  } catch (error) {
    console.error('Error creating chat:', error)
    
    if (error instanceof SubscriptionRequiredError) {
      throw error;
    }
    
    throw new Error('Failed to create chat with v0 API')
  }
}

export async function sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
  try {
    // Check usage limits for follow-up messages too
    const userId = await getCurrentUserId();
    const validation = await validateSubscriptionAndUsage(userId);
    
    if (!validation.canProceed) {
      throw new SubscriptionRequiredError(
        validation.error || 'Usage limit exceeded',
        { requestsRemaining: validation.requestsRemaining }
      );
    }

    const response = await v0.chats.sendMessage({
      chatId,
      message: message.trim()
    })

    // Transform v0 files to our expected format
    const transformedFiles = response.files?.map((file: any) => ({
      name: file.name || file.path || 'component.tsx',
      content: file.source || file.content || '',
      lang: file.lang || 'tsx',
      meta: file.meta || {},
      source: file.source || file.content || ''
    }))

    // Record usage for follow-up messages
    await recordAIUsage({
      promptTokens: message.length,
      completionTokens: response.files?.reduce((acc, file: any) => acc + ((file.source || file.content)?.length || 0), 0) || 0
    });

    return {
      files: transformedFiles
    }
  } catch (error) {
    console.error('Error sending message:', error)
    
    if (error instanceof SubscriptionRequiredError) {
      throw error;
    }
    
    throw new Error('Failed to send message to v0 API')
  }
}

export async function validateApiKey(): Promise<boolean> {
  try {
    // Try to create a simple test chat to validate the API key
    await v0.chats.create({
      message: 'test'
    })
    return true
  } catch (error) {
    console.error('API key validation failed:', error)
    return false
  }
}
