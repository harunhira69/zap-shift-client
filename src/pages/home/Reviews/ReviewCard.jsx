import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {userName,review:testimonial,user_photoURL} = review;
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 max-w-sm">

      <FaQuoteLeft className="text-teal-300 text-4xl mb-2" />

      <p className="text-gray-600 text-sm leading-relaxed">
     {testimonial}
      </p>

      <div className="w-full my-4 h-[2px] bg-[radial-gradient(circle,#9ca3af_1px,transparent_1px)] bg-[length:8px_2px]"></div>

      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-[#004D54] rounded-full">
        <img src=   {user_photoURL} alt="" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">{userName}</h4>
          <p className="text-xs text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
