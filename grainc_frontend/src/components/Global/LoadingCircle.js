import React, { useEffect, useState } from "react";
import '../../static/css/Global/LoadingCircle.css'
function LoadingCircle({color_option, size_option}) {

    const [colorOption, setColorOption] = useState(false);

    useEffect(() => {
        if (color_option) {
            setColorOption(true)
        } else {
            setColorOption(false)
        }
    }, [color_option]);

    return (
        <div 
            className={`${size_option ? 'loading_circle_fs' : null}`}
            style={{display:'flex', width: 'auto', height: 'auto'}}>
            <svg
            className={`loading_container ${colorOption ? 'color_option_blue' : null}`}
            viewBox="0 0 40 40"
            height='40'
            width='40'
            >
            <circle 
                className="track"
                cx="20" 
                cy="20" 
                r="17.5" 
                pathlength="100" 
                stroke-width="5px" 
                fill="none" 
            />
            <circle 
                className="car"
                cx="20" 
                cy="20" 
                r="17.5" 
                pathlength="100" 
                stroke-width="5px" 
                fill="none" 
            />
            </svg>
        </div>
    );
}

export default LoadingCircle