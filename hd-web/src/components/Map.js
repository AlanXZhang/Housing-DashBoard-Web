import React, { useState, useEffect } from 'react';
import "./Map.css";
import GoogleMapReact from 'google-map-react';
import * as d3 from 'd3';

export default function Map(props) {
    const [mapCenter, setMapCenter] = useState({ lat: 32.86867512568862, lng: -117.21368983643102 });
    const [mapZoom, setMapZoom] = useState(14);
    const [heatmapData, setHeatmapData] = React.useState({});
    const [heatmap, toggleHeatmap] = useState(false);

    // Use square root transformation of the price variable to deal with right skewed data 
    useEffect(() => {
        const median_price = d3.median(props.data, d => d.price);
        let logScale = d3.scaleLog()
            .domain([1e-6, d3.max(props.data, d=>d.price)])
            .range([1, 100]);

        const positionArr = props.data.map(d => ({
            lat: d.lat,
            lng: d.lng,
            weight: d.price <= 0 ? Math.sqrt(median_price) : Math.sqrt(d.price),
            // weight: logScale(d.price+1),
            price: d.price,
        })
        );
        const tempHeatmapData = {
            positions: positionArr,
            options: {
                radius: 35,
                opacity: 0.75,
                dissipating: true,
                // gradient: ,
                // maxIntensity: , 
            }
        };
        setHeatmapData(tempHeatmapData);
    }, [props.data]);

    console.log(heatmapData)

    // Change the input data when we toggle the heatmap

    return (
        <div className="Map">
            {/* <button onClick={() => toggleHeatmap(!heatmap)}>Toggle Heatmap</button> */}
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyCnasDuC3M7MHKCLlxqXU3vyJnzKAnwBTw",
                    libraries:["visualization"]
                }}
                defaultCenter={mapCenter}
                defaultZoom={mapZoom}
                heatmap={heatmapData}
            >
            </GoogleMapReact>
        </div>
    )
}