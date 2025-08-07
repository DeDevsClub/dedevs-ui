"use client";

import React from 'react';

// TypeScript interface for the props of each NFT card
export interface NftCardProps {
    id: string;
    imageUrl: string;
    title: string;
    highestBid: string;
    price: string;
    timeLeft?: string;
    onFavorite?: () => void;
    isFavorited?: boolean;
    className?: string;
}

// SVG Icon Components
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const EthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75Z" opacity="0.6"/>
        <path d="M12 17.5L5.75 13.5L12 22.25L18.25 13.5L12 17.5Z"/>
    </svg>
);

// The NFT Card Component
export const NftCard: React.FC<NftCardProps> = ({ 
    imageUrl, 
    title, 
    highestBid, 
    price, 
    timeLeft,
    onFavorite,
    isFavorited = false,
    className = ""
}) => {
    return (
        <div className={`relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700 w-full ${className}`}>
            <div className="relative p-2 sm:p-2.5">
                {/* Card Image Section */}
                <div className="relative">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-auto rounded-xl sm:rounded-2xl object-cover aspect-square" 
                    />

                    {/* Time Left Overlay */}
                    {timeLeft && (
                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 dark:bg-black/70 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm border border-white/20">
                            <ClockIcon className="w-3 h-3 sm:w-5 sm:h-5 text-cyan-300" />
                            <span className="hidden sm:inline">{timeLeft}</span>
                            <span className="sm:hidden">{timeLeft.split(':')[0]}h</span>
                        </div>
                    )}

                    {/* Favorite Button */}
                    <button 
                        onClick={onFavorite}
                        className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 dark:bg-black/70 text-white p-1.5 sm:p-2.5 rounded-full transition-colors backdrop-blur-sm border border-white/20 ${
                            isFavorited ? 'text-red-500' : 'hover:text-red-500'
                        }`}
                    >
                        <HeartIcon className={`w-4 h-4 sm:w-6 sm:h-6 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Card Content Section */}
                <div className="mt-3 sm:mt-4 px-1 sm:px-1.5 pb-2 sm:pb-3 pt-1 sm:pt-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate pr-2" title={title}>
                            {title}
                        </h3>
                        <EthIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Highest Bid {highestBid}
                    </p>

                    <div className="mt-3 sm:mt-4 flex justify-between items-center">
                        <p className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">Price</p>
                        <p className="text-sm sm:text-lg font-bold text-cyan-600 dark:text-cyan-400">{price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
