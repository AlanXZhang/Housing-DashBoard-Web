import React, {useState, useEffect} from 'react';
import "./App.css";
import AreaStat from "./components/AreaStat";
import listingData from './assets/data/proc_zillow.csv';
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
            lon: +d.lon,
            price: +d.price,
        };
    };

    // Stores the raw data from the csv file obtained through an API/Fetch call
    const [data, setData] = useState(null);
    const [subsetData, setSubsetData] = useState(null)

    // Loading data from the csv file
    useEffect(() => {
        d3.csv(listingData, rowConverter)
            .then((listingData) => {
                setData(listingData);
                setSubsetData(listingData);
            })
    }, []);

    // Update the subset data when the map is zoomed in or out
    useEffect(() => {

    }, []);
    
    return (
        <div className="App">
            {/* Only Render in the Area Stat once the data has been loaded NOTE: data only evaluates to true if it is not null*/}
            {subsetData && <AreaStat data={subsetData}/>}
            <Map />
        </div>
    )
}