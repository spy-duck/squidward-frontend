import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type TSquidConfigPageContext = {
};


export const SquidConfigPageContext = createContext<TSquidConfigPageContext>({} as TSquidConfigPageContext)

export const useSquidConfigPageContext = () => useContext(SquidConfigPageContext);

type TSquidConfigPageContextProps = {
    children?: ReactNode
};
export const SquidConfigPageProvider = ({ children }: TSquidConfigPageContextProps) => {
    return (
        <SquidConfigPageContext value={ {
        } }>
            { children }
        </SquidConfigPageContext>
    );
    
}