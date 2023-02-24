import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AppContext from "../../app.context";

import {Home} from "../routes/Home/Home";
import {NotFound} from "../routes/NotFound/NotFound";
import {getAppData} from "../../utils/service-requests";
import {Region} from "../routes/Region/Region";

function formatAVGFat(input: string) {
    return input ? Math.round(Number(input.replace(/[ A-Za-z]/g, ''))) : 0
}

function App() {
    const [regions, setRegions] = useState<any>();
    const [regionsList, setRegionsList] = useState<any>([]);
    const [router, setRouter] = useState<any>();

    function buildRegionsDictionary(data: any) {
        const regionsSet: any = {};
        data.forEach((item: any) => {
            if (!regionsSet[item.NOAAFisheriesRegion]) {
                regionsSet[item.NOAAFisheriesRegion] = {
                    avgCalories: 0,
                    avgFat: 0,
                    fish: [],
                    name: item.NOAAFisheriesRegion,
                    path: "/" + item.NOAAFisheriesRegion.replace(/ /g, '-').toLowerCase(),
                }
            }

            const region = regionsSet[item.NOAAFisheriesRegion];

            region.avgFat = region.avgFat + formatAVGFat(item.FatTotal);
            region.avgCalories = region.avgCalories + Number(item.Calories);

            const fish: any = {
                description: {
                    Availability: item.Availability,
                    Biology: item.Biology,
                    Bycatch: item.Bycatch,
                    Color: item.Color,
                    FisheryManagement: item.FisheryManagement,
                    FishingRate: item.FishingRate,
                    HabitatImpacts: item.HabitatImpacts,
                    Harvest: item.Harvest,
                    HarvestType: item.HarvestType,
                    HealthBenefits: item.HealthBenefits,
                    Location: item.Location,
                    PhysicalDescription: item.PhysicalDescription,
                    Population: item.Population,
                    PopulationStatus: item.PopulationStatus,
                    Quote: item.Quote,
                    Source: item.Source,
                    SpeciesAliases: item.SpeciesAliases,
                    Taste: item.Taste,
                    Texture: item.Texture,
                },
                calories: item.Calories,
                fat: item.FatTotal,
                image: item.ImageGallery?.[0],
                name: item.SpeciesName,
                isOpen: false
            }
            regionsSet[item.NOAAFisheriesRegion].fish.push(fish);
        })
        Object.values(regionsSet).forEach((region: any) => {
            region.avgFat = Math.round(region.avgFat / region.fish.length)
            region.avgCalories = Math.round(region.avgCalories / region.fish.length)
            region.fish.sort((a: any, b: any) => a.name.localeCompare(b.name))
        })
        return regionsSet;
    }

    function buildRoutes(regionsList: any) {
        return regionsList.map((region: string) => {
            return {
                path: "/" + region.replace(/ /g, '-').toLowerCase(),
                element: <Region/>
            }
        })
    }

    async function loadAppData() {
        const data = await getAppData();
        const regionsDictionary = buildRegionsDictionary(data);
        const regionNamesList = Object.keys(regionsDictionary);

        const routes = [
            {path: "/", element: <Home/>, errorElement: <NotFound/>},
            ...buildRoutes(regionNamesList)
        ]

        const router = createBrowserRouter(routes);
        setRegionsList(regionNamesList)
        setRouter(router)
        setRegions(regionsDictionary);
    }

    useEffect(() => {
        loadAppData()
    }, [])


    return (
        <AppContext.Provider value={{regions, regionsList}}>
            {router && <RouterProvider router={router}/>}
        </AppContext.Provider>
    );
}

export default App;


