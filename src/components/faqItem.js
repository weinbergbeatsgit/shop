import React, { useState } from 'react';
import expand from '../images/expand.png'
import collapse from '../images/collapse.png'

const FaqItem = props => {
    const [showAnswer, setShowAnswer] = useState(false);

    const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    }

    return (
        <div>
            <div className="question flex-row justify-center align-center" onClick={() => toggleAnswer(true)}>
                <p>{props.question} </p> <img src={showAnswer ? collapse : expand} alt="" className="expand-icon"/>
            </div>
            {showAnswer ? 
                ( <div className="answer">
                  {props.answer} 
              </div>) : (<div/>)
            }
        </div>
    )
}

export default FaqItem