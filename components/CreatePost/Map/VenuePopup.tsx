import React, { FC } from "react";
import { memo } from "react";

interface IPopupProps {
  title: string;
}
export const VenuePopup: FC<IPopupProps>= memo(({title}) => {
  return (
    <div>
      <strong>{title}</strong>
    </div>
  );
});

VenuePopup.displayName = "Venue Popup";


