import React from "react";
import ReactLoading from "react-loading";

function Loading() {
    return (
        <div className="loading-overlay">
            <ReactLoading
                className="loading-icon"
                type="spin"
                color="#C0C0C0"
                width={'12%'}
                height={'12%'}
            />
        </div>
    );
};

export default Loading;