"use client";

import React, { useState } from 'react';
import { NftCard, type NftCardProps } from '@repo/defi/nft-card';

// Data for the NFT cards, with updated image URLs as requested.
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
        id: 'cosmic-voyage-006',
        imageUrl: 'https://i.pinimg.com/736x/fb/27/0f/fb270f928d2af556c9d97f2af5fb908d.jpg',
        title: 'Cosmic Voyage',
        highestBid: '1/1',
        price: '0.20 ETH',
        timeLeft: '01:15:00',
    },
    {
        id: 'neon-pulse-006',
        imageUrl: 'https://i.pinimg.com/1200x/8a/2c/14/8a2c14c5f8e7b3d9a1e4f6c8b2d5e9f7.jpg',
        title: 'Neon Pulse',
        highestBid: '1/1',
        price: '0.056 ETH',
        timeLeft: '06:20:00',
        isFavorited: true,
    },
    {
        id: 'future-vision-007',
        imageUrl: 'https://i.pinimg.com/1200x/af/5f/3d/af5f3d7fc5d2cd647fc5559c86b61096.jpg',
        title: 'Future Vision',
        highestBid: '1/1',
        price: '0.088 ETH',
        timeLeft: '15:30:00',
    },
    {
        id: 'neo-genesis-008',
        imageUrl: 'https://i.pinimg.com/736x/a8/13/20/a81320aa1ad808fa2fe9d05d06f06a6c.jpg',
        title: 'Neo Genesis',
        highestBid: '1/1',
        price: '0.20 ETH',
        timeLeft: '01:15:00',
    },
    {
        id: 'neon-warrior-009',
        imageUrl: 'https://i.pinimg.com/1200x/4a/2a/8b/4a2a8b8d5c9a4cccc8de1e015119dfb3.jpg',
        title: 'Neon Warrior',
        highestBid: '1/1',
        price: '0.11 ETH',
        timeLeft: '07:55:00',
    },
    {
        id: 'stellar-guardian-010',
        imageUrl: 'https://i.pinimg.com/1200x/97/67/23/976723dda78a202b1ddbc5fc674c7511.jpg',
        title: 'Stellar Guardian',
        highestBid: '1/1',
        price: '0.35 ETH',
        timeLeft: '18:00:00',
    },
    {
        id: 'dimensional-gate-011',
        imageUrl: 'https://i.pinimg.com/1200x/67/99/6a/67996a2154fd2a8da518e4bfb45c1474.jpg',
        title: 'Dimensional Gate',
        highestBid: '1/1',
        price: '0.42 ETH',
        timeLeft: '11:20:00',
    },
    {
        id: 'auric-flow-012',
        imageUrl: 'https://i.pinimg.com/1200x/2a/59/11/2a591199f4558350175dd0b2e120558a.jpg',
        title: 'Auric Flow',
        highestBid: '1/1',
        price: '0.50 ETH',
        timeLeft: '04:45:00',
    },
];


// Main App Component to display the grid of NFT cards
const NftMarketplace: React.FC = () => {
    const [favorites, setFavorites] = useState<Record<string, boolean>>(
        nftData.reduce((acc, nft) => ({ ...acc, [nft.id]: nft.isFavorited || false }), {})
    );

    const handleFavorite = (id: string) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 overflow-hidden min-h-[1000px]">
            {/* Google Font Import */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');`}
            </style>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8 lg:mb-12 text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 font-space-grotesk">
                        NFT Marketplace
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
                        Discover, collect, and trade unique digital assets
                    </p>
                </div>

                {/* Fully responsive grid with 4 columns max on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
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
            </div>
            {/* Add keyframes for animation and font-family */}
            <style>{`
        @keyframes aurora {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-aurora {
          animation: aurora 20s linear infinite;
        }
        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
        </div>
    );
};

export default NftMarketplace;
