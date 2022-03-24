import React from "react";
import preLoaderSvg from "./Spin-1.4s-124px.svg"

export const PreLoader: React.FC = () => {
    return (
        <div className='app__flex'>
            <img alt="Loading" src={preLoaderSvg}/>
        </div>
    );
};
