import React from "react";

interface IAppContext {
    regions?: {
        [key: string]: any
    },
    regionsList?: any[];
}
const defaultContext: IAppContext = {}
const AppContext = React.createContext(defaultContext);
export default AppContext;
