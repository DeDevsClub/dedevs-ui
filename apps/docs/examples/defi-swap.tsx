'use client';

import { Converter } from '@repo/defi/swap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Shield, Clock } from 'lucide-react';

const swapPools = [
  {
    name: 'ETH/USDC',
    tvl: '$2.4B',
    apy: '12.5%',
    volume24h: '$45.2M',
    fee: '0.3%',
    status: 'active' as const
  },
  {
    name: 'BTC/ETH',
    tvl: '$1.8B',
    apy: '8.7%',
    volume24h: '$32.1M',
    fee: '0.25%',
    status: 'active' as const
  },
  {
    name: 'USDC/DAI',
    tvl: '$890M',
    apy: '4.2%',
    volume24h: '$18.5M',
    fee: '0.05%',
    status: 'low_liquidity' as const
  }
];

const recentTransactions = [
  {
    type: 'swap' as const,
    from: 'ETH',
    to: 'USDC',
    amount: '2.5',
    value: '$6,234.50',
    time: '2 mins ago',
    status: 'completed' as const
  },
  {
    type: 'swap' as const,
    from: 'USDC',
    to: 'DAI',
    amount: '1,000',
    value: '$1,000.00',
    time: '5 mins ago',
    status: 'pending' as const
  },
  {
    type: 'add_liquidity' as const,
    from: 'ETH',
    to: 'USDC',
    amount: '5.0',
    value: '$12,450.00',
    time: '12 mins ago',
    status: 'completed' as const
  }
];

const Example = () => {
  const [selectedPool, setSelectedPool] = useState(swapPools[0]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header with Pool Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">DeFi Swap Interface</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Fast Swaps
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$4.2B</div>
              <div className="text-sm text-gray-600">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">$95.8M</div>
              <div className="text-sm text-gray-600">24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-gray-600">Active Pools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0.25%</div>
              <div className="text-sm text-gray-600">Avg Fee</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Swap Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Widget */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <Converter />
            </CardContent>
          </Card>
        </div>

        {/* Pool Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Selected Pool</span>
                <Badge>{selectedPool.name}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">TVL</span>
                <span className="font-mono text-sm">{selectedPool.tvl}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">APY</span>
                <span className="font-mono text-sm text-emerald-600">{selectedPool.apy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">24h Volume</span>
                <span className="font-mono text-sm">{selectedPool.volume24h}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fee</span>
                <span className="font-mono text-sm">{selectedPool.fee}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Add Liquidity
              </Button>
              <Button className="w-full" variant="outline">
                Remove Liquidity
              </Button>
              <Button className="w-full" variant="outline">
                View Pool Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pool Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Pools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {swapPools.map((pool, index) => (
              <Card 
                key={pool.name} 
                className={`cursor-pointer transition-colors ${
                  selectedPool.name === pool.name 
                    ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPool(pool)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{pool.name}</h3>
                    <Badge 
                      variant={pool.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {pool.status === 'active' ? 'Active' : 'Low Liquidity'}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">TVL</span>
                      <span className="font-mono">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">APY</span>
                      <span className="font-mono text-emerald-600">{pool.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">24h Vol</span>
                      <span className="font-mono">{pool.volume24h}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    tx.status === 'completed' ? 'bg-emerald-500' : 
                    tx.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">
                      {tx.type === 'swap' ? 'Swap' : 'Add Liquidity'} {tx.from} → {tx.to}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tx.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{tx.amount} {tx.from}</div>
                  <div className="text-xs text-gray-600">{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Multiple Swap Interfaces */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Multiple Swap Modes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="pro">Pro Mode</TabsTrigger>
              <TabsTrigger value="limit">Limit Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="standard" className="mt-6">
              <div className="max-w-md mx-auto">
                <Converter />
              </div>
            </TabsContent>
            <TabsContent value="pro" className="mt-6">
              <div className="max-w-md mx-auto">
                <Converter />
              </div>
            </TabsContent>
            <TabsContent value="limit" className="mt-6">
              <div className="max-w-md mx-auto">
                <Converter />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;