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
      symbol: 'BTC',
      src: 'https://ui.dedevs.com/assets/tokens/btc.png',
      price: 125250.00,
      change: 1.25,
    },
    {
      symbol: 'ETH',
      src: 'https://ui.dedevs.com/assets/tokens/eth.png',
      price: 4220.20,
      change: 4.20,
    },
    {
      symbol: 'USDC',
      src: 'https://ui.dedevs.com/assets/tokens/usdc.png',
      price: 1.00,
      change: 0.01,
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
