import React from 'react';
import '../../assets/css/Spinner.css'; // import the styles

const Spinner = ({ progress, size, width, strokeWidth, strokeColor, color, textSize }) => {
  return (
    <div className="spinner-container relative">
      <svg className={width ? 'spinner w-'+width+' h-'+width : 'spinner w-10'} viewBox="0 0 50 50">
        <circle className={strokeColor ? 'path '+strokeColor : 'path stroke-black'} cx="25" cy="25" r={size ?? 20} fill="none" strokeWidth={strokeWidth ?? 1.5}></circle>
      </svg>
      <div className={textSize ? 'text font-normal '+textSize : 'text text-xs font-normal'}>
      {
        progress && (
                <span className={color ?? 'text-black'}>{progress}%</span>
        )
      }
      </div>

    </div>
  );
};

export default Spinner;
