import React, { useState } from "react";
import { Rating } from '@smastrom/react-rating';
import apiConfig from "@/utils/config";


const ReviewCard = ({ review }) => {
    const {
        user, 
        cleanliness, 
        accuracy, 
        checkIn, 
        communication, 
        location, 
        value,
        comment, createdAt } = review;
    const average = (cleanliness + accuracy + checkIn + communication + location + value) / 6;
    const apiUrl = apiConfig.baseUrl;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md mb-4">
        <div className="flex items-center mb-4">
            <img
            className="w-12 h-12 rounded-full mr-4"
            src={ user.picture.startsWith('http') ? user.picture : (apiUrl+user.picture)}
            alt={`${user.name}'s avatar`}
            />
            <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <div className='flex justify-center'>
                  <Rating style={{ maxWidth: 100,maxHeight:40 }} value={average.toFixed(2)} readOnly />
                  <h2 className='text-md font-bold'>{average.toFixed(2)}</h2>
              </div>
            <p className="text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </div>

        <p className="text-gray-700 mb-4">{comment}</p>

        {/* Display other review details if needed */}
        {/* For example, you can display cleanliness, accuracy, etc. */}
        {/* <p>Cleanliness: {review.cleanliness}</p> */}

        {/* You can customize the styling and content based on your needs */}
        </div>
    )
}

export default ReviewCard;
