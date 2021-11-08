import React from "react"

const StartPage = ({highScores, startFunction}) => {
  return <div>
    <div>
      {
        Object.keys(highScores).sort().map(score => {
          <div>
            {score}: {highScores.map(name => 
              <div>
                {name}
              </div>
            )}
          </div>
        })
      }
    </div>
    <div onClick={startFunction}>Start!</div>
  </div>
}

export default StartPage