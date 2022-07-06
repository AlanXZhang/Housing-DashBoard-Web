import React, { useState, useEffect } from 'react';
import * as d3 from "d3";

export default function AreaStat(props) {

    // Create an event listener that will update the state when the zooms in or out of the map or drag the map.
    // Maybe create a removeEventListener function that will remove the event listener when the component is unmounted.

    // Renders 3 times, first time before any data is loaded, second time when data is loaded, third time when the map is zoomed in or out.
    function updateStats() {
        // Using IQR to measure the spread by removing outliers
        let areaMin = d3.quantile(subsetData, 0.25, d => d.price);
        let areaMax = d3.quantile(subsetData, 0.75, d => d.price);
        let areaAverage = d3.median(subsetData, d => d.price);
        let carMinCommuteTime = 0 //Function when I get the feature engineered dataset: d3.min(data, d => d.carCommuteTime);
        let carMaxCommuteTime = 0 //Function when I get the feature engineered dataset: d3.max(data, d => d.carCommuteTime);
        let transitMinCommuteTime = 0 //Function when I get the feature engineered dataset: d3.min(data, d => d.transitCommuteTime);
        let transitMaxCommuteTime = 0 //Function when I get the feature engineered dataset: d3.max(data, d => d.transitCommuteTime);
        let walkingMinCommuteTime = 0 //Function when I get the feature engineered dataset: d3.min(data, d => d.walkingCommuteTime);
        let walkingMaxCommuteTime = 0 //Function when I get the feature engineered dataset: d3.max(data, d => d.walkingCommuteTime);
        let bikingMinCommuteTime = 0 //Function when I get the feature engineered dataset: d3.min(data, d => d.bikingCommuteTime);
        let bikingMaxCommuteTime = 0 //Function when I get the feature engineered dataset: d3.max(data, d => d.bikingCommuteTime);
        setStats({
            areaMin: parseInt(areaMin),
            areaMax: parseInt(areaMax),
            areaAverage: parseInt(areaAverage),
            carMinCommuteTime: carMinCommuteTime,
            carMaxCommuteTime: carMaxCommuteTime,
            transitMinCommuteTime: transitMinCommuteTime,
            transitMaxCommuteTime: transitMaxCommuteTime,
            walkingMinCommuteTime: walkingMinCommuteTime,
            walkingMaxCommuteTime: walkingMaxCommuteTime,
            bikingMinCommuteTime: bikingMinCommuteTime,
            bikingMaxCommuteTime: bikingMaxCommuteTime,
        });
    }

    // Filters the data based on the viewable area of the map and updates the stats in the area
    const [stats, setStats] = useState(null);
    const [subsetData, setSubsetData] = useState(props.data)

    useEffect(() => {
        updateStats();
    }, []);

    // Need an event listener that changes the subset data and stat when the user moves the map or zooms in or out

    if (stats) { //Only render the Area Overview if the stats have been loaded to prevent unncessary renders
        return (
            <div className="area-stats">
                <h3 className='area--title'>Area Overview</h3>
                <div className='area--price'>
                    <h4> {`$${stats.areaMin}/month - $${stats.areaMax}/month`} </h4>
                    <h4> {`Average Rent price in map area: $${stats.areaAverage}`}</h4>
                </div>
                <div className='area--commute'>
                    <div className='car-commmute-time'>
                        {/* placeholder icon */}
                        <p> min to 16 min</p>
                    </div>
                    <div className='transit-commmute-time'>
                        {/* placeholder icon */}
                        <p>8 min to 16 min</p>
                    </div>
                    <div className='walking-commmute-time'>
                        {/* placeholder icon */}
                        <p>8 min to 16 min</p>
                    </div>
                    <div className='biking-commmute-time'>
                        {/* placeholder icon */}
                        <p>8 min to 16 min</p>
                    </div>
                </div>
                <div className='area--crime'></div>
                <div className='area--rent-estimate'></div>
            </div>
        )
    }
}