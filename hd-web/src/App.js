import React, { useState, useEffect } from 'react';
import "./App.css";
import AreaStat from "./components/AreaStat";
import listingData from './assets/data/proc_zillow.csv'; // This needs to be replaced by a HTTP request
import Map from "./components/Map";
import * as d3 from "d3";

export default function App() {

    // Parser function for the csv file
    function rowConverter(d) {
        return {
            ...d,
            sqft: +d.sqft,
            num_baths: +d.num_baths,
            num_beds: +d.num_beds,
            lat: +d.lat,
            lng: +d.lon,
            price: +d.price,
        };
    };

    // Stores the raw data from the csv file obtained through an API/Fetch call
    const [mapData, setMapData] = useState(null);

    // Loading data from the csv file
    useEffect(() => {
        d3.csv(listingData, rowConverter)
            .then((listingData) => {
                setMapData(listingData);
            })
    }, []);

    console.log(mapData)
    return (
        <div className="App">
            {/* Only Render in the Area Stat once the data has been loaded NOTE: data only evaluates to true if it is not null*/}
            {mapData && <AreaStat data={mapData} />}
            {mapData && <Map data={mapData} />}
        </div>
    )
}