"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface OrderBookEntry {
    price: number
    amount: number
    total: number
    change?: number
}

interface OrderBookProps {
    pair?: string
    exchange?: string
    className?: string
}

export function OrderBook({ 
    pair = "ETH/USD", 
    exchange = "Coinbase",
    className = "" 
}: OrderBookProps) {
    const [asks, setAsks] = useState<OrderBookEntry[]>([])
    const [bids, setBids] = useState<OrderBookEntry[]>([])
    const [spread, setSpread] = useState(0)
    const [spreadPercent, setSpreadPercent] = useState(0)
    const [lastPrice, setLastPrice] = useState(0)
    const [priceChange, setPriceChange] = useState(0)

    // Simulate real-time order book data
    useEffect(() => {
        const generateOrderBook = () => {
            const basePrice = 2345.67 + (Math.random() - 0.5) * 10
            const newAsks: OrderBookEntry[] = []
            const newBids: OrderBookEntry[] = []

            // Generate asks (sell orders) - sorted ascending
            for (let i = 0; i < 10; i++) {
                const price = basePrice + (i + 1) * (Math.random() * 1.5 + 0.3)
                const amount = Math.random() * 15 + 0.1
                const change = (Math.random() - 0.5) * 0.1
                newAsks.push({
                    price: parseFloat(price.toFixed(2)),
                    amount: parseFloat(amount.toFixed(4)),
                    total: parseFloat((price * amount).toFixed(2)),
                    change: parseFloat(change.toFixed(3))
                })
            }

            // Generate bids (buy orders) - sorted descending
            for (let i = 0; i < 10; i++) {
                const price = basePrice - (i + 1) * (Math.random() * 1.5 + 0.3)
                const amount = Math.random() * 15 + 0.1
                const change = (Math.random() - 0.5) * 0.1
                newBids.push({
                    price: parseFloat(price.toFixed(2)),
                    amount: parseFloat(amount.toFixed(4)),
                    total: parseFloat((price * amount).toFixed(2)),
                    change: parseFloat(change.toFixed(3))
                })
            }

            const currentSpread = newAsks[0]?.price - newBids[0]?.price || 0
            const midPrice = ((newAsks[0]?.price || 0) + (newBids[0]?.price || 0)) / 2
            const spreadPct = midPrice > 0 ? (currentSpread / midPrice) * 100 : 0
            
            setAsks(newAsks)
            setBids(newBids)
            setSpread(currentSpread)
            setSpreadPercent(spreadPct)
            
            // Update last price and change
            if (lastPrice > 0) {
                setPriceChange(midPrice - lastPrice)
            }
            setLastPrice(midPrice)
        }

        generateOrderBook()
        const interval = setInterval(generateOrderBook, 1500)
        return () => clearInterval(interval)
    }, [lastPrice])

    const formatPrice = (price: number) => price.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    })

    const formatAmount = (amount: number) => amount.toLocaleString('en-US', { 
        minimumFractionDigits: 4, 
        maximumFractionDigits: 4 
    })

    const getMaxAmount = () => {
        const allAmounts = [...asks, ...bids].map(entry => entry.amount)
        return Math.max(...allAmounts)
    }

    const maxAmount = getMaxAmount()

    return (
        <Card className={`h-full border-slate-200/60 bg-background shadow-sm ${className}`}>
            <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CardTitle className="font-semibold text-text">Order Book</CardTitle>
                        <Activity className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="default" className="h-6 px-2.5 text-xs font-medium bg-blue-50 text-text border-blue-200">
                            {pair}
                        </Badge>
                        <Badge variant="outline" className="h-6 px-2.5 text-xs text-text">
                            {exchange}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="p-0">
                <div className="space-y-0">
                    {/* Column Headers */}
                    <div className="grid grid-cols-3 gap-4 px-4 py-3 text-xs font-semibold text-text bg-slate-50/50 border-b border-slate-100">
                        <span>Price (USD)</span>
                        <span className="text-right">Size ({pair.split('/')[0]})</span>
                        <span className="text-right">Total (USD)</span>
                    </div>

                    {/* Asks (Sell Orders) */}
                    <div className="max-h-48 overflow-y-auto">
                        {asks.slice().reverse().slice(0, 8).map((ask, index) => (
                            <div
                                key={`ask-${ask.price}-${index}`}
                                className="group grid grid-cols-3 gap-4 px-4 py-1.5 text-xs hover:bg-red-50/60 transition-all duration-150 relative cursor-pointer"
                            >
                                {/* Depth Bar */}
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-50/40 to-red-50/20 transition-all duration-300"
                                    style={{ width: `${Math.min((ask.amount / maxAmount) * 100, 100)}%` }}
                                />
                                
                                <div className="flex items-center gap-1 relative z-10">
                                    <span className="font-mono font-medium text-text">${formatPrice(ask.price)}</span>
                                    {ask.change && ask.change !== 0 && (
                                        <span className={`text-xs ${ask.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {ask.change > 0 ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                                <span className="text-right text-text font-mono relative z-10 group-hover:text-text">
                                    {formatAmount(ask.amount)}
                                </span>
                                <span className="text-right text-text font-mono relative z-10 group-hover:text-text">
                                    ${ask.total.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Spread Section */}
                    <div className="px-4 py-4 bg-gradient-to-r from-slate-50/50 to-slate-50/30 border-y border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-text">Spread</span>
                                <div className="flex items-center gap-1">
                                    {priceChange > 0 ? (
                                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                    ) : priceChange < 0 ? (
                                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-sm font-semibold text-text">
                                    ${spread.toFixed(2)}
                                </div>
                                <div className="text-xs text-text">
                                    {spreadPercent.toFixed(3)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bids (Buy Orders) */}
                    <div className="max-h-48 overflow-y-auto">
                        {bids.slice(0, 8).map((bid, index) => (
                            <div
                                key={`bid-${bid.price}-${index}`}
                                className="group grid grid-cols-3 gap-4 px-4 py-1.5 text-xs hover:bg-green-50/60 transition-all duration-150 relative cursor-pointer"
                            >
                                {/* Depth Bar */}
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-green-50/40 to-green-50/20 transition-all duration-300"
                                    style={{ width: `${Math.min((bid.amount / maxAmount) * 100, 100)}%` }}
                                />
                                
                                <div className="flex items-center gap-1 relative z-10">
                                    <span className="font-mono font-medium text-text">${formatPrice(bid.price)}</span>
                                    {bid.change && bid.change !== 0 && (
                                        <span className={`text-xs ${bid.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {bid.change > 0 ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                                <span className="text-right text-text font-mono relative z-10 group-hover:text-text">
                                    {formatAmount(bid.amount)}
                                </span>
                                <span className="text-right text-text font-mono relative z-10 group-hover:text-text">
                                    ${bid.total.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
