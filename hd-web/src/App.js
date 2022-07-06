import React, {useState, useEffect} from 'react';
import "./App.css";
import AreaStat from "./components/AreaStat";
import listingData from './assets/data/test_data.csv';
import * as d3 from "d3";

export default function App() {

    // Parser function for the csv file
    function rowConverter(d) {
        return {
            ...d,
            area: +d.area,
            baths: +d.baths,
            beds: +d.beds,
            id: +d.id,
            latLong: JSON.parse(d.latLong.replace(/'/g, '"')),
            price: +d.unformattedPrice,
        };
    };

    // Stores the raw data from the csv file obtained through an API/Fetch call
    const [data, setData] = useState(null);

    // Loading data from the csv file
    useEffect(() => {
        d3.csv(listingData, rowConverter)
            .then((listingData) => {
                setData(listingData);
            })
    }, []);

    return (
        <div className="App">
            {/* Only Render in the Area Stat once the data has been loaded NOTE: data only evaluates to true if it is not null*/}
            {data && <AreaStat data={data}/>}
        </div>
    )
}