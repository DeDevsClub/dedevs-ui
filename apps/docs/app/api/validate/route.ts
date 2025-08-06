import { v0 } from "v0-sdk"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        // Use environment variable API key for server-side validation
        const user = await v0.user.get()

        return NextResponse.json({
            valid: true,
            message: "API key is configured correctly",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = error.message.toLowerCase()

            // Check if it's an API key related error
            if (
                errorMessage.includes("api key is required") ||
                errorMessage.includes("v0_api_key") ||
                errorMessage.includes("config.apikey") ||
                errorMessage.includes("unauthorized") ||
                errorMessage.includes("invalid api key") ||
                errorMessage.includes("authentication") ||
                errorMessage.includes("401")
            ) {
                return NextResponse.json(
                    {
                        valid: false,
                        error: "API_KEY_MISSING",
                        message: error.message,
                    },
                    { status: 401 },
                )
            }

            // Other errors (network, etc.)
            return NextResponse.json(
                {
                    valid: false,
                    error: "VALIDATION_ERROR",
                    message: error.message,
                },
                { status: 500 },
            )
        }

        return NextResponse.json(
            {
                valid: false,
                error: "UNKNOWN_ERROR",
                message: "Unknown error occurred during validation",
            },
            { status: 500 },
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const { apiKey } = await request.json()

        if (!apiKey) {
            return NextResponse.json(
                {
                    valid: false,
                    message: "API key is required",
                },
                { status: 400 },
            )
        }

        // Create a temporary v0 client with the provided API key
        const { createClient } = await import("v0-sdk")
        const tempV0Client = createClient({
            apiKey: apiKey,
        })

        // Test the API key by getting user info
        const user = await tempV0Client.user.get()

        return NextResponse.json({
            valid: true,
            message: "API key is valid",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = error.message.toLowerCase()

            // Check if it's an API key related error
            if (
                errorMessage.includes("api key is required") ||
                errorMessage.includes("v0_api_key") ||
                errorMessage.includes("config.apikey") ||
                errorMessage.includes("unauthorized") ||
                errorMessage.includes("invalid api key") ||
                errorMessage.includes("authentication") ||
                errorMessage.includes("401")
            ) {
                return NextResponse.json(
                    {
                        valid: false,
                        message: "Invalid API key. Please check your key and try again.",
                    },
                    { status: 401 },
                )
            }

            // Other errors (network, etc.)
            return NextResponse.json(
                {
                    valid: false,
                    message: error.message,
                },
                { status: 500 },
            )
        }

        return NextResponse.json(
            {
                valid: false,
                message: "Unknown error occurred during validation",
            },
            { status: 500 },
        )
    }
}
