import { createContext, useContext } from "react";

interface IContextProps {
  deleteArticle: () => void;
  handleChangeId: (id: string) => void;
  id: number;
}
export const Context = createContext({} as IContextProps);

const useShortVideoContext = () => useContext(Context);

export default useShortVideoContext;
