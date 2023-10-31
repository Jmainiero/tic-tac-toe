import { useState } from 'react'
export default function Player({ initialName, symbol, isActive, handlePlayerNameChange }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const editButtonHandler = () => {
        setIsEditing(wasEditing => !wasEditing)

        if (isEditing) {
            handlePlayerNameChange(symbol, playerName)
        }
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }

    return <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {
                isEditing == false ? <span className="player-name">{playerName}</span> : <input type="text" required value={playerName} onChange={handleChange} />
            }
            <span className="player-symbol">{symbol}</span>

        </span>
        <button onClick={editButtonHandler}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}