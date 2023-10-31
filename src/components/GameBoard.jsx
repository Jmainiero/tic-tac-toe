export default function GameBoard({onSelectSquare, board}) {
    return (<ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {
                    //Disable the button if playerSymbol is null. If there is a symbol then the button was already previously selected.
                    row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
    )
}