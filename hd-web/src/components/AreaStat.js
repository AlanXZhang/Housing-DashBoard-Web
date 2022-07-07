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
        let areaMedian = d3.median(subsetData, d => d.price);
        let carMinCommuteTime = 1 // d3.quantile(subsetData, 0.25, d => d.carCommuteTime);
        let carMaxCommuteTime = 2 // d3.quantile(subsetData, 0.75, d => d.carCommuteTime);
        let transitMinCommuteTime = 3 // d3.quantile(subsetData, 0.25, d => d.transitCommuteTime);
        let transitMaxCommuteTime = 4 // d3.quantile(subsetData, 0.75, d => d.transitCommuteTime);
        let walkingMinCommuteTime = 5 // d3.quantile(subsetData, 0.25, d => d.walkingCommuteTime);
        let walkingMaxCommuteTime = 16 // d3.quantile(subsetData, 0.75, d => d.walkingCommuteTime);
        let bikingMinCommuteTime = 6 // d3.quantile(subsetData, 0.25, d => d.bikingCommuteTime);
        let bikingMaxCommuteTime = 7 // d3.quantile(subsetData, 0.75, d => d.bikingCommuteTime);
        setStats({
            areaMin: parseInt(areaMin),
            areaMax: parseInt(areaMax),
            areaAverage: parseInt(areaMedian),
            carMinCommuteTime: parseInt(carMinCommuteTime),
            carMaxCommuteTime: parseInt(carMaxCommuteTime),
            transitMinCommuteTime: parseInt(transitMinCommuteTime),
            transitMaxCommuteTime: parseInt(transitMaxCommuteTime),
            walkingMinCommuteTime: parseInt(walkingMinCommuteTime),
            walkingMaxCommuteTime: parseInt(walkingMaxCommuteTime),
            bikingMinCommuteTime: parseInt(bikingMinCommuteTime),
            bikingMaxCommuteTime: parseInt(bikingMaxCommuteTime),
        });
    }

    // Filters the data based on the viewable area of the map and updates the stats in the area
    const [stats, setStats] = useState(null);
    const [subsetData, setSubsetData] = useState(props.data)

    // Update stats on launch and whenever the subsetData is updated
    useEffect(() => {
        updateStats();
    }, [subsetData]);

    console.log(subsetData)

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
                        <span className="iconify" data-icon="bx:car"></span>
                        <p>{stats.carMinCommuteTime} min to {stats.carMaxCommuteTime} min</p>
                    </div>
                    <div className='transit-commmute-time'>
                        <span className="iconify" data-icon="bx:train"></span>
                        <p>{stats.transitMinCommuteTime} min to {stats.transitMaxCommuteTime} min</p>
                    </div>
                    <div className='walking-commmute-time'>
                    <span className="iconify" data-icon="bx:walk"></span>
                        <p>{stats.walkingMinCommuteTime} min to {stats.walkingMaxCommuteTime} min</p>
                    </div>
                    <div className='biking-commmute-time'>
                        <span className="iconify" data-icon="ic:baseline-directions-bike"></span>
                        <p>{stats.bikingMinCommuteTime} min to {stats.bikingMaxCommuteTime} min</p>
                    </div>
                </div>
                <div className='area--crime'>
                    {/* Placeholder Rating Icon e.g. A, B, C */}
                </div>
                {/* May not implement rent estimate on MVP */}
                {/* <div className='area--rent-estimate'></div>  */}
            </div>
        )
    }
}