import { assets } from '../assets/assets';
import { useState } from 'react';
import { submitReview} from '../services/api';


const getInitialColor = (username) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#E67E22'
  ];
  
  const initial = username?.charAt(0).toUpperCase() || '?';
  const charCode = initial.charCodeAt(0);
  return colors[charCode % colors.length];
};

const renderStars = (rating) => {
  // Safely convert to number and clamp between 0-5
  const numericRating = Number(rating) || 0;
  const validatedRating = Math.min(Math.max(numericRating, 0), 5);
  
  const fullStars = Math.floor(validatedRating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <img key={`full-${i}`} src={assets.star} className="w-6 h-6" alt="★" />
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <img key={`empty-${i}`} src={assets.empty_star} className="w-6 h-6" alt="☆" />
      ))}
    </>
  );
};
export const ReviewsSection = ({ reviews }) => {
  const calculateAverages = () => {
    let comfortTotal = 0;
    let interiorTotal = 0;
    let performanceTotal = 0;
    let speedTotal = 0;
    
    reviews.forEach(review => {
      comfortTotal += review.comfort;
      interiorTotal += review.interiorDesign;
      performanceTotal += review.performance;
      speedTotal += review.speed;
    });
        const count = reviews.length || 1; // Prevent division by zero
    const averages = {
      comfort: (comfortTotal / count).toFixed(1),
      interiorDesign: (interiorTotal / count).toFixed(1),
      performance: (performanceTotal / count).toFixed(1),
      speed: (speedTotal / count).toFixed(1),
      overall: ((comfortTotal + interiorTotal + performanceTotal + speedTotal) / (count * 4)).toFixed(1)
    };

    return averages;
  };

  const averages = calculateAverages();
  const averageRating = parseFloat(averages.overall);


  // Circular progress calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (averageRating / 5) * circumference;

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
      
      {/* Overall Rating */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="absolute inset-0 transform -rotate-90" width="186" height="186">
            <circle
              cx="93"
              cy="93"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="93"
              cy="93"
              r={radius}
              stroke="#D01818"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center z-10">
            <p className="text-gray-600">Overall Ratings</p>
            <p className="text-4xl font-bold">{averageRating}</p>
            <p className="text-gray-600">Out of 5</p>
          </div>
        </div>

        {/* Rating Details */}
        <div className="flex-1 space-y-4">
          {[
            { category: 'Comfort', value: averages.comfort },
            { category: 'Interior Design', value: averages.interiorDesign },
            { category: 'Performance', value: averages.performance },
            { category: 'Speed', value: averages.speed }
          ].map(({ category, value }) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(value)}</div>
                  <span className="text-sm text-gray-600">{value}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500" 
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Individual Reviews */}
<div className="space-y-6">
  {reviews.map((review) => (
    <div key={review._id} className="border-b pb-6">
      <div className="flex items-start gap-4"> {/* Changed to items-start */}
        <div className="relative flex-shrink-0"> {/* Added flex-shrink-0 */}
          {/* Avatar Container */}
          {review.user?.profileImage ? (
            <img 
              src={`http://localhost:8001${review.user.profileImage}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              alt={review.user?.username || 'Anonymous'}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div 
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-white font-semibold"
              style={{ 
                backgroundColor: getInitialColor(review.user?.username),
                fontSize: '1.5rem'
              }}
            >
              {review.user?.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0"> {/* Added min-w-0 for better text wrapping */}
          <div className="flex items-baseline gap-2 mb-1"> {/* Added container for username/date */}
            <h4 className="font-semibold text-lg">
              {review.user?.username || 'Anonymous User'}
            </h4>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2"> {/* Added margin-bottom */}
            <div className="flex">
              {renderStars(
                (Number(review.comfort) + 
                Number(review.performance) + 
                Number(review.interiorDesign) + 
                Number(review.speed)) / 4
              )}
            </div>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export const ReviewForm = ({ carId, onReviewSubmit }) => {
  const [submitError, setSubmitError] = useState('');
  const categoryMap = {
  'Comfort': 'comfort',
  'Performance': 'performance',
  'Interior Design': 'interiorDesign',
  'Speed': 'speed'
};
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
  
  if (!comment.trim()) {
    setSubmitError('Please write a review comment');
    return;
  }

    try {
      // Structure of the data being sent
    const reviewData = {
      comfort: selectedRatings.comfort,
      performance: selectedRatings.performance,
      interiorDesign: selectedRatings.interiorDesign,
      speed: selectedRatings.speed,
      comment: comment
    };

      // API call
    const response = await submitReview(carId, reviewData);
    
    // Check if response contains full review data
    if (response?.fullReview) {
      onReviewSubmit(response.fullReview);
    } else {
      // If not, trigger refresh
      onReviewSubmit(null); // Signal to parent to refresh
    }
      
      setSelectedRatings({
        comfort: 1,
        performance: 1,
        interiorDesign: 1,
        speed: 1
    });
    setComment('');

    } catch (error) {
      console.error('Submission error:', error);
    }
  };

const [selectedRatings, setSelectedRatings] = useState({
  comfort: 1,
  performance: 1,
  interiorDesign: 1,
  speed: 1
});

  const [hoverRatings, setHoverRatings] = useState({
    Comfort: 0,
    Performance: 0,
    'Interior Design': 0,
    Speed: 0
  });

  const handleStarHover = (category, value) => {
    setHoverRatings(prev => ({
      ...prev,
      [category]: Math.max(value, 1) // Ensure minimum 1 star
    }));
  };

const handleStarClick = (category, value) => {
  const backendFieldMap = {
    'Comfort': 'comfort',
    'Performance': 'performance',
    'Interior Design': 'interiorDesign', // Map display name to schema name
    'Speed': 'speed'
  };

  const fieldName = backendFieldMap[category];
  const newValue = Math.max(value, 1);
  
  setSelectedRatings(prev => ({
    ...prev,
    [fieldName]: newValue
  }));
};

  const renderStarInput = (category) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const currentHover = hoverRatings[category];
      const currentSelected = selectedRatings[category];

      // Determine which rating to display (hover takes priority)
      const displayValue = currentHover > 0 ? currentHover : currentSelected;

      return (
        <button
          type="button"
          key={index}
          className="relative w-8 h-8"
          onMouseEnter={() => handleStarHover(category, starValue)}
          onMouseLeave={() => setHoverRatings(prev => ({ ...prev, [category]: 0 }))}
          onClick={() => handleStarClick(category, starValue)}
        >
          {displayValue >= starValue ? (
            <img src={assets.star} className="w-6 h-6" alt="full star" />
          ): (
            <img src={assets.empty_star} className="w-6 h-6" alt="empty star" />
          )}
        </button>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {submitError && (
            <div className="text-red-500 text-sm">{submitError}</div>)}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {Object.keys(categoryMap).map((displayName) => {
    const fieldName = categoryMap[displayName];
    return (
      <div key={fieldName} className="flex items-center justify-between">
        <span className="text-gray-700">{displayName}</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            const isActive = selectedRatings[fieldName] >= starValue;
            
            return (
              <button
                type="button"
                key={index}
                className="relative w-8 h-8"
                onMouseEnter={() => setHoverRatings(prev => ({
                  ...prev,
                  [fieldName]: starValue
                }))}
                onMouseLeave={() => setHoverRatings(prev => ({
                  ...prev,
                  [fieldName]: 0
                }))}
                onClick={() => setSelectedRatings(prev => ({
                  ...prev,
                  [fieldName]: starValue
                }))}
              >
                {(hoverRatings[fieldName] || selectedRatings[fieldName]) >= starValue ? (
                  <img src={assets.star} className="w-6 h-6" alt="★" />
                ) : (
                  <img src={assets.empty_star} className="w-6 h-6" alt="☆" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  })}
</div>

        <div>
          <textarea
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="4"
            placeholder="Write your review..."
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};