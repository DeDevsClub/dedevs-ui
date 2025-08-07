"use client";

import React from 'react';
import { NftCard } from '@repo/defi/nft-card';

export default function DefiNftCardBasic() {
    return (
        <div className="flex items-center justify-center min-h-[600px] p-6">
            <div className="max-w-sm w-full">
                <NftCard
                    id="ethereal-dreams-001"
                    imageUrl="https://i.pinimg.com/1200x/93/b6/9f/93b69fd5d973b3f2fbc325982eb8e658.jpg"
                    title="Ethereal Dreams"
                    highestBid="1/1"
                    price="0.047 ETH"
                    timeLeft="08:10:00"
                    onFavorite={() => console.log('Favorited!')}
                />
            </div>
        </div>
    );
}
