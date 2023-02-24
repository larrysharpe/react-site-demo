import {Layout} from "../../Layout/Layout";
import {useContext} from "react";
import AppContext from "../../../app.context";
import {NavLink} from "react-router-dom";

export function Home() {
    const {regions} = useContext(AppContext);
    return <Layout>
        <>
            <h1> NOAA Fisheries Regions</h1>
            {regions && <div className="region-cards">
                {
                    Object.values(regions)
                        .sort((a: any, b: any) => {
                            return a.name.localeCompare(b.name);
                        })
                        .map((region: any) => {
                            return <div key={region.name} className="region-card">
                                <div className="region-title-block">
                                    <span className="region-name">{region.name}</span>
                                    <NavLink to={region.path}>Details</NavLink>
                                </div>
                                <div>
                                    <b>Per Serving:</b><br/>
                                    <b>Average Calories:</b> {region.avgCalories}
                                    <br/>
                                    <b>Average Fat:</b> {region.avgFat}g
                                </div>
                            </div>
                        })
                }
            </div>}
        </>
    </Layout>
}
