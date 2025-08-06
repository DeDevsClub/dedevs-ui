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
      symbol: 'TSLA',
      src: 'https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/TSLA.png',
      price: 182.12,
      change: -3.12,
    },
    {
      symbol: 'MSFT',
      src: 'https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/MSFT.png',
      price: 409.33,
      change: 2.18,
    },
  ];

const Example = () => (
  <>
    {items.map((i) => (
      <DeFiTicker key={i.symbol}>
        <DeFiTickerIcon src={i.src} symbol={i.symbol} />
        <DeFiTickerSymbol symbol={i.symbol} />
        <DeFiTickerPrice price={i.price} />
        <DeFiTickerPriceChange change={i.change} isPercent />
      </DeFiTicker>
    ))}
  </>
);

export default Example;
