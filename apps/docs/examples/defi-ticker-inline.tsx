'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  DeFiTickerSymbol,
} from '@repo/defi/ticker';

const Example = () => (
  <div className="flex items-center justify-center min-h-[200px] p-6">
    <p className="max-w-2xl text-center">
      In other autonomous vehicle news, Alphabet-owned{' '}
      <DeFiTicker className="px-1 text-base">
        <DeFiTickerIcon
          src="https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/GOOG.png"
          symbol="GOOG"
        />
        <DeFiTickerSymbol symbol="GOOG" />
        <DeFiTickerPrice price={175.41} />
        <DeFiTickerPriceChange change={2.13} />
      </DeFiTicker>{' '}
      Waymo is looking to bring its robotaxi service to New York.
    </p>
  </div>
);

export default Example;
