"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from 'lucide-react'

interface OrderBookEntry {
    price: number
    amount: number
    total: number
}

export function OrderBook() {
    const [asks, setAsks] = useState<OrderBookEntry[]>([])
    const [bids, setBids] = useState<OrderBookEntry[]>([])
    const [spread, setSpread] = useState(0)

    // Simulate real-time order book data
    useEffect(() => {
        const generateOrderBook = () => {
            const basePrice = 2345.67
            const newAsks: OrderBookEntry[] = []
            const newBids: OrderBookEntry[] = []

            // Generate asks (sell orders)
            for (let i = 0; i < 8; i++) {
                const price = basePrice + (i + 1) * (Math.random() * 2 + 0.5)
                const amount = Math.random() * 10 + 0.1
                newAsks.push({
                    price: parseFloat(price.toFixed(2)),
                    amount: parseFloat(amount.toFixed(4)),
                    total: parseFloat((price * amount).toFixed(2))
                })
            }

            // Generate bids (buy orders)
            for (let i = 0; i < 8; i++) {
                const price = basePrice - (i + 1) * (Math.random() * 2 + 0.5)
                const amount = Math.random() * 10 + 0.1
                newBids.push({
                    price: parseFloat(price.toFixed(2)),
                    amount: parseFloat(amount.toFixed(4)),
                    total: parseFloat((price * amount).toFixed(2))
                })
            }

            setAsks(newAsks)
            setBids(newBids)
            setSpread(newAsks[0]?.price - newBids[0]?.price || 0)
        }

        generateOrderBook()
        const interval = setInterval(generateOrderBook, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="h-full border-gray-200/60">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-900">Order Book</CardTitle>
                    <Badge className="h-5 px-2 text-xs bg-blue-50 text-blue-700">
                        ETH/USD
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-1">
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-4 px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        <span>Price (USD)</span>
                        <span className="text-right">Amount (ETH)</span>
                        <span className="text-right">Total</span>
                    </div>

                    {/* Asks (Sell Orders) */}
                    <div className="space-y-0.5">
                        {asks.slice().reverse().map((ask, index) => (
                            <div
                                key={`ask-${index}`}
                                className="grid grid-cols-3 gap-4 px-4 py-1 text-xs hover:bg-red-50/50 transition-colors relative"
                            >
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-red-50/30"
                                    style={{ width: `${Math.min((ask.amount / 10) * 100, 100)}%` }}
                                />
                                <span className="text-red-600 font-mono relative z-10">${ask.price}</span>
                                <span className="text-right text-gray-900 font-mono relative z-10">{ask.amount}</span>
                                <span className="text-right text-gray-600 font-mono relative z-10">${ask.total}</span>
                            </div>
                        ))}
                    </div>

                    {/* Spread */}
                    <div className="px-4 py-3 bg-gray-50/50 border-y border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Spread</span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-gray-900">${spread.toFixed(2)}</span>
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* Bids (Buy Orders) */}
                    <div className="space-y-0.5">
                        {bids.map((bid, index) => (
                            <div
                                key={`bid-${index}`}
                                className="grid grid-cols-3 gap-4 px-4 py-1 text-xs hover:bg-emerald-50/50 transition-colors relative"
                            >
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-emerald-50/30"
                                    style={{ width: `${Math.min((bid.amount / 10) * 100, 100)}%` }}
                                />
                                <span className="text-emerald-600 font-mono relative z-10">${bid.price}</span>
                                <span className="text-right text-gray-900 font-mono relative z-10">{bid.amount}</span>
                                <span className="text-right text-gray-600 font-mono relative z-10">${bid.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
