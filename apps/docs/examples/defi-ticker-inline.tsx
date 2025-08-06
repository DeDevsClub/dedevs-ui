'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  DeFiTickerSymbol,
} from '@repo/defi/ticker';

const Example = () => (
  <p>
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
);

export default Example;
