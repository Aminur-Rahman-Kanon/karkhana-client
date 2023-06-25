import React from "react";
import { createContext } from "react";

export const ContextProvider = createContext(null);

const AuthContext = ({children, value}) => <ContextProvider.Provider value={value}>{children}</ContextProvider.Provider>

export default AuthContext;
