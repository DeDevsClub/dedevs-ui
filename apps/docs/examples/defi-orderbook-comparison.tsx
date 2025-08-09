'use client';

import { OrderBook } from '@repo/defi/orderbook';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const exchanges = [
  { name: 'Binance', variant: 'default' as const },
  { name: 'Coinbase', variant: 'secondary' as const },
  { name: 'Kraken', variant: 'outline' as const },
];

const DefiOrderbookComparisonExample = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {exchanges.map((exchange, index) => (
        <Card key={exchange.name}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{exchange.name}</CardTitle>
              <Badge variant={exchange.variant}>{exchange.name}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <OrderBook key={`${exchange.name}-${index}`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DefiOrderbookComparisonExample;
