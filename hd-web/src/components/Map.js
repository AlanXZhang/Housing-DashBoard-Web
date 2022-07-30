import React, { useState, useEffect } from 'react';
import "./Map.css";
import GoogleMapReact from 'google-map-react';

export default function Map(props) {
    const [mapCenter, setMapCenter] = useState({ lat: 32.86867512568862, lng: -117.21368983643102 });
    const [mapZoom, setMapZoom] = useState(14);
    const [heatmapData, setHeatmapData] = React.useState({});
    useEffect(() => {
        const positionArr = props.data.map(d => ({ 
            lat: d.lat,
            lng: d.lng,
            weight: d.price }));
        const tempHeatmapData = {
            positions: positionArr,
            options: {
                radius: 15,
                opacity: 0.75,
                dissipating: true,
                // gradient: ,
                // maxIntensity: , 
            }
        };
        setHeatmapData(tempHeatmapData);
    }, [props.data]);
    
    console.log(heatmapData)

    return (
        <div className="Map">
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: "AIzaSyCnasDuC3M7MHKCLlxqXU3vyJnzKAnwBTw",
                    libraries: ['visualization'] 
                }}
                defaultCenter={mapCenter}
                defaultZoom={mapZoom}
                heatmap={heatmapData}
            >
            </GoogleMapReact>
        </div>
    )
}