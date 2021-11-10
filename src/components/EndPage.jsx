import React, { useState } from "react"

const EndPage = ({setName}) => {
  const [enteredName, setEnteredName] = useState("")
  return <div>
    <div>Enter your name</div>
    <input value={enteredName} onChange={e => setEnteredName(e.target.value)}/>
    <div onClick={() => setName(enteredName)}>Submit</div>
  </div>
}

export default EndPage