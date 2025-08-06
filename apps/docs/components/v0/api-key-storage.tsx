// Client-side API key management with encryption
class ApiKeyStorage {
    private static readonly STORAGE_KEY = "v0_api_key_encrypted"
    private static readonly SESSION_KEY = "v0_session_key"

    // Generate a simple encryption key for the session
    private static generateSessionKey(): string {
        const array = new Uint8Array(32)
        crypto.getRandomValues(array)
        return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
    }

    // Simple XOR encryption (for basic obfuscation)
    private static encrypt(text: string, key: string): string {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            const textChar = text.charCodeAt(i)
            const keyChar = key.charCodeAt(i % key.length)
            result += String.fromCharCode(textChar ^ keyChar)
        }
        return btoa(result) // Base64 encode
    }

    private static decrypt(encryptedText: string, key: string): string {
        try {
            const decoded = atob(encryptedText) // Base64 decode
            let result = ""
            for (let i = 0; i < decoded.length; i++) {
                const textChar = decoded.charCodeAt(i)
                const keyChar = key.charCodeAt(i % key.length)
                result += String.fromCharCode(textChar ^ keyChar)
            }
            return result
        } catch {
            return ""
        }
    }

    // Store API key securely
    static storeApiKey(apiKey: string, persistent = false): void {
        if (typeof window === "undefined") return

        // Generate or get session key
        let sessionKey = sessionStorage.getItem(this.SESSION_KEY)
        if (!sessionKey) {
            sessionKey = this.generateSessionKey()
            sessionStorage.setItem(this.SESSION_KEY, sessionKey)
        }

        // Encrypt the API key
        const encrypted = this.encrypt(apiKey, sessionKey)

        // Store in appropriate storage
        if (persistent) {
            localStorage.setItem(this.STORAGE_KEY, encrypted)
        } else {
            sessionStorage.setItem(this.STORAGE_KEY, encrypted)
        }
    }

    // Retrieve API key
    static getApiKey(): string | null {
        if (typeof window === "undefined") return null

        const sessionKey = sessionStorage.getItem(this.SESSION_KEY)
        if (!sessionKey) return null

        // Try session storage first, then local storage
        let encrypted = sessionStorage.getItem(this.STORAGE_KEY)
        if (!encrypted) {
            encrypted = localStorage.getItem(this.STORAGE_KEY)
        }

        if (!encrypted) return null

        return this.decrypt(encrypted, sessionKey)
    }

    // Clear stored API key
    static clearApiKey(): void {
        if (typeof window === "undefined") return

        sessionStorage.removeItem(this.STORAGE_KEY)
        localStorage.removeItem(this.STORAGE_KEY)
        sessionStorage.removeItem(this.SESSION_KEY)
    }

    // Check if API key exists
    static hasApiKey(): boolean {
        if (typeof window === "undefined") return false

        return !!(sessionStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.STORAGE_KEY))
    }
}

export default ApiKeyStorage
