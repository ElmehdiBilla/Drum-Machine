import { useEffect, useRef, useState } from "react"
import DrumPad from "./DrumPad"
import {heaterKit} from '../heaterKit'
import {smoothPianoKit} from '../smoothPianoKit'

function PadBank({kitSwitch, vol, changeDisplay}) {


    const iskitSwitch = kitSwitch;
    const volume = vol;
    const drumKit = !iskitSwitch ? heaterKit : smoothPianoKit;
    const elementsRef = useRef([]);

    const handleDrumClick = (el) => {
        el.classList.add('drum-clicked')
        const audio = el.querySelector('audio');
        audio.volume= volume / 100;
        audio.play();
        changeDisplay(el.id.replace(/-/g," "));
        setTimeout(() => {
            el.classList.remove('drum-clicked');
        }, 200);
    }

    useEffect(() => {

        const handleKeyDown = (event) => {
            elementsRef.current.forEach(el => {
                if(el.querySelector('audio').id === event.key.toUpperCase()){
                    handleDrumClick(el)
                }
            })
        };
        window.addEventListener('keydown' , handleKeyDown);
        
        elementsRef.current.forEach((el) => {
            if(el){
                el.addEventListener('click', () => {handleDrumClick(el)})
            }
        })

        return () => {
            window.removeEventListener('keydown' , handleKeyDown);
            elementsRef.current.forEach((el) => {
                if(el){
                    el.removeEventListener('click', () => {handleDrumClick(el)})
                }
            })
        }
    },[iskitSwitch , volume])

    return (
        <div className="pad-bank">
            {
            drumKit.map((el,i) => {
                return (
                    <DrumPad 
                        key={el.id}
                        ref={(el) => (elementsRef.current[i] = el)}
                        id={el.id} 
                        className='drum-pad'
                        audioSrc={el.audioSrc ? el.audioSrc : null}
                        audioID={el.audioID}
                        audioClassName='clip'>
                        {
                            el.audioID
                        }
                    </DrumPad>
                )
            })
            }
        </div>
    )
}

export default PadBank
