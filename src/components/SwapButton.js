import React, {useState, useEffect} from 'react';
import "./SwapButton.css"

export default function SwapButton(props) {

    return (
        <button className='swapButton' onClick={props.handleClick}>
            {props.state === "stats" ? "Search Housing in this Area" : "Show Stats"}
        </button>
    )
}
