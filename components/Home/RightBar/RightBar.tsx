import React, { FC, memo, ReactNode } from 'react';

interface IRightBarProps {
    title?: string;
    children?: ReactNode;
}

const RightBar: FC<IRightBarProps> = ({ title, children }) => {
    return (
        <div className="rightbar-container">
            <div className="rightbar-title">
                <p>{title}</p>
            </div>
            <div className="rightbar-content">
                { children }
            </div>
        </div>
    )
}
export default memo(RightBar);