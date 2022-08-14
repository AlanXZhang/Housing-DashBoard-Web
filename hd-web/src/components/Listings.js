import React from "react";
import "./Listings.css";
import ListingCard from "./ListingCard";

export default function Listings(props) {
    // console.log(props.data);
    const cards = props.data
        .filter(d => (d.image.length > 0))
        .filter((d,i) => i < 10)
        .map(item => <ListingCard data={item} />);
    // console.log(cards)

    return (
        <div className='listing--cards' ref={props.innerRef}>
            <h2>Housing List</h2>
            <p>The list will be updated when map moves</p>
            {cards}
            
        </div>
    )
}