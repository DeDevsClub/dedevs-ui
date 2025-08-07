'use client';

import { CandlestickChart } from '@repo/defi/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar, RefreshCw } from 'lucide-react';

const tradingPairs = [
  { symbol: 'ETH/USD', price: 2345.67, change: 2.34, changePercent: 0.1 },
  { symbol: 'BTC/USD', price: 43567.89, change: -1234.56, changePercent: -2.76 },
  { symbol: 'SOL/USD', price: 98.45, change: 5.67, changePercent: 6.12 },
  { symbol: 'AVAX/USD', price: 34.78, change: -2.34, changePercent: -6.31 },
  { symbol: 'MATIC/USD', price: 0.87, change: 0.05, changePercent: 6.09 }
];

const timeframes = [
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' }
];

const marketStats = {
  marketCap: '$1.2T',
  volume24h: '$45.6B',
  dominance: '42.3%',
  fearGreed: 67
};

const Example = () => {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header with Market Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">DeFi Trading Charts</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                Live Data
              </Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{marketStats.marketCap}</div>
              <div className="text-sm text-gray-600">Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{marketStats.volume24h}</div>
              <div className="text-sm text-gray-600">24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{marketStats.dominance}</div>
              <div className="text-sm text-gray-600">BTC Dominance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{marketStats.fearGreed}</div>
              <div className="text-sm text-gray-600">Fear & Greed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chart Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Trading Pair</label>
                <Select
                  value={selectedPair.symbol}
                  onValueChange={(value) => {
                    const pair = tradingPairs.find(p => p.symbol === value);
                    if (pair) setSelectedPair(pair);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tradingPairs.map((pair) => (
                      <SelectItem key={pair.symbol} value={pair.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <span>{pair.symbol}</span>
                          <span className={`ml-2 text-xs ${
                            pair.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {pair.change >= 0 ? '+' : ''}{pair.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Timeframe</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeframes.map((tf) => (
                    <Button
                      key={tf.value}
                      variant={selectedTimeframe === tf.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeframe(tf.value)}
                      className="text-xs"
                    >
                      {tf.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">${selectedPair.price.toLocaleString()}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  selectedPair.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {selectedPair.change >= 0 ? 
                    <TrendingUp className="w-4 h-4" /> : 
                    <TrendingDown className="w-4 h-4" />
                  }
                  {selectedPair.change >= 0 ? '+' : ''}${selectedPair.change.toFixed(2)} 
                  ({selectedPair.change >= 0 ? '+' : ''}{selectedPair.changePercent.toFixed(2)}%)
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">24h High</span>
                  <span className="font-mono">${(selectedPair.price * 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Low</span>
                  <span className="font-mono">${(selectedPair.price * 0.95).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Volume</span>
                  <span className="font-mono">$12.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-mono">$284.5B</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedPair.symbol} Candlestick Chart</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedTimeframe.toUpperCase()}</Badge>
                  <Badge variant={selectedPair.change >= 0 ? 'default' : 'destructive'}>
                    {selectedPair.change >= 0 ? 'Bullish' : 'Bearish'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <CandlestickChart key={`${selectedPair.symbol}-${selectedTimeframe}-${refreshKey}`} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Multiple Chart Views */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chart Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="single">Single Chart</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="mt-6">
              <div className="h-80">
                <CandlestickChart key={`single-${refreshKey}`} />
              </div>
            </TabsContent>
            
            <TabsContent value="comparison" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">ETH/USD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <CandlestickChart key={`comp1-${refreshKey}`} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">BTC/USD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <CandlestickChart key={`comp2-${refreshKey}`} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tradingPairs.slice(0, 3).map((pair, index) => (
                  <Card key={pair.symbol}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{pair.symbol}</CardTitle>
                        <Badge 
                          variant={pair.change >= 0 ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {pair.change >= 0 ? '+' : ''}{pair.changePercent.toFixed(1)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 mb-2">
                        <CandlestickChart key={`portfolio-${pair.symbol}-${refreshKey}`} />
                      </div>
                      <div className="text-sm">
                        <div className="font-mono font-semibold">${pair.price.toLocaleString()}</div>
                        <div className={`text-xs ${
                          pair.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {pair.change >= 0 ? '+' : ''}${pair.change.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Technical Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Key Indicators</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">RSI (14)</span>
                  <span className="font-mono text-sm">67.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">MACD</span>
                  <span className="font-mono text-sm text-emerald-600">+12.4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bollinger Bands</span>
                  <span className="font-mono text-sm">Upper: $2,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Support</span>
                  <span className="font-mono text-sm">$2,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resistance</span>
                  <span className="font-mono text-sm">$2,567</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Market Sentiment</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trend</span>
                  <Badge variant="default">Bullish</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Volatility</span>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Volume</span>
                  <Badge variant="outline">High</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Momentum</span>
                  <Badge variant="default">Strong</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Signal</span>
                  <Badge variant="default">Buy</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;