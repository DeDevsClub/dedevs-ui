"use client";

import React, { useState } from 'react';
import { NftCard, type NftCardProps } from '@repo/defi/nft-card';

// Sample NFT data
const nftData: (NftCardProps & { isFavorited?: boolean })[] = [
    {
        id: 'ethereal-dreams-001',
        imageUrl: 'https://i.pinimg.com/1200x/93/b6/9f/93b69fd5d973b3f2fbc325982eb8e658.jpg',
        title: 'Ethereal Dreams',
        highestBid: '1/1',
        price: '0.047 ETH',
        timeLeft: '08:10:00',
        isFavorited: false,
    },
    {
        id: 'crystal-harmony-002',
        imageUrl: 'https://i.pinimg.com/1200x/c5/3e/6e/c53e6e265a893d70b00070563d063606.jpg',
        title: 'Crystal Harmony',
        highestBid: '1/1',
        price: '0.023 ETH',
        timeLeft: '10:40:00',
        isFavorited: true,
    },
    {
        id: 'celestial-arch-003',
        imageUrl: 'https://i.pinimg.com/736x/c6/1c/ae/c61cae893723278b817cd64ffc966bf8.jpg',
        title: 'Celestial Arch',
        highestBid: '1/1',
        price: '0.034 ETH',
        timeLeft: '03:45:00',
        isFavorited: false,
    },
    {
        id: 'quantum-sphere-004',
        imageUrl: 'https://i.pinimg.com/1200x/e1/6c/58/e16c5867c9dcb1334d45cf51caee3563.jpg',
        title: 'Quantum Sphere',
        highestBid: '1/1',
        price: '0.041 ETH',
        timeLeft: '02:30:00',
        isFavorited: false,
    },
    {
        id: 'digital-nexus-005',
        imageUrl: 'https://i.pinimg.com/736x/c0/09/b1/c009b1bd4d8bb5439c59221e2eca7516.jpg',
        title: 'Digital Nexus',
        highestBid: '1/1',
        price: '0.029 ETH',
        timeLeft: '12:15:00',
        isFavorited: false,
    },
    {
        id: 'auric-flow-006',
        imageUrl: 'https://i.pinimg.com/1200x/2a/59/11/2a591199f4558350175dd0b2e120558a.jpg',
        title: 'Auric Flow',
        highestBid: '1/1',
        price: '0.056 ETH',
        timeLeft: '06:20:00',
        isFavorited: true,
    },
];

export default function DefiNftCardMarketplace() {
    const [favorites, setFavorites] = useState<Record<string, boolean>>(
        nftData.reduce((acc, nft) => ({ ...acc, [nft.id]: nft.isFavorited || false }), {})
    );

    const handleFavorite = (id: string) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 min-h-[800px]">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-text dark:text-text mb-2">
                    NFT Marketplace
                </h1>
                <p className="text-text dark:text-text">
                    Discover, collect, and trade unique digital assets
                </p>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {nftData.map((nft) => (
                    <NftCard
                        key={nft.id}
                        id={nft.id}
                        imageUrl={nft.imageUrl}
                        title={nft.title}
                        highestBid={nft.highestBid}
                        price={nft.price}
                        timeLeft={nft.timeLeft}
                        isFavorited={favorites[nft.id]}
                        onFavorite={() => handleFavorite(nft.id)}
                    />
                ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background dark:bg-background rounded-lg">
                    <div className="text-2xl font-bold text-text dark:text-text">
                        {nftData.length}
                    </div>
                    <div className="text-sm text-text dark:text-text">
                        Total NFTs
                    </div>
                </div>
                <div className="text-center p-6 bg-background dark:bg-background rounded-lg">
                    <div className="text-2xl font-bold text-text dark:text-text">
                        {Object.values(favorites).filter(Boolean).length}
                    </div>
                    <div className="text-sm text-text dark:text-text">
                        Favorited
                    </div>
                </div>
                <div className="text-center p-6 bg-background dark:bg-background rounded-lg">
                    <div className="text-2xl font-bold text-text dark:text-text">
                        {nftData.reduce((sum, nft) => sum + parseFloat(nft.price.replace(' ETH', '')), 0).toFixed(3)} ETH
                    </div>
                    <div className="text-sm text-text dark:text-text">
                        Total Value
                    </div>
                </div>
            </div>
        </div>
    );
}
