import React from "react";
import { memo } from "react";

const VoteWrapper = ({ data }) => {
    return (
        <>
        {
            Object.values(data).map((value, index) => 
            <div className="vote-item" key ={index}>
                { value }
            </div>
            )
        }
        </>
    )
}
export default memo(VoteWrapper);