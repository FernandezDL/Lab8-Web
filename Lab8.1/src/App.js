import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import Finalizado from './components/Finalizado'
import './index.css'

import angelica from "fotos/Angelica.png";
import Burr from "fotos/Burr.png";
import Eliza from "fotos/Eliza.png";
import Hamilton from "fotos/Hamilton.png";
import King from "fotos/King.png";
import Laffayette from "fotos/Laffayette.png";
import Maria from "fotos/Maria.png";
import Washington from "fotos/Washington.png";

const cardImages = [
    {"src": angelica,   matched: false},
    {"src": Burr,       matched: false},
    {"src": Eliza,      matched: false},
    {"src": Hamilton,   matched: false},
    {"src": King,       matched: false},
    {"src": Laffayette, matched: false},
    {"src": Maria,      matched: false},
    {"src": Washington, matched: false}
]

function App(){
    const[movimientos, setMovimientos]= useState(0)
    const[cards, setCards]= useState([])
    const[opcionUno, setOpcionUno]= useState(null)
    const[opcionDos, setOpcionDos]= useState(null)
    const[disabled, setDisabled]= useState(null)
    const[finalizado, setFinalizado]= useState(false)
    const[contador, setContador]= useState(0)

    const mezclar =() => {
        const cartasMezclar= [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))

        setCards(cartasMezclar)
        setMovimientos(0)
        setOpcionDos(null)
        setOpcionUno(null)
        setContador(0)
    }  

    const handleChoice = (card) => {
        /*console.log(card)*/
        opcionUno ? setOpcionDos(card) : setOpcionUno(card)
    }

    useEffect(() =>{
        if(opcionUno && opcionDos) {
            
            setDisabled(true)

            if (opcionUno.src === opcionDos.src) {
                console.log('Match')

                setCards(prevMov => {
                    return prevMov.map(card => {
                        if (card.src === opcionUno.src) {
                            return {...card, matched: true}
                        }

                        else{
                            return card
                        }
                    })
                })

                reiniciarMovs()
                setContador((prev) => prev + 1)
                console.log(contador)
            }

            else{
                console.log('Not match')
                setTimeout(() => reiniciarMovs(), 1300)
            }
        }

        const finished = cards.every((card) => card.matched === true);
        
        if(finished)
        {
            setFinalizado(true);

            console.log('finalizado')
        }
        else
        {
            setFinalizado(false);
        }
    }, [opcionUno, opcionDos, cards])

    /*console.log(cards)*/

    const reiniciarMovs =() => {
        setOpcionUno(null)
        setOpcionDos(null)
        setMovimientos(prevMov => prevMov + 1)
        setDisabled(false)
    }

    useEffect(() => {
        mezclar()
    }, [])

    return (
       /* <>
            {finalizado && <Finalizado/>}
*/
            <div>
                <h1>Hamil - memory</h1>
                
                <p>Movimientos: {movimientos}</p>

                {finalizado && <h2>¡Completaste el juego!</h2>}
            
                <div className="container">
                    {cards.map(card => (
                        <Card 
                            key={card.id} 
                            card={card}
                            handleChoice={handleChoice}
                            flipped={
                                card === opcionUno || 
                                card === opcionDos || 
                                card.matched
                            }
                            disabled={disabled}
                        /> 
                    ))}
                </div>

                <div className="bttnContainer">
                    <button on onClick={mezclar}>Reiniciar</button>
                </div>
            </div>   
       // </>   
    );
}


export default App;