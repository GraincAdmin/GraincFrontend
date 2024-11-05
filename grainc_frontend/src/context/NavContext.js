import React, { createContext, useState } from 'react';

export const NavContext = createContext();

// Create a Provider component
export const NavContextProvider = ({ children }) => {
    const [respondedNavStyle, setRespondedNavStyle] = useState(false)

    
    return (
        <NavContext.Provider value={{ respondedNavStyle, setRespondedNavStyle }}>
            {children}
        </NavContext.Provider>
    );
};