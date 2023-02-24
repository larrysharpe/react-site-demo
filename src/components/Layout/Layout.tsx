import {NavLink, useLocation} from "react-router-dom";
import React, {useContext} from "react";
import AppContext from "../../app.context";

export function Layout ({children}: any) {

    const { regions, regionsList } = useContext(AppContext);
    const {pathname} = useLocation();

    return <div className="content-wrapper">
        <header className="primary">
            <NavLink to="/" className="branding">
                Regional Fish Matrix
            </NavLink>
            <nav>
                <NavLink to="/" className={`navlink${pathname === "/" ? " active" : ""}`}>Home</NavLink>
                {regionsList?.map( (region: string) => {
                    const rgn = regions?.[region];
                    const className = `navlink${rgn.path === pathname ? " active" : ""}`;
                    return <NavLink to={rgn.path} key={rgn.path} className={className}>{rgn.name}</NavLink>
                } )}
            </nav>
        </header>
        {children}
    </div>
}
