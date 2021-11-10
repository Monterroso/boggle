import React from "react"

const Tile = ({isClicked, isLatestClick, letterOfTile, onClick, isTouching}) => {
  const getColor = () => {
    if (isLatestClick) {
      return "green"
    } else if (isClicked) {
      return "blue"
    } else if (isTouching) {
      return "red"
    } else {
      return "purple"
    }
  }
  return <span onClick={onClick} style={{backgroundColor: getColor()}}>
    {letterOfTile}
  </span>
}

export default Tile