"use client"

import { useState, useEffect } from "react"
import { EyeIcon, EyeOffIcon, KeyIcon, CheckIcon, XIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ApiKeyStorage from "./api-key-storage"

interface ApiKeyInputProps {
    onApiKeySet: (apiKey: string) => void
    onApiKeyCleared: () => void
    isOpen: boolean
    onClose: () => void
}

export default function ApiKeyInput({ onApiKeySet, onApiKeyCleared, isOpen, onClose }: ApiKeyInputProps) {
    const [apiKey, setApiKey] = useState("")
    const [showApiKey, setShowApiKey] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    const [validationResult, setValidationResult] = useState<{
        isValid: boolean | null
        message: string
        user?: any
    }>({ isValid: null, message: "" })
    const [saveForFuture, setSaveForFuture] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    // Load existing API key on mount
    useEffect(() => {
        if (isOpen) {
            const existingKey = ApiKeyStorage.getApiKey()
            if (existingKey) {
                setApiKey(existingKey)
                // Auto-validate existing key
                validateApiKey(existingKey)
            }
        }
    }, [isOpen])

    // Validate API key format
    const isValidFormat = (key: string): boolean => {
        // v0 API keys typically start with 'v0_' and are followed by alphanumeric characters
        const v0KeyPattern = /^v0_[a-zA-Z0-9_-]{32,}$/
        return v0KeyPattern.test(key.trim())
    }

    // Validate API key with the API
    const validateApiKey = async (keyToValidate: string) => {
        if (!keyToValidate.trim()) {
            setValidationResult({ isValid: null, message: "" })
            return
        }

        if (!isValidFormat(keyToValidate)) {
            setValidationResult({
                isValid: false,
                message: 'Invalid API key format. Keys should start with "v0_" followed by at least 32 characters.',
            })
            return
        }

        setIsValidating(true)
        setValidationResult({ isValid: null, message: "Validating..." })

        try {
            // Test the API key by making a request to the validation endpoint
            const response = await fetch("/api/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ apiKey: keyToValidate.trim() }),
            })

            const data = await response.json()

            if (response.ok && data.valid) {
                setValidationResult({
                    isValid: true,
                    message: `Valid API key! Connected as ${data.user?.name || data.user?.email || "user"}.`,
                    user: data.user,
                })
            } else {
                setValidationResult({
                    isValid: false,
                    message: data.message || "Invalid API key. Please check your key and try again.",
                })
            }
        } catch (error) {
            setValidationResult({
                isValid: false,
                message: "Failed to validate API key. Please check your connection and try again.",
            })
        } finally {
            setIsValidating(false)
        }
    }

    // Handle API key input change
    const handleApiKeyChange = (value: string) => {
        setApiKey(value)
        // Clear previous validation when user types
        if (validationResult.isValid !== null) {
            setValidationResult({ isValid: null, message: "" })
        }
    }

    // Handle save API key
    const handleSaveApiKey = () => {
        if (!apiKey.trim() || validationResult.isValid !== true) return

        // Store the API key
        ApiKeyStorage.storeApiKey(apiKey.trim(), saveForFuture)

        // Notify parent component
        onApiKeySet(apiKey.trim())

        // Close dialog
        onClose()
    }

    // Handle clear API key
    const handleClearApiKey = () => {
        ApiKeyStorage.clearApiKey()
        setApiKey("")
        setValidationResult({ isValid: null, message: "" })
        onApiKeyCleared()
    }

    // Handle test API key
    const handleTestApiKey = () => {
        if (apiKey.trim()) {
            validateApiKey(apiKey.trim())
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyIcon className="h-5 w-5" />
                        Configure v0 API Key
                    </DialogTitle>
                    <DialogDescription>
                        Enter your v0 API key to start generating applications. Your key will be stored securely in your browser.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* API Key Input */}
                    <div className="space-y-2">
                        <label htmlFor="api-key" className="text-sm font-medium">
                            v0 API Key
                        </label>
                        <div className="relative">
                            <input
                                id="api-key"
                                type={showApiKey ? "text" : "password"}
                                value={apiKey}
                                onChange={(e) => handleApiKeyChange(e.target.value)}
                                placeholder="v0_..."
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                disabled={isValidating}
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                            >
                                {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Validation Status */}
                        {(validationResult.message || isValidating) && (
                            <div
                                className={`flex items-center gap-2 text-sm ${validationResult.isValid === true
                                    ? "text-green-600"
                                    : validationResult.isValid === false
                                        ? "text-red-600"
                                        : "text-gray-600"
                                    }`}
                            >
                                {isValidating ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600" />
                                ) : validationResult.isValid === true ? (
                                    <CheckIcon className="h-4 w-4" />
                                ) : validationResult.isValid === false ? (
                                    <XIcon className="h-4 w-4" />
                                ) : null}
                                <span>{validationResult.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Save for Future Use */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">Save for future sessions</label>
                            <p className="text-xs text-gray-500">Store your API key in browser local storage</p>
                        </div>
                        <Switch checked={saveForFuture} onCheckedChange={setSaveForFuture} />
                    </div>

                    {/* How to Get API Key */}
                    <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                                <span className="flex items-center gap-2 text-sm text-blue-600">
                                    <InfoIcon className="h-4 w-4" />
                                    How to get your v0 API key
                                </span>
                                <span className="text-xs text-gray-400">{showExplanation ? "Hide" : "Show"}</span>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 pt-3">
                            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                                <h4 className="font-medium text-blue-900">Getting Your API Key:</h4>
                                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                                    <li>
                                        Visit{" "}
                                        <a
                                            href="https://v0.dev/settings"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:no-underline"
                                        >
                                            v0.dev/settings
                                        </a>
                                    </li>
                                    <li>Sign in to your v0 account</li>
                                    <li>Navigate to the "API Keys" section</li>
                                    <li>Click "Create New API Key"</li>
                                    <li>Copy the generated key (starts with "v0_")</li>
                                </ol>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <h4 className="font-medium text-gray-900">How Your Key is Used:</h4>
                                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                    <li>Authenticate requests to the v0 Platform API</li>
                                    <li>Generate and manage your AI applications</li>
                                    <li>Access your v0 projects and chat history</li>
                                    <li>Deploy applications to Vercel (if configured)</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 space-y-2">
                                <h4 className="font-medium text-green-900">Security & Privacy:</h4>
                                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                    <li>Your API key is encrypted before storage</li>
                                    <li>Keys are never sent to our servers unencrypted</li>
                                    <li>Session storage is cleared when you close the browser</li>
                                    <li>You can clear your stored key at any time</li>
                                </ul>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-4">
                        <div className="flex gap-2">
                            <Button
                                onClick={handleTestApiKey}
                                variant="outline"
                                disabled={!apiKey.trim() || isValidating}
                                className="flex-1 bg-transparent"
                            >
                                {isValidating ? "Testing..." : "Test Key"}
                            </Button>
                            <Button
                                onClick={handleSaveApiKey}
                                disabled={!apiKey.trim() || validationResult.isValid !== true}
                                className="flex-1"
                            >
                                Save & Use Key
                            </Button>
                        </div>

                        {/* Clear Key Button (only show if key exists) */}
                        {ApiKeyStorage.hasApiKey() && (
                            <Button
                                onClick={handleClearApiKey}
                                variant="outline"
                                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                Clear Stored Key
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
