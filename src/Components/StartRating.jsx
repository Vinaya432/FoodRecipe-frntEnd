import React, { useState } from 'react'


function StartRating() {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
      setRating(value);
    }
  return (
    <>
        {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input  name="rating" value={ratingValue} onClick={() => handleClick(ratingValue)}
            />
            <i className={ratingValue <= rating ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
          </label>
        );
      })}
    </>
  )
}

export default StartRating