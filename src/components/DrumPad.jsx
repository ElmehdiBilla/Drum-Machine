import { forwardRef } from "react"

function DrumPad({id, className, audioID, audioClassName, audioSrc, children},ref) {
    return (
        <div ref={ref} id={id} className={className}>
            <audio id={audioID} className={audioClassName} src={audioSrc}></audio>
            {
                children
            }
        </div>
        
    )
}

export default forwardRef(DrumPad)