import React, { useState, useEffect } from "react"
import Tile from "./Tile"
import { isNil } from "lodash"

const GamePage = ({scoringFunction, initLetters, min, width, height, setScore}) => {
  const [submittedWords, setSubmittedWords] = useState({})
  //tuples in form of (x, y)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [selectedError, setSelectedError] = useState()

  const checkTileIn = (pool, tile) => {
    pool.reduce((prevVal, elem) => {
      if (elem[0] === tile[0] && elem[1] === tile[1]) {
        return true
      }
      return false || prevVal
    }, false)
  } 

  const checkTouching = (tile1, tile2) => {
    const xdiff = Math.abs(tile1[0] - tile2[0])
    const ydiff = Math.abs(tile1[1] - tile2[1])
    if (xdiff > 1 || ydiff > 1) {
      return false
    }
    return true
  }

  const getLetterAt = (x, y) => {
    return initLetters[(y * height) + x]
  }

  const getWordFromTiles = (tiles) => {
    return "".join(tiles.map(tile => getLetterAt(tile)))
  }

  const clickBehavior = (x, y) => {
    if (selectedTiles.length === 0) {
      setSelectedTiles(prev => [...prev, [x, y]])
    } else if (checkTileIn(selectedTiles, [x, y])) {
      //check if at end
      if (checkTileIn([selectedTiles[selectedTiles.length - 1]], [x, y])) {
        setSelectedTiles(prev => 
          prev.filter((val, index, arr) => index !== arr.length - 1)
        )
      } //else case is do nothing
    } else if (checkTouching(selectedTiles[selectedTiles.length - 1], [x, y])) {
      setSelectedTiles(prev => [...prev, [x, y]])
    }
  }

  const submitWord = () => {
    const submitWord = getWordFromTiles(selectedTiles)
    const score = scoringFunction(submitWord)
    setSubmittedWords(prev => ({...prev, [submitWord]: score}))
    setScore(prev => prev + score)
    setSelectedTiles([])
  }

  useEffect(() => {
    if (selectedTiles.length < min) {
      setSelectedError("Your word is invalid and too short")
    } else if (Object.keys(submittedWords).includes(getWordFromTiles(selectedTiles))) {
      setSelectedError("Your word is already in the list")
    } else {
      setSelectedError(undefined)
    }
    
  }, [selectedTiles])

  const getRow = (y) => {
    const retList = []
    for (let x = 0; x < width; x++) {
      retList.push(<Tile
        isClicked={checkTileIn(selectedTiles, [x, y])}
        isLatestClick={checkTileIn([selectedTiles[selectedTiles.length - 1]], [x, y])}
        letterOfTile={getLetterAt([x, y])}
        onClick={() => clickBehavior(x, y)}
      />)
    }
    return <div>{retList}</div>
  }

  const getTable = () => {
    const retTable = []
    for (let y = 0; y < height; y++) {
      retTable.push(getRow(y))
    }
    return <div>{retTable}</div>
  }


  return <div>
    {
      getTable()
    }
    <div>
      Current Word: {getWordFromTiles(selectedTiles)}
    </div>
    <div>
      Submitted Words: {
        Object.keys(submittedWords).map(word => {
          return <div>{word}: {submittedWords[word]}</div>
        })
      }
    </div>
    <div onClick={() => !isNil(selectedError) && submitWord()} disabled={!isNil(selectedError)}>Submit</div>
  </div>
}

export default GamePage