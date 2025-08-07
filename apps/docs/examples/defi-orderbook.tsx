'use client';

import { OrderBook } from '@repo/defi/orderbook';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const tradingPairs = [
  { symbol: 'ETH/USD', baseAsset: 'ETH', quoteAsset: 'USD' },
  { symbol: 'BTC/USD', baseAsset: 'BTC', quoteAsset: 'USD' },
  { symbol: 'SOL/USD', baseAsset: 'SOL', quoteAsset: 'USD' },
  { symbol: 'AVAX/USD', baseAsset: 'AVAX', quoteAsset: 'USD' },
  { symbol: 'MATIC/USD', baseAsset: 'MATIC', quoteAsset: 'USD' },
];

const Example = () => {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-6 min-h-[900px]">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">DeFi Order Book</CardTitle>
            <div className="flex items-center gap-4">
              <Select
                value={selectedPair.symbol}
                onValueChange={(value) => {
                  const pair = tradingPairs.find(p => p.symbol === value);
                  if (pair) setSelectedPair(pair);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tradingPairs.map((pair) => (
                    <SelectItem key={pair.symbol} value={pair.symbol}>
                      {pair.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Market Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">Market Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h Volume</span>
                  <span className="text-sm font-mono">1,234.56 {selectedPair.baseAsset}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h High</span>
                  <span className="text-sm font-mono text-emerald-600">$2,456.78</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h Low</span>
                  <span className="text-sm font-mono text-red-600">$2,234.12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h Change</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-sm font-mono text-emerald-600">+2.34%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Book */}
            <div className="md:col-span-2">
              <OrderBook key={refreshKey} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multiple Order Books Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Exchange A</CardTitle>
              <Badge variant="secondary">Binance</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <OrderBook key={`${refreshKey}-a`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Exchange B</CardTitle>
              <Badge variant="secondary">Coinbase</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <OrderBook key={`${refreshKey}-b`} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Book Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">$2,345.67</div>
              <div className="text-sm text-gray-600">Best Bid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$2,347.89</div>
              <div className="text-sm text-gray-600">Best Ask</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$2.22</div>
              <div className="text-sm text-gray-600">Spread</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0.09%</div>
              <div className="text-sm text-gray-600">Spread %</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Order Book */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compact View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <OrderBook key={`${refreshKey}-compact`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;