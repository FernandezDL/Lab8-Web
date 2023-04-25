import './Card.css'
import React from 'react';

import cover from "/fotos/Poster.png";

export default function Card({card, handleChoice, flipped, disabled}){
    
    const handleClick= () =>{
        if(!disabled)
        {
            handleChoice(card) 
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}> 
                <img className="front" 
                    src={card.src} 
                    alt="cardFront"/>
                <img className="back" 
                    src= {cover}
                    onClick={handleClick} 
                    alt="cardBack"
                />
            </div>
        </div>
    )
}

