import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    onRate?: (rating: number) => void;
    size?: number;
    interactive?: boolean;
}

export default function StarRating({ rating, onRate, size = 20, interactive = false }: StarRatingProps) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    onClick={() => interactive && onRate?.(star)}
                    className={`transition-all duration-200 ${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'}`}
                    disabled={!interactive}
                    type="button"
                >
                    <Star
                        size={size}
                        className={`${star <= rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : star - 0.5 <= rating
                                    ? 'text-yellow-400 fill-yellow-400/50'
                                    : 'text-gray-300'
                            } transition-colors duration-200`}
                    />
                </button>
            ))}
        </div>
    );
}
