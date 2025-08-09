'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  DeFiTickerSymbol,
} from '@repo/defi/ticker';

const Example = () => (
  <div className="flex flex-col items-center justify-center p-6">
    <DeFiTicker>
      <DeFiTickerIcon
        src="https://ui.dedevs.com/assets/tokens/btc.png"
        symbol="BTC"
      />
      <DeFiTickerSymbol symbol="BTC" />
      <DeFiTickerPrice price={125250} />
      <DeFiTickerPriceChange change={1.25} isPercent />
    </DeFiTicker>
  </div>
);

export default Example;
