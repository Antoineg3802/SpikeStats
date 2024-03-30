import React from 'react'

interface DarkModeBtnProps{
    onClick: () => void;
}

export const DarkModeBtn = ({onClick} :DarkModeBtnProps) => {
  return (
    <button onClick={onClick}>DarkModeBtn</button>
  )
}

export default DarkModeBtn