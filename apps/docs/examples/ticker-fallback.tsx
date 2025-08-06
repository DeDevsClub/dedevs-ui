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
    <DeFiTickerIcon src="invalid-icon-url" symbol="AAPL" />
    <DeFiTickerSymbol symbol="AAPL" />
    <DeFiTickerPrice price={196.58} />
    <DeFiTickerPriceChange change={-1.25} />
  </DeFiTicker>
);

export default Example;
