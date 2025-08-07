'use client';

import { OrderBook } from '@repo/defi/orderbook';

const Example = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 min-h-[600px] flex items-center justify-center">
      <div className="w-full">
        <OrderBook />
      </div>
    </div>
  );
};

export default Example;
