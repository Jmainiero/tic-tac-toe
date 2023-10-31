import { useState } from 'react'

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations'

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
//Helper function to allow to determine current player without managing separate state
//We need to derive the activePlayer from both the current state (we need to know who is the active player, but we don't need to rerender the UI each time since gameTurns state will do that), and previous state -- As seen in the app function
const deriveActivePlayer = gameTurns => {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

const deriveWinner = (gameBoard, players) => {
  let winner = null

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

const deriveGameBoard = (gameTurns) => {
  //gameBoard should initialize the original board
  //Create a new deep copy so that we don't override the initial board in memory
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  //If turns is an empty array, this code won't execute
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }
  return gameBoard
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)
  //A game can have a maximum of 9 turns, so if we don't have a winner in 9 turns, it'll be a draw.
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updateTurns = [{
        square: { row: rowIndex, col: colIndex }, player: currentPlayer
      }, ...prevTurns] //Avoid mutating the original state, make a copy and modify the copy
      return updateTurns
    })
  }

  //gameTurns is centralized state for the entire application -- Reset it back to an empty array and the game will reset
  const handleRematch = () => {
    setGameTurns([])
  }

  //Use the previous state to update the playerName.
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevState => {
      return {
        ...prevState,
        [symbol]: newName
      }
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} handlePlayerNameChange={handlePlayerNameChange} />
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} handlePlayerNameChange={handlePlayerNameChange} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner ? `${winner} won!` : 'It\'s a draw!'} handleRematch={handleRematch} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
