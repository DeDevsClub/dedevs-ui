"use client"

import { useState } from "react"
import { RefreshCw, ExternalLink, Key, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import ApiKeyInput from "./api-key-input"

export default function ApiKeyError() {
    const [isRetrying, setIsRetrying] = useState(false)
    const [showApiKeyInput, setShowApiKeyInput] = useState(false)

    const handleRetry = async () => {
        setIsRetrying(true)
        // Wait a bit to allow user to set the API key
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const handleApiKeySet = (apiKey: string) => {
        // API key has been set and validated
        setShowApiKeyInput(false)
        // Reload the page to use the new API key
        window.location.reload()
    }

    const handleApiKeyCleared = () => {
        // API key has been cleared
        // No need to reload since we're already in the error state
    }

    return (
        <>
            <div className="min-h-dvh bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <Key className="w-8 h-8 text-red-600" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">API Key Required</h1>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        To use this app, you need to configure your v0 API key. You can either set it as an environment variable or
                        enter it directly below.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* Primary: Enter API Key */}
                        <Button
                            onClick={() => setShowApiKeyInput(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            Enter API Key
                        </Button>

                        {/* Secondary: Retry (for environment variable) */}
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isRetrying ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Refreshing...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4" />
                                    I've Set Environment Variable
                                </>
                            )}
                        </button>

                        {/* Tertiary: Get API Key */}
                        <a
                            href="https://v0.dev/settings"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Get API Key from v0.dev
                        </a>
                    </div>

                    {/* Environment Variable Instructions */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">Environment Variable Setup:</h3>
                        <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                            <li>
                                Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file
                            </li>
                            <li>
                                Add: <code className="bg-gray-200 px-1 rounded">V0_API_KEY=your_key_here</code>
                            </li>
                            <li>Restart the development server</li>
                        </ol>
                    </div>

                    {/* Additional Help */}
                    <p className="text-xs text-gray-500 mt-6">
                        Need help? Check the README.md file for detailed setup instructions.
                    </p>
                </div>
            </div>

            {/* API Key Input Dialog */}
            <ApiKeyInput
                isOpen={showApiKeyInput}
                onClose={() => setShowApiKeyInput(false)}
                onApiKeySet={handleApiKeySet}
                onApiKeyCleared={handleApiKeyCleared}
            />
        </>
    )
}
