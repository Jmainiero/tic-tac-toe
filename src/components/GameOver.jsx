export default function GameOver({ winner, handleRematch }) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        <p>{winner}</p>
        <p>
            <button onClick={handleRematch}>Rematch!</button>
        </p>
    </div>
}