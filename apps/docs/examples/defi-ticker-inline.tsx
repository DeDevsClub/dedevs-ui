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
      Bitcoin markets are active today as{' '}
      <DeFiTicker className="px-1 text-base">
        <DeFiTickerIcon
          src="https://ui.dedevs.com/assets/tokens/btc.png"
          symbol="BTC"
        />
        <DeFiTickerSymbol symbol="BTC" />
        <DeFiTickerPrice price={125250} />
        <DeFiTickerPriceChange change={1.25} isPercent />
      </DeFiTicker>{' '}
      pushes higher amid increased on-chain activity and strong ETF inflows.
    </p>
  </div>
);

export default Example;
