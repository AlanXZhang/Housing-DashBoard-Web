import React, { useState, useEffect } from 'react';
import "./App.css";
import AreaStat from "./components/AreaStat";
import listingData from './assets/data/final_df.csv'; // This needs to be replaced by a HTTP request
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
        };
    };

    const switchTab = () => {
        setCurrTab(prevState => {
            console.log(currTab)
            return prevState === "stats" ? "listings" : "stats"
        })
    }

    // Stores the raw data from the csv file obtained through an API/Fetch call
    const [mapData, setMapData] = useState(null);
    // const [showStats, setShowStats] = useState(true);
    // const [showListings, setShowListings] = useState(false);
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
                    <AreaStat data={mapData} /> :
                    <Listings data={mapData} />
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