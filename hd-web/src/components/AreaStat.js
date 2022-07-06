import React, {useState} from 'react'

export default function AreaStat() {

    // Create an event listener that will update the state when the zooms in or out of the map or drag the map.
    // Maybe create a removeEventListener function that will remove the event listener when the component is unmounted.

    return (
        <div className="area-stats">
            <h3 className='area--title'>Area Overview</h3>
            <div className='area--price'>
                <h4> area range </h4>
                <h4> Average Rent price in map area: $2000</h4>
            </div>
            <div className='area--commute'>
                <div className='car-commmute-time'>
                    {/* placeholder icon */}
                    <p>8 min to 16 min</p>
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