import {Layout} from "../../Layout/Layout";
import {useLocation} from "react-router-dom"
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../app.context";

const descriptionFields = [
    'Availability', 'Biology', 'Bycatch', 'Color', 'ryManagement', 'ngRate', 'HabitatImpacts', 'Harvest', 'HarvestType', 'HealthBenefits', 'Location', 'PhysicalDescription', 'Population', 'PopulationStatus', 'Quote', 'Source', 'SpeciesAliases', 'Taste', 'Texture'
]

export function Region() {
    const [selectedFish, setSelectedFish] = useState(0);
    const {pathname} = useLocation();
    const {regions} = useContext(AppContext);

    if (!regions) {
        return <></>
    }

    const region = Object.values(regions).find((data) => data.path === pathname)

    function selectFish (e: React.MouseEvent<HTMLDivElement>) {
        const { index } = e.currentTarget.dataset;
        setSelectedFish(Number(index));
    }

    const imgProps = region.fish[selectedFish].image;

    return <Layout>
        <h1>{region.name} Region</h1>
        <h2>Fish in the Region</h2>
        <div className="flex">
            <div style={{width: 260, borderRight: "1px solid #eeeeee"}}>
                {region.fish.map((fish: any, index: number) => {
                    return <div
                        data-index={index}
                        onClick={selectFish}
                        className={`region-link ${index === selectedFish ? "active" : ""}`}
                    >
                        <b>{fish.name}</b>
                    </div>
                })}
            </div>
            <div style={{ width: 640 }}>
                <h2 style={{ margin: 0 }}>{region.fish[selectedFish].name}</h2>

                <img {...imgProps} className="avatar" />
                <p>
                    <b>Calories Per Serving:</b> {region.fish[selectedFish].calories}
                </p>
                <p>
                    <b>Fat Per Serving:</b> {region.fish[selectedFish].fat}
                </p>
                <table>
                    {
                        descriptionFields.map((field: string) => {
                            if (!region.fish[selectedFish].description[field]) {
                                return <></>;
                            }
                            return <tr>
                                <td><b>{field}</b></td>
                                <td dangerouslySetInnerHTML={{__html: region.fish[selectedFish].description[field]}} />
                            </tr>
                        })
                    }
                </table>
            </div>
        </div>
    </Layout>
}
