import './App.css';
import React, { useState, useEffect } from "react"
import StartPage from "./components/StarPage"
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
  const [initLetters, setInitLetter] = useState()
  const [currGameScore, setCurrGameScore] = useState(0)
  const [highScores, setHighScores] = useState([])

  useEffect(() => {
    fetch('https://github.com/redbo/scrabble/blob/master/dictionary.txt')
    .then(response => response.json())
    .then(data => setWordDictionary(Set(data.split('\n'))))
  }, [])

  const isWordInDictionary = (word) => {
    if (wordDictionary.includes(word)) {
      return true
    }
    return false
  }

  const scoringFunction = (word) => {
    let effectiveLength = word.length
    word.forEach(letter => {
      if (letter === "q") {
        effectiveLength += 1
      }
    })
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
    possibleDice.map(dice => {
      const index = Math.floor(Math.random(0, dice.length))
      const letter = dice[index]
      if (letter === "q") {
        return "qu"
      }
      return letter
    })
    
    const retList = []
    const tempList = [...possibleDice]

    for (let i = 0; i < possibleDice.length; i++) {
      const index = Math.floor(Math.random(0, tempList.length))
      retList.push(tempList[index])
      tempList.splice(index, 1)
    }

    setInitLetter(retList)
  }

  //TODO
  const setTimer = () => {
    setTimeRemaining(duration)
    setLetters()
    setPageValue(1)
    const timer = setInterval(() => {
      if (duration <= 0) {
        setPageValue(2)
        clearInterval(timer)
      }
    }, 1000)
  }

  const displayPage = () => {
    if (pageValue === 0) {
      return <StartPage/>
    } else if (pageValue === 1) {
      return <GamePage/>
    } else {
      return <EndPage/>
    }
  }

  return (
    <div className="App">
      { displayPage() }
    </div>
  );
}

export default App;
