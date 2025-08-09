"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RiSettings4Line, RiArrowDownLine } from "@remixicon/react";
import { I18nProvider, Input, Label, NumberField } from "react-aria-components";
import { cn } from "@repo/shadcn-ui/lib/utils";
import { useState } from "react";

interface ConverterFieldProps {
    className?: string;
    isLast?: boolean;
    amount: number;
    onAmountChange: (value: number) => void;
    balance: string;
    selectedCoin: string;
    onSelectCoin: (value: string) => void;
    onMax?: () => void;
    coins: {
        id: string;
        name: string;
        image: string;
    }[];
}

function ConverterField({
    className,
    isLast,
    amount,
    onAmountChange,
    balance,
    selectedCoin,
    onSelectCoin,
    onMax,
    coins,
}: ConverterFieldProps) {
    return (
        <>
            {/* Arrow */}
            {isLast && (
                <div
                    className="size-6 border z-10 rounded-full border-primary flex flex-col items-center justify-center bg-linear-to-b from-primary to-primary-to inset-shadow-[0_1px_rgb(255_255_255/0.15)] absolute top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                >
                    <RiArrowDownLine className="text-primary-foreground" size={20} />
                </div>
            )}
            {/* Converter */}
            <Card
                className={cn(
                    "relative w-full flex-row items-center justify-between gap-2 p-4 dark:bg-card/64 border-2 border-border",
                    isLast
                        ? "[mask-image:radial-gradient(ellipse_26px_24px_at_50%_0%,transparent_0,_transparent_24px,_black_25px)]"
                        : "[mask-image:radial-gradient(ellipse_26px_24px_at_50%_100%,transparent_0,_transparent_24px,_black_25px)]",
                    className,
                )}
            >
                {/* Arrow */}
                {isLast && (
                    <div
                        className="absolute -top-px left-1/2 -translate-x-1/2 w-[50px] h-[25px] rounded-b-full border-b border-x border-white/15"
                        aria-hidden="true"
                    ></div>
                )}
                {/* Amount */}
                <div className="grow">
                    <I18nProvider locale="en-US">
                        <NumberField
                            value={amount}
                            onChange={(v) => onAmountChange(v ?? 0)}
                            minValue={0}
                            formatOptions={{
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                            }}
                        >
                            <Label className="sr-only">Amount</Label>
                            <Input className="w-full max-w-40 text-2xl font-semibold bg-transparent focus-visible:outline-none py-0.5 px-1 -ml-1 mb-0.5 focus:bg-card/64 rounded-lg appearance-none" />
                        </NumberField>
                    </I18nProvider>
                    <div className="text-xs text-muted-foreground flex items-center justify-between gap-3">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={onMax}
                        >
                            <span className="text-muted-foreground/70">Balance: </span>
                            {balance}
                        </div>
                        {/* {onMax && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 py-0 text-[10px] uppercase tracking-wide"
                                onClick={onMax}
                            >
                                MAX
                            </Button>
                        )} */}
                    </div>
                </div>
                {/* Coin selector */}
                <div className="flex items-center gap-2">
                    <Select value={selectedCoin} onValueChange={onSelectCoin}>
                        <SelectTrigger className="p-1 pr-2 h-8 rounded-full [&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 border-0 bg-card/64 hover:bg-card/80 shadow-lg inset-shadow-[0_1px_rgb(255_255_255/0.15)]">
                            <SelectValue placeholder="Select coin" />
                        </SelectTrigger>
                        <SelectContent
                            className="dark bg-muted border-none shadow-black/10 inset-shadow-[0_1px_rgb(255_255_255/0.15)] [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0"
                            align="center"
                        >
                            {coins.map((coin) => (
                                <SelectItem key={coin.id} value={coin.id}>
                                    <img
                                        className="shrink-0 rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05)]"
                                        src={coin.image}
                                        width={24}
                                        height={24}
                                        alt={coin.name}
                                    />
                                    <span className="truncate uppercase text-xs font-medium">
                                        {coin.name}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Card>
        </>
    );
}

export function Converter() {
    const coins = [
        {
            id: "1",
            name: "Ark",
            image:
                "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp4/coin-01-sm-dark_hkrvvm.svg",
        },
        {
            id: "2",
            name: "Tok",
            image:
                "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp4/coin-02-sm-dark_iqldgv.svg",
        },
    ];

    function ConverterContent() {
        const [fromCoinId, setFromCoinId] = useState<string>("2");
        const [toCoinId, setToCoinId] = useState<string>("1");
        const balances: Record<string, string> = {
            "1": "54,579", // Ark
            "2": "12,234.2", // Tok
        };

        // Simple pair rate helper. Example baseline: 1 ARK = 25.00 TOK
        const getRate = (fromId: string, toId: string): number => {
            if (fromId === toId) return 1;
            const ARK = "1";
            const TOK = "2";
            const arkToTok = 25.00; // 1 ARK -> 25.00 TOK
            if (fromId === ARK && toId === TOK) return arkToTok;
            if (fromId === TOK && toId === ARK) return 1 / arkToTok;
            return 1; // fallback
        };

        const round2 = (n: number) => Math.max(0, Math.round((n + Number.EPSILON) * 100) / 100);

        // Amounts and last edited side
        const [fromAmount, setFromAmount] = useState<number>(1);
        const [toAmount, setToAmount] = useState<number>(() => round2(1 * getRate("2", "1")));
        const [lastEdited, setLastEdited] = useState<"from" | "to">("from");

        const handleFromChange = (value: string) => {
            const previousFrom = fromCoinId;
            setFromCoinId(value);
            if (value === toCoinId) {
                const fallback = coins.find((c) => c.id !== value)?.id ?? toCoinId;
                setToCoinId(previousFrom !== value ? previousFrom : fallback);
            }
            // Recalculate the opposite amount based on who was last edited to preserve user intent
            const rate = getRate(value, toCoinId);
            if (lastEdited === "from") {
                setToAmount((prev) => round2(fromAmount * rate));
            } else {
                // last edited is "to", keep toAmount and back-calc from
                setFromAmount((prev) => round2(toAmount / rate));
            }
        };

        const handleToChange = (value: string) => {
            const previousTo = toCoinId;
            setToCoinId(value);
            if (value === fromCoinId) {
                const fallback = coins.find((c) => c.id !== value)?.id ?? fromCoinId;
                setFromCoinId(previousTo !== value ? previousTo : fallback);
            }
            const rate = getRate(fromCoinId, value);
            if (lastEdited === "from") {
                setToAmount((prev) => round2(fromAmount * rate));
            } else {
                setFromAmount((prev) => round2(toAmount / rate));
            }
        };

        // Handlers for amount edits
        const handleFromAmountChange = (val: number) => {
            const rate = getRate(fromCoinId, toCoinId);
            setFromAmount(val);
            setToAmount(round2(val * rate));
            setLastEdited("from");
        };

        const handleToAmountChange = (val: number) => {
            const rate = getRate(fromCoinId, toCoinId);
            setToAmount(val);
            setFromAmount(val === 0 ? 0 : round2(val / rate));
            setLastEdited("to");
        };

        // MAX handler for the input (from) field
        const parseBalance = (s: string) => {
            // Remove commas and non-numeric except dot
            const cleaned = (s ?? "0").replace(/[^0-9.]/g, "");
            const n = parseFloat(cleaned);
            return Number.isFinite(n) ? n : 0;
        };
        const handleMax = () => {
            const full = parseBalance(balances[fromCoinId] ?? "0");
            handleFromAmountChange(full);
        };

        // Pricing and summary calculations
        const usdPrices: Record<string, number> = {
            "1": 25, // ARK -> $25.00 (demo)
            "2": 1, // TOK -> $1.00 (demo)
        };
        const formatUSD = (n: number) =>
            new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
        const networkFeeUSD = 3.20;
        const txValueUSD = (usdPrices[toCoinId] ?? 0) * toAmount;
        const orderNetUSD = txValueUSD + networkFeeUSD;

        return (
            <>
                <div className="relative flex flex-col items-center gap-1 mb-4">
                    <ConverterField
                        amount={fromAmount}
                        onAmountChange={handleFromAmountChange}
                        balance={balances[fromCoinId] ?? "0"}
                        selectedCoin={fromCoinId}
                        onSelectCoin={handleFromChange}
                        onMax={handleMax}
                        coins={coins}
                    />
                    <ConverterField
                        isLast
                        amount={toAmount}
                        onAmountChange={handleToAmountChange}
                        balance={balances[toCoinId] ?? "0"}
                        selectedCoin={toCoinId}
                        onSelectCoin={handleToChange}
                        coins={coins}
                    />
                </div>
                {/* Summary */}
                <div className="mb-2 ps-3 uppercase text-muted-foreground/50 text-xs font-medium rounded-md">
                    Summary
                </div>
                <Card className="p-4 gap-0 rounded-md">
                    <ul className="text-sm">
                        <li className="flex items-center justify-between pb-3 mb-3 border-b border-card/50">
                            <span className="text-muted-foreground">Transaction Value</span>
                            <span className="font-medium">{formatUSD(txValueUSD)}</span>
                        </li>
                        <li className="flex items-center justify-between pb-3 mb-3 border-b border-card/50">
                            <span className="text-muted-foreground">Network Fees</span>
                            <span className="font-medium">{formatUSD(networkFeeUSD)}</span>
                        </li>
                        <li className="flex items-center justify-between pb-3 mb-3 border-b border-card/50">
                            <span className="text-muted-foreground">Order Net</span>
                            <span className="font-medium">{formatUSD(orderNetUSD)}</span>
                        </li>
                    </ul>
                    <Button size="lg" className="w-full">
                        Confirm
                    </Button>
                    <div className="text-xs text-center uppercase mt-3">
                        {coins.find((c) => c.id === fromCoinId)?.name} <span className="text-muted-foreground">=</span> 1,574.04{" "}
                        {coins.find((c) => c.id === toCoinId)?.name}
                    </div>
                </Card>
            </>
        );
    }

    return (
        <Tabs defaultValue="tab-1" className="flex-1 gap-5">
            <div className="flex items-center gap-2 justify-end">
                <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 shrink-0 text-muted-foreground hover:text-foreground/80"
                >
                    <span className="sr-only">Settings</span>
                    <RiSettings4Line className="size-5" size={20} aria-hidden="true" />
                </Button>
            </div>
            <div className="dark bg-background dark:bg-secondary/64 rounded-2xl p-2">
                <ConverterContent />
            </div>
        </Tabs>
    );
}