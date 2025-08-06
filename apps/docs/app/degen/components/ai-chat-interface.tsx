'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Loader2, Send, Copy, Download, Eye, Code, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { createChat, sendMessage, type ChatResponse } from '../actions'
import { useUsageLimit } from '@/hooks/use-usage-limit'
import { UsageLimitBanner } from './usage-limit-banner'
import { SubscriptionRequiredError } from '@/types/errors'

interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

interface GeneratedComponent {
    id: string
    name: string
    content: string
    preview?: string
}



export function AiChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentChat, setCurrentChat] = useState<ChatResponse | null>(null)
    const [generatedComponents, setGeneratedComponents] = useState<GeneratedComponent[]>([])
    const [activeTab, setActiveTab] = useState('chat')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    
    // Usage limit management
    const { isSubscribed, requestsUsed, requestsRemaining, isLoading: usageLoading, refreshUsage } = useUsageLimit()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const createNewChat = async (message: string) => {
        try {
            setIsLoading(true)

            // Add user message to chat
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: message,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, userMessage])

            // Create chat with v0 via server action
            const chat = await createChat(message)

            setCurrentChat(chat)

            // Add assistant response
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I've created a component based on your request: "${message}". You can view it in the preview tab or see the generated code.`,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, assistantMessage])

            // Process generated files if available
            if (chat.files && chat.files.length > 0) {
                const components = chat.files.map((file, index) => ({
                    id: `${chat.id}-${index}`,
                    name: file.name,
                    content: file.content,
                    preview: chat.demo
                }))
                setGeneratedComponents(components)
                setActiveTab('preview')
            }

            // Refresh usage data after successful generation
            await refreshUsage()
            toast.success('Component generated successfully!')
        } catch (error) {
            console.error('Error creating chat:', error)
            
            if (error instanceof SubscriptionRequiredError) {
                toast.error(error.message)
                await refreshUsage() // Refresh to show updated usage
            } else {
                toast.error('Failed to generate component. Please try again.')
            }

            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error while generating your component. Please try again with a different prompt.',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const continueChat = async (message: string) => {
        if (!currentChat) {
            await createNewChat(message)
            return
        }

        try {
            setIsLoading(true)

            // Add user message
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: message,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, userMessage])

            // Send follow-up message via server action
            const response = await sendMessage(currentChat.id, message)

            // Add assistant response
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I've updated the component based on your feedback: "${message}". Check the preview for the changes.`,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, assistantMessage])

            // Update components if new files are available
            if (response.files && response.files.length > 0) {
                const updatedComponents = response.files.map((file, index) => ({
                    id: `${currentChat.id}-updated-${index}`,
                    name: file.name,
                    content: file.content,
                    preview: currentChat.demo
                }))
                setGeneratedComponents(updatedComponents)
            }

            // Refresh usage data after successful update
            await refreshUsage()
            toast.success('Component updated successfully!')
        } catch (error) {
            console.error('Error continuing chat:', error)
            
            if (error instanceof SubscriptionRequiredError) {
                toast.error(error.message)
                await refreshUsage() // Refresh to show updated usage
            } else {
                toast.error('Failed to update component. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return
        
        // Check if user has reached their limit
        if (!isSubscribed && requestsRemaining <= 0) {
            toast.error('You\'ve reached your free limit. Please upgrade to continue.')
            return
        }

        const message = input.trim()
        setInput('')

        if (messages.length === 0) {
            await createNewChat(message)
        } else {
            await continueChat(message)
        }
    }

    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content)
            toast.success('Code copied to clipboard!')
        } catch (error) {
            toast.error('Failed to copy code')
        }
    }

    const downloadComponent = (component: GeneratedComponent) => {
        const blob = new Blob([component.content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = component.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Component downloaded!')
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">AI Component Generator</h1>
                </div>
                <p className="text-muted-foreground">
                    Describe the UI component you want, and I'll generate it for you using v0.dev
                </p>
            </div>

            {/* Usage Limit Banner */}
            <UsageLimitBanner 
                isSubscribed={isSubscribed}
                requestsUsed={requestsUsed}
                requestsRemaining={requestsRemaining}
                isLoading={usageLoading}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat" className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Chat
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Code
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4">
                    <Card className="h-[500px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Chat with AI</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>Start by describing the component you want to create</p>
                                            <p className="text-sm mt-2">
                                                Example: "Create a responsive pricing card with three tiers"
                                            </p>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                                    }`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {message.timestamp.toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span className="text-sm">Generating component...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            <Separator className="my-4" />

                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={!isSubscribed && requestsRemaining <= 0 
                                        ? "Upgrade to Pro to continue generating components..."
                                        : "Describe the component you want to create..."
                                    }
                                    className="flex-1 min-h-[60px] resize-none"
                                    disabled={!isSubscribed && requestsRemaining <= 0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSubmit(e)
                                        }
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    disabled={!input.trim() || isLoading || (!isSubscribed && requestsRemaining <= 0)}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Component Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {currentChat ? (
                                <div className="border rounded-lg overflow-hidden">
                                    <iframe
                                        src={currentChat.demo}
                                        width="100%"
                                        height="600"
                                        className="border-0"
                                        title="Component Preview"
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No component generated yet</p>
                                    <p className="text-sm mt-2">
                                        Start a chat to generate your first component
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                    {generatedComponents.length > 0 ? (
                        <div className="space-y-4">
                            {generatedComponents.map((component) => (
                                <Card key={component.id}>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{component.name}</CardTitle>
                                            {/* <Badge variant="secondary text-xs" className="mt-1">
                                                Generated Component
                                            </Badge> */}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(component.content)}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => downloadComponent(component)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px]">
                                            <pre lang="tsx" className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                                                <code className="language-tsx" lang="tsx">{component.content}</code>
                                            </pre>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center text-muted-foreground py-12">
                                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No code generated yet</p>
                                <p className="text-sm mt-2">
                                    Generate a component to see the code here
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
