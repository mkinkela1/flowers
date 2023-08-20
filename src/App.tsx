import React, {useState} from "react";
import './App.css';
import {useFlowerContext} from "./context/FlowerContext";
import Image from "./components/Image";

const App: React.FC = () => {
  const {flowers, currentFlower, next} = useFlowerContext()
  const [shouldShowAnswer, setShouldShowAnswer] = useState<boolean>(false)

  const showAnswer = () => setShouldShowAnswer(true)

  const goToNextFlower = () => {
    next()
    setShouldShowAnswer(false)
  }

  if (flowers.length > 0)
    return (
      <div className="App">
        <Image src={`assets/${currentFlower.image}`}/>
        {
          shouldShowAnswer &&
          <div className="veggie-data">
            <table>
              <tr>
                <td>Porodica:</td>
                <td>{currentFlower.familyName}</td>
              </tr>
              <tr>
                <td>Latinski naziv:</td>
                <td>{currentFlower.latinName}</td>
              </tr>
            </table>
          </div>
        }
        {
          !shouldShowAnswer ?
            <button className="btn" onClick={showAnswer}>Prikaži odgovor</button>
            :
            <button className="btn" onClick={goToNextFlower}>Dalje</button>
        }
      </div>
    );
  else
    return (<>Loading</>)
}

export default App;
