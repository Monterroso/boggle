import React from "react"

const Tile = ({isClicked, isLatestClick, letterOfTile, onClick}) => {
  const getColor = () => {
    if (isLatestClick) {
      return "green"
    } else if (isClicked) {
      return "blue"
    } else {
      return "white"
    }
  }
  return <div onClick={onClick} style={{backgroundColor: getColor()}}>
    {letterOfTile}
  </div>
}

export default Tile