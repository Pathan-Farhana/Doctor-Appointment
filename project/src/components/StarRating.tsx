import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className = "" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <Star className="w-4 h-4 text-yellow-400" />
              <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        } else {
          return <Star key={i} className="w-4 h-4 text-yellow-400" />;
        }
      })}
    </div>
  );
};

export default StarRating;