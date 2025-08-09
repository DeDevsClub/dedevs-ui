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
    <DeFiTickerIcon src="invalid-icon-url" symbol="BTC" />
    <DeFiTickerSymbol symbol="BTC" />
    <DeFiTickerPrice price={125250} />
    <DeFiTickerPriceChange change={1.25} isPercent />
  </DeFiTicker>
);

export default Example;
