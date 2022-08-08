import React from "react";
import "./Listings.css";
import ListingCard from "./ListingCard";

export default function Listings(props) {
    return (
        <div className='listing--cards' ref={props.innerRef}>
            <h2>Housing List</h2>
            <p>The list will be updated when map moves</p>
            {console.log(`data passed down`)}
            <ListingCard data={props.data[0]}/>
            <ListingCard data={props.data[1]}/>
            <ListingCard data={props.data[2]}/>
            <ListingCard data={props.data[3]}/>
            <ListingCard data={props.data[4]}/>
            <ListingCard data={props.data[5]}/>
            <ListingCard data={props.data[6]}/>
            <ListingCard data={props.data[7]}/>
            <ListingCard data={props.data[8]}/>
            <ListingCard data={props.data[9]}/>
            <ListingCard data={props.data[10]}/>
        </div>
    )
}