import React from 'react';
import "./Map.css";

export default function Map() {
    return (
        <div className="Map">
            <iframe
                className="Gmap"
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                title="Google Maps"
                src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCnasDuC3M7MHKCLlxqXU3vyJnzKAnwBTw&center=32.88122548712897,-117.23743805383994&zoom=13">
            </iframe>
        </div>
    )
}