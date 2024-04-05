import React from 'react';

export default function AirQualityWithImage({ imageSrc, alt, text }) {
    return (
        <div className='searchresult__info__top'>
            <img src={imageSrc} alt={alt} />
            <p>{text}</p>
        </div>
    );
}

