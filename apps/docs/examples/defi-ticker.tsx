'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  DeFiTickerSymbol,
} from '@repo/defi/ticker';

const Example = () => (
  <DeFiTicker>
    <DeFiTickerIcon
      src="https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/GOOG.png"
      symbol="GOOG"
    />
    <DeFiTickerSymbol symbol="GOOG" />
    <DeFiTickerPrice price={175.41} />
    <DeFiTickerPriceChange change={2.13} />
  </DeFiTicker>
);

export default Example;
