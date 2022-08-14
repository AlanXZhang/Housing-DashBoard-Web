import React from 'react';
import './ListingCard.css';
import coverPhoto from "../assets/coverPhoto.png";

export default function LisitngCard(props) {
    const httpRegex = /(https?:\/\/[^\s]+)/g;
    let images = props.data.image.match(httpRegex);
    let cover_photo = images[0];

    return (
        <div className='listing--card'>
            {/* {console.log(props.data)} */}
            <div className='listing--card--image'>
                <img src={coverPhoto} alt={props.data.address} width={250} />
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
            <p>{props.data.full_address.length > 0 ? props.data.full_address : props.data.zAddress }</p>
        </div>
    )
}