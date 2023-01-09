import {createContext, useContext } from "react";

export const Context = createContext({
    setListId: (data) => {},
    urlIds: [],
} );

const ShortVideoContext = () => useContext(Context);

interface IContextProps {
    deleteArticle: () => void;
    handleChangeId: (id: string) => void;
    id: number;
  }
export const DashBoardContext = createContext({} as IContextProps);
  
export const useDashBoardContext = () => useContext(DashBoardContext);

export default ShortVideoContext;
