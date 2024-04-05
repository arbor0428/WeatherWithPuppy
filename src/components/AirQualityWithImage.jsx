import React from 'react';

export default function AirQualityWithImage({ imageSrc, alt, text }) {
    return (
        <div>
            <img src={imageSrc} alt={alt} />
            <span>{text}</span>
        </div>
    );
}

