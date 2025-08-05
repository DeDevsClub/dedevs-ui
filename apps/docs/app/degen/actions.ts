'use server'

import { v0 } from 'v0-sdk'

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

    return {
      id: chat.id || '',
      url: chat.url || '',
      demo: chat.demo || '',
      files: transformedFiles
    }
  } catch (error) {
    console.error('Error creating chat:', error)
    throw new Error('Failed to create chat with v0 API')
  }
}

export async function sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
  try {
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

    return {
      files: transformedFiles
    }
  } catch (error) {
    console.error('Error sending message:', error)
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
