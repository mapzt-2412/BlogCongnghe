import {createContext, useContext } from "react";

export const Context = createContext({
    setListId: (data) => {},
    urlIds: [],
} );

const ShortVideoContext = () => useContext(Context);

export default ShortVideoContext;
