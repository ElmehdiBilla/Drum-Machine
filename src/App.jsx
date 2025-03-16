import { useState } from "react"
import PadBank from "./components/PadBank"

function App() {
  const [volume, setVolume] = useState(50);
  const [kitSwitch, setKitSwitch] = useState(false);
  const [display, setDisplay] = useState('');

  const handleChange = (e) => {
    setVolume(e.target.value);
  }
  const handleCheck = () => {
    setKitSwitch(prevS => !prevS);
  }
  const changeDisplay = (text) => {
    setDisplay(text)
  }

  return (
    <div id="drum-machine">
        <PadBank kitSwitch={kitSwitch} vol={volume} changeDisplay={changeDisplay}/>
        <div id="controls">
          <div id="volume">
            <label>Vol: {volume}</label>
            <input type="range" min='1' max='100' value={volume} onChange={handleChange}/>
          </div>
          <div id="kit-switch">
            <label>{!kitSwitch ? 'Heater Kit' : 'Smooth Piano Kit'}</label>
            <label className="switch">
              <input type="checkbox" checked={kitSwitch} onChange={handleCheck}/>
            </label>
          </div>
          <div id="display">{display}</div>
        </div>
    </div>
  )
}

export default App
