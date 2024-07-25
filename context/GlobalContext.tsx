'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface GlobalProviderProps {
    children: ReactNode
}

interface GlobalContextType {
    unreadCount: number;
    setUnreadCount: Dispatch<SetStateAction<number>>;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export function GlobalProvider ({children}: GlobalProviderProps) {
    const [unreadCount, setUnreadCount] = useState(0);
    return (
        <GlobalContext.Provider value={{
            unreadCount, setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}