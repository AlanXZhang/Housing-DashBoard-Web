import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import AreaStat from "./components/AreaStat";
import listingData from './assets/data/final_df.csv'; // This needs to be replaced by a HTTP request
// import listingData from './assets/data/proc_zillow.csv'; // This needs to be replaced by a HTTP request
import Map from "./components/Map";
import Listings from "./components/Listings"
import SwapButton from "./components/SwapButton"
import * as d3 from "d3";

export default function App() {

    // Parser function for the csv file
    function rowConverter(d) {
        return {
            sqft: +d.sqft,
            num_baths: +d.num_baths,
            num_beds: +d.num_beds,
            lat: +d.lat,
            lng: +d.lon,
            price: +d.price,
            address: d.address,
            full_address: d.full_address,
            zAddress: d.Address,
            house_type: d.houseType,
            image: d.Images,
            description: d.Description,
            floorplan: d.floorplan,
            from: d.from
        };
    };

    const areaStatRef = useRef(null);
    const listingsRef = useRef(null);

    const switchTab = () => {
        if (currTab === "stats") {

            // setCurrTab("listings");

            areaStatRef.current.style.animation = "slideout .1s normal forwards ease";
            setTimeout(() => {
                setCurrTab("listings");
            }, 250);
        } else {

            // setCurrTab("stats");

            listingsRef.current.style.animation = "slideout .1s normal forwards ease";
            setTimeout(() => {
                setCurrTab("stats");
            }, 250);
        }
    }

    // Stores the raw data from the csv file obtained through an API/Fetch call
    const [mapData, setMapData] = useState(null);
    const [currTab, setCurrTab] = useState("stats");

    // Loading data from the csv file
    useEffect(() => {
        d3.csv(listingData, rowConverter)
            .then((listingData) => {
                setMapData(listingData);
            })
    }, []);

    if (mapData) {
        {/* Only Render in the Area Stat once the data has been loaded NOTE: data only evaluates to true if it is not null*/ }
        return (
            <div className="App">
                <Map data={mapData} />
                {currTab === "stats" ?
                    <AreaStat data={mapData} innerRef={areaStatRef} /> :
                    <Listings data={mapData} innerRef={listingsRef} />
                }
                <SwapButton handleClick={switchTab} state={currTab} />
            </div>
        )
    } else {
        return (
            <div className="failed">
                Please wait while the data is loaded...
            </div>
        )
    }
}