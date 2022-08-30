import React from 'react';
import { memo } from 'react';
import IconHome from '../assets/icon/IconHome';

const Path = ({ data }) => {
  return (
    <div className="path-container">
      <IconHome />
        {
            data.title?.map((value, index) => (
                <span className="path-title" key={ index }>
                    <span className="slash">/</span>{value}
                </span>
            ))
        }
        {
            data.content &&
            <span className="path-content" >
                <span className="slash">/</span>{data.content}
            </span>
        }
        
    </div>
  );
};
export default memo(Path);