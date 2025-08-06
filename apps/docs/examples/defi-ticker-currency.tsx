'use client';

import {
  DeFiTicker,
  DeFiTickerIcon,
  type DeFiTickerIconProps,
  DeFiTickerPrice,
  DeFiTickerPriceChange,
  type DeFiTickerPriceChangeProps,
  type DeFiTickerPriceProps,
  type DeFiTickerProps,
  DeFiTickerSymbol,
  type DeFiTickerSymbolProps,
} from '@repo/defi/ticker';

const items: {
  symbol: DeFiTickerSymbolProps['symbol'];
  src: DeFiTickerIconProps['src'];
  price: DeFiTickerPriceProps['price'];
  change: DeFiTickerPriceChangeProps['change'];
  currency?: DeFiTickerProps['currency'];
  locale?: DeFiTickerProps['locale'];
}[] = [
    {
      symbol: 'DUOL',
      src: 'https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/DUOL.png',
      price: 478.03,
      change: 5.2,
    },
    {
      symbol: 'DBD',
      src: 'https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/DBD.png',
      price: 102.33,
      change: 1.05,
      currency: 'EUR',
      locale: 'de-DE',
    },
    {
      symbol: '7203.T',
      src: 'https://raw.githubusercontent.com/nvstly/icons/refs/heads/main/ticker_icons/TM.png',
      price: 2460,
      change: -120,
      currency: 'JPY',
      locale: 'ja-JP',
    },
  ];

const Example = () =>
  items.map((i) => (
    <DeFiTicker currency={i.currency} key={i.symbol} locale={i.locale}>
      <DeFiTickerIcon src={i.src} symbol={i.symbol} />
      <DeFiTickerSymbol symbol={i.symbol} />
      <DeFiTickerPrice price={i.price} />
      <DeFiTickerPriceChange change={i.change} />
    </DeFiTicker>
  ));

export default Example;
