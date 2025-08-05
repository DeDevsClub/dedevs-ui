import type { NextRequest } from "next/server"
import { createClient } from "v0-sdk"

// Server-side utility to get API key from request headers or environment
export function getApiKeyFromRequest(request?: NextRequest): string | null {
    // First try environment variable
    // if (process.env.V0_API_KEY) {
    //     return process.env.V0_API_KEY
    // }

    // Then try request headers (for user-provided keys)
    if (request) {
        const authHeader = request.headers.get("authorization")
        if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7)
        }

        const apiKeyHeader = request.headers.get("x-api-key")
        if (apiKeyHeader) {
            return apiKeyHeader
        }
    }

    return null
}

// Create v0 client with appropriate API key
export function createV0Client(request?: NextRequest) {
    const apiKey = getApiKeyFromRequest(request)

    if (!apiKey) {
        throw new Error("API key is required")
    }

    return createClient({
        apiKey: apiKey,
    })
}
