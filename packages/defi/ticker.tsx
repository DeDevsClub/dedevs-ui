'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { createContext, memo, useContext, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/shadcn-ui/components/ui/avatar';
import { cn } from '@repo/shadcn-ui/lib/utils';

type DeFiTickerContextValue = {
    formatter: Intl.NumberFormat;
};

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LOCALE = 'en-US';

const defaultFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: DEFAULT_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const DeFiTickerContext = createContext<DeFiTickerContextValue>({
    formatter: defaultFormatter,
});

export const useDeFiTickerContext = () => useContext(DeFiTickerContext);

export type DeFiTickerProps = HTMLAttributes<HTMLButtonElement> & {
    currency?: string;
    locale?: string;
};

export const DeFiTicker = memo(
    ({
        children,
        className,
        currency = DEFAULT_CURRENCY,
        locale = DEFAULT_LOCALE,
        ...props
    }: DeFiTickerProps & { children: ReactNode }) => {
        const formatter = useMemo(() => {
            try {
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency.toUpperCase(),
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            } catch {
                return defaultFormatter;
            }
        }, [currency, locale]);

        return (
            <DeFiTickerContext.Provider value={{ formatter }}>
                <button
                    className={cn(
                        'inline-flex items-center gap-1.5 whitespace-nowrap align-middle',
                        className
                    )}
                    type="button"
                    {...props}
                >
                    {children}
                </button>
            </DeFiTickerContext.Provider>
        );
    }
);
DeFiTicker.displayName = 'DeFiTicker';

export type DeFiTickerIconProps = HTMLAttributes<HTMLImageElement> & {
    src: string;
    symbol: string;
};

export const DeFiTickerIcon = memo(
    ({ src, symbol, className, ...props }: DeFiTickerIconProps) => {
        if (!src) {
            return null;
        }
        return (
            <Avatar
                className={cn('size-7 border border-border bg-muted p-1', className)}
            >
                <AvatarImage src={src} {...props} />
                <AvatarFallback className="font-semibold text-muted-foreground text-sm">
                    {symbol.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        );
    }
);
DeFiTickerIcon.displayName = 'DeFiTickerIcon';

export type DeFiTickerSymbolProps = HTMLAttributes<HTMLSpanElement> & {
    symbol: string;
};

export const DeFiTickerSymbol = memo(
    ({ symbol, className, ...props }: DeFiTickerSymbolProps) => (
        <span className={cn('font-medium', className)} {...props}>
            {symbol.toUpperCase()}
        </span>
    )
);
DeFiTickerSymbol.displayName = 'DeFiTickerSymbol';

export type DeFiTickerPriceProps = HTMLAttributes<HTMLSpanElement> & {
    price: number;
};

export const DeFiTickerPrice = memo(
    ({ price, className, ...props }: DeFiTickerPriceProps) => {
        const context = useDeFiTickerContext();

        const formattedPrice = useMemo(
            () => context.formatter.format(price),
            [price, context]
        );

        return (
            <span className={cn('text-muted-foreground', className)} {...props}>
                {formattedPrice}
            </span>
        );
    }
);
DeFiTickerPrice.displayName = 'DeFiTickerPrice';

export type DeFiTickerPriceChangeProps = HTMLAttributes<HTMLSpanElement> & {
    change: number;
    isPercent?: boolean;
};

export const DeFiTickerPriceChange = memo(
    ({ change, isPercent, className, ...props }: DeFiTickerPriceChangeProps) => {
        const isPositiveChange = useMemo(() => change >= 0, [change]);
        const context = useDeFiTickerContext();

        const changeFormatted = useMemo(() => {
            if (isPercent) {
                return `${change.toFixed(2)}%`;
            }
            return context.formatter.format(change);
        }, [change, isPercent, context]);

        return (
            <span
                className={cn(
                    'flex items-center gap-0.5',
                    isPositiveChange
                        ? 'text-green-600 dark:text-green-500'
                        : 'text-red-600 dark:text-red-500',
                    className
                )}
                {...props}
            >
                <svg
                    aria-labelledby="ticker-change-icon-title"
                    className={isPositiveChange ? '' : 'rotate-180'}
                    fill="currentColor"
                    height="12"
                    role="img"
                    viewBox="0 0 24 24"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title id="ticker-change-icon-title">
                        {isPositiveChange ? 'Up icon' : 'Down icon'}
                    </title>
                    <path d="M24 22h-24l12-20z" />
                </svg>
                {changeFormatted}
            </span>
        );
    }
);
DeFiTickerPriceChange.displayName = 'DeFiTickerPriceChange';
