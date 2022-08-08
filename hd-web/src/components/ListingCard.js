import React from 'react';
import './ListingCard.css';

export default function LisitngCard(props) {
    return (
        <div className='listing--card'>
            {/* {console.log(props.data)} */}
            <div className='listing--card--image'>
                <img src={props.data.image} alt={props.data.address} />
            </div>
            <div className='listing--card--line1'>
                <h2 className="listing--card--price">
                    ${props.data.price}
                    <div className="subscript">
                        /month
                    </div>
                </h2>
                <p>
                    {props.data.num_beds} 
                    {props.data.num_beds <= 1 ? "bd" : "bds"}, 
                    {` ${props.data.num_baths}`} 
                    {props.data.num_baths <= 1 ? "bath" : "baths"}
                </p>
            </div>
            <p>{props.data.full_address ? props.data.full_address : props.data.full_address.Address }</p>
        </div>
    )
}