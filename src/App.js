import './App.css';
import React, { useState, useEffect } from "react"
import StartPage from "./components/StartPage"
import GamePage from "./components/GamePage"
import EndPage from "./components/EndPage"


const width = 5
const height = 5
const minWordLength = 3
const misWordPenalty = -2
const duration = 180
const possibleDice = [
  "aaafrs",
  "aaeeee",
  "aafirs",
  "adennn",
  "aeeeem",
  "aeegmu",
  "aegmnn",
  "afirsy",
  "bjkqxz",
  "ccenst",
  "ceiilt",
  "ceilpt",
  "ceipst",
  "ddhnot",
  "dhhlor",
  "dhlnor",
  "dhlnor",
  "eiiitt",
  "emottt",
  "ensssu",
  "fiprsy",
  "gorrvw",
  "iprrry",
  "nootuw",
  "ooottu"
]

function App() {
  const [wordDictionary, setWordDictionary] = useState()
  //0 is home, 1 is board, 2 is end
  const [pageValue, setPageValue] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const [initLetters, setInitLetters] = useState()
  const [currGameScore, setCurrGameScore] = useState(0)
  const [highScores, setHighScores] = useState({})

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt')
    .then(response => {
      return response.text()
    })
    .then(data => {
      setWordDictionary(new Set(data.split('\n').map(elem => elem.toLocaleLowerCase())))
    })
  }, [])

  const isWordInDictionary = (word) => {
    if (wordDictionary.has(word)) {
      return true
    }
    return false
  }

  const scoringFunction = (word) => {
    let effectiveLength = word.length
    for (let i = 0; i < word.length; i++) {
      if (word[i] === "q") {
        effectiveLength += 1
      }
    }
    if (isWordInDictionary(word)) {
      if (effectiveLength < minWordLength) {
        throw Error("Word is less than word length")
      } else if (effectiveLength < 5) {
        return 1
      } else if (effectiveLength === 5) {
        return 2
      } else if (effectiveLength === 6) {
        return 3
      } else if (effectiveLength === 7) {
        return 5
      } else {
        return 11
      }
    } else {
      return misWordPenalty
    }
  }

  const setLetters = () => {
    const letters = possibleDice.map(dice => {
      const index = Math.floor(Math.random() * dice.length)
      const letter = dice[index]
      if (letter === "q") {
        return "qu"
      }
      return letter
    })
    
    const retList = []
    const tempList = [...letters]

    for (let i = 0; i < possibleDice.length; i++) {
      const index = Math.floor(Math.random(0, tempList.length))
      retList.push(tempList[index])
      tempList.splice(index, 1)
    }

    setInitLetters(retList)
  }

  const setTimer = () => {
    setTimeRemaining(duration)
    setLetters()
    setPageValue(1)
    const timer = setInterval(() => {
      if (duration <= 0) {
        setPageValue(2)
        clearInterval(timer)
      }
      setTimeRemaining( prev => prev - 1)
    }, 1000)
  }

  const displayPage = () => {
    if (pageValue === 0) {
      return <StartPage
        highScores={highScores}
        startFunction={setTimer}
      />
    } else if (pageValue === 1) {
      return <GamePage
        scoringFunction={scoringFunction}
        initLetters={initLetters}
        setScore={setCurrGameScore}
        width={width}
        height={height}
        min={minWordLength}
        timeRemaining={timeRemaining}
      />
    } else {
      return <EndPage
        setScore={name => {
          setHighScores(prev => {
            if (Object.keys(prev).includes(currGameScore)) {
              const newObj = {...prev}
              newObj[currGameScore].push(name)
              return newObj
            } else {
              return {...prev, [currGameScore]: [name]}
            }
          })
          setPageValue(0)
        }}
      />
    }
  }

  return (
    <div className="App">
      { displayPage() }
    </div>
  );
}

export default App;
