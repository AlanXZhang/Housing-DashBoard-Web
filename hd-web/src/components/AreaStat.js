import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import "./AreaStat.css";
// May want to port each component of the Area stat into its own cards for scalability
export default function AreaStat(props) {

    // Create an event listener that will update the state when the zooms in or out of the map or drag the map.
    // Maybe create a removeEventListener function that will remove the event listener when the component is unmounted.

    // Renders 3 times, first time before any data is loaded, second time when data is loaded, third time when the map is zoomed in or out.
    function updateStats() {
        // Using IQR to measure the spread by removing outliers
        let areaMin = d3.quantile(props.data, 0.25, d => d.price);
        let areaMax = d3.quantile(props.data, 0.75, d => d.price);
        let areaMedian = d3.median(props.data, d => d.price);
        let carMinCommuteTime = 8 // d3.quantile(props.data, 0.25, d => d.carCommuteTime);
        let carMaxCommuteTime = 16 // d3.quantile(props.data, 0.75, d => d.carCommuteTime);
        let transitMinCommuteTime = 24 // d3.quantile(props.data, 0.25, d => d.transitCommuteTime);
        let transitMaxCommuteTime = 48 // d3.quantile(props.data, 0.75, d => d.transitCommuteTime);
        let walkingMinCommuteTime = 62 // d3.quantile(props.data, 0.25, d => d.walkingCommuteTime);
        let walkingMaxCommuteTime = 168 // d3.quantile(props.data, 0.75, d => d.walkingCommuteTime);
        let bikingMinCommuteTime = 22 // d3.quantile(props.data, 0.25, d => d.bikingCommuteTime);
        let bikingMaxCommuteTime = 56 // d3.quantile(props.data, 0.75, d => d.bikingCommuteTime);
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

    function convertMinToTime(min) {
        let hour = Math.floor(min / 60);
        let minute = min % 60;
        let res = hour ? `${hour} hr ${minute} min` : `${minute} min`;
        return res;
    }

    // Filters the data based on the viewable area of the map and updates the stats in the area
    const [stats, setStats] = useState(null);

    // Update stats on launch and whenever the subsetData is updated
    useEffect(() => {
        updateStats();
    }, [props.data]);

    // Need an event listener that changes the subset data and stat when the user moves the map or zooms in or out

    if (stats) { //Only render the Area Overview if the stats have been loaded to prevent unncessary renders
        return (
            <div className="area-stats">
                <h2 className='area--overview'>Area Overview</h2>
                <h3 className='area--title'>Price</h3>
                <div className='area--price'>
                    <h4 className='area--price-summary'> <span className="area--low bold">${stats.areaMin}</span>/month - <span className="area--high bold">${stats.areaMax}</span>/month</h4>
                    <h4 className='area--price-summary-text'> Average rent price in map area: <span className="bold">${stats.areaAverage}</span></h4>
                </div>

                <h3 className='area--title'>Commute Time</h3>
                <div className='area--commute'>
                    <div className='car-commmute-time flex'>
                        <span className="iconify" data-icon="bx:car"></span>
                        <p>{convertMinToTime(stats.carMinCommuteTime)} to {convertMinToTime(stats.carMaxCommuteTime)}</p>
                    </div>
                    <div className='transit-commmute-time flex'>
                        <span className="iconify" data-icon="bx:train"></span>
                        <p>{convertMinToTime(stats.transitMinCommuteTime)} to {convertMinToTime(stats.transitMaxCommuteTime)}</p>
                    </div>
                    <div className='walking-commmute-time flex'>
                    <span className="iconify" data-icon="bx:walk"></span>
                        <p>{convertMinToTime(stats.walkingMinCommuteTime)} to {convertMinToTime(stats.walkingMaxCommuteTime)}</p>
                    </div>
                    <div className='biking-commmute-time flex'>
                        <span className="iconify" data-icon="ic:baseline-directions-bike"></span>
                        <p>{convertMinToTime(stats.bikingMinCommuteTime)} to {convertMinToTime(stats.bikingMaxCommuteTime)}</p>
                    </div>
                </div>
                <h3 className='area--title'>Crime rate</h3>
                <div className='area--crime flex'>
                    <p className="area--rating">A</p>
                    <p className="area--rating-description">(Safer than <span className="bold">70%</span> of US cities)</p>
                    {/* Placeholder Rating Icon e.g. A, B, C */}
                </div>
                <h3 className="area--title">Future rent estimate</h3>
                {/* May not implement rent estimate on MVP */}
                {/* <div className='area--rent-estimate'></div>  */}
            </div>
        )
    }
}