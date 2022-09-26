import React from "react";
import { memo } from "react";

const VoteWrapper = ({ data }) => {
    return (
        <>
        {
            Object.values(data).map((value) => 
            <div className="vote-item">
                { value }
            </div>
            )
        }
        </>
    )
}
export default memo(VoteWrapper);