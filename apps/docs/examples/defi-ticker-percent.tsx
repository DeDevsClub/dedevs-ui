'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  type DeFiTickerIconProps,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  type DeFiTickerPriceChangeProps,
  type DeFiTickerPriceProps,
  DeFiTickerSymbol,
  type DeFiTickerSymbolProps,
} from '@repo/defi/ticker';

const items: {
  symbol: DeFiTickerSymbolProps['symbol'];
  src: DeFiTickerIconProps['src'];
  price: DeFiTickerPriceProps['price'];
  change: DeFiTickerPriceChangeProps['change'];
}[] = [
    {
      symbol: 'BTC',
      src: 'https://ui.dedevs.com/assets/tokens/btc.png',
      price: 125250,
      change: 1.25,
    },
    {
      symbol: 'ETH',
      src: 'https://ui.dedevs.com/assets/tokens/eth.png',
      price: 4220.20,
      change: 4.20,
    },
  ];

const Example = () => (
  <div className="flex flex-col items-center justify-center p-6">
    {items.map((i) => (
      <DeFiTicker key={i.symbol}>
        <DeFiTickerIcon src={i.src} symbol={i.symbol} />
        <DeFiTickerSymbol symbol={i.symbol} />
        <DeFiTickerPrice price={i.price} />
        <DeFiTickerPriceChange change={i.change} isPercent />
      </DeFiTicker>
    ))}
  </div>
);

export default Example;
