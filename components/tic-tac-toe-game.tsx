"use client"

import { useState, useEffect, useCallback } from "react"

type Player = "X" | "O" | null
type Board = Player[]
type GameState = "idle" | "playing" | "won" | "lost" | "draw"

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // anti-diagonal
]

const INITIAL_BOARD: Board = Array(9).fill(null)

export function TicTacToeGame({ onComplete, onSkip }: { onComplete?: () => void; onSkip?: () => void }) {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD)
  const [gameState, setGameState] = useState<GameState>("idle")
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [hackingText, setHackingText] = useState<string[]>([])
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ initializing game_matrix...",
    "$ loading opponent_ai...",
    "$ status: READY",
  ])

  const checkWinner = useCallback((currentBoard: Board): { winner: Player; line: number[] | null } => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo }
      }
    }
    return { winner: null, line: null }
  }, [])

  const addTerminalLine = useCallback((line: string) => {
    setTerminalLines((prev) => [...prev.slice(-6), line])
  }, [])

  const makeAIMove = useCallback(
    (currentBoard: Board) => {
      const emptySquares = currentBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null) as number[]

      if (emptySquares.length === 0) return

      // Simple AI: try to win, then block, then random
      let move: number | null = null

      // Try to win
      for (const square of emptySquares) {
        const testBoard = [...currentBoard]
        testBoard[square] = "O"
        if (checkWinner(testBoard).winner === "O") {
          move = square
          break
        }
      }

      // Try to block
      if (move === null) {
        for (const square of emptySquares) {
          const testBoard = [...currentBoard]
          testBoard[square] = "X"
          if (checkWinner(testBoard).winner === "X") {
            move = square
            break
          }
        }
      }

      // Take center if available
      if (move === null && currentBoard[4] === null) {
        move = 4
      }

      // Random move
      if (move === null) {
        move = emptySquares[Math.floor(Math.random() * emptySquares.length)]
      }

      setTimeout(() => {
        addTerminalLine(`$ ai.execute(cell_${move})`)
        setHackingText((prev) => [...prev, `> TARGETING CELL ${move}...`])

        setTimeout(() => {
          const newBoard = [...currentBoard]
          newBoard[move!] = "O"
          setBoard(newBoard)
          setHackingText((prev) => [...prev, `> BREACH SUCCESSFUL`])

          const { winner, line } = checkWinner(newBoard)
          if (winner === "O") {
            setGameState("lost")
            setWinningLine(line)
            addTerminalLine("$ status: SYSTEM_COMPROMISED")
          } else if (newBoard.every((cell) => cell !== null)) {
            setGameState("draw")
            addTerminalLine("$ status: DEADLOCK")
          } else {
            setIsPlayerTurn(true)
            addTerminalLine("$ awaiting_user_input...")
          }
        }, 400)
      }, 600)
    },
    [checkWinner, addTerminalLine],
  )

  const handleCellClick = (index: number) => {
    if (gameState !== "playing" || !isPlayerTurn || board[index]) return

    addTerminalLine(`$ user.execute(cell_${index})`)
    setHackingText((prev) => [...prev, `> DEPLOYING TO CELL ${index}...`])

    const newBoard = [...board]
    newBoard[index] = "X"
    setBoard(newBoard)

    const { winner, line } = checkWinner(newBoard)
    if (winner === "X") {
      setGameState("won")
      setWinningLine(line)
      addTerminalLine("$ status: ACCESS_GRANTED")
      if (onComplete) onComplete()
    } else if (newBoard.every((cell) => cell !== null)) {
      setGameState("draw")
      addTerminalLine("$ status: DEADLOCK")
    } else {
      setIsPlayerTurn(false)
      addTerminalLine("$ ai.analyzing...")
      makeAIMove(newBoard)
    }
  }

  const startGame = () => {
    setBoard(INITIAL_BOARD)
    setGameState("playing")
    setIsPlayerTurn(true)
    setWinningLine(null)
    setHackingText(["> SYSTEM INITIALIZED", "> AWAITING USER COMMAND..."])
    setTerminalLines([
      "$ initializing game_matrix...",
      "$ loading opponent_ai...",
      "$ status: ACTIVE",
      "$ awaiting_user_input...",
    ])
  }

  const resetGame = () => {
    startGame()
  }

  // Typing effect for hacking text
  useEffect(() => {
    if (hackingText.length > 5) {
      setHackingText((prev) => prev.slice(-5))
    }
  }, [hackingText])

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Game board */}
      <div className="relative bg-[#011221] rounded-lg p-3 lg:p-4 border border-[#0c1616]">
        {/* Corner dots */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-primary/30" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/30" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-primary/30" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-primary/30" />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-2 w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px]">
          {board.map((cell, index) => {
            const isWinning = winningLine?.includes(index)
            return (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={gameState !== "playing" || !isPlayerTurn || cell !== null}
                className={`
                  aspect-square rounded border-2 font-mono text-2xl md:text-4xl lg:text-5xl font-bold
                  transition-all duration-300 relative overflow-hidden
                  ${
                    isWinning
                      ? "border-primary bg-primary/20 shadow-[0_0_20px_rgba(67,217,173,0.5)]"
                      : "border-primary/30 bg-[#0a1628] hover:border-primary/60 hover:bg-[#0a1628]/80"
                  }
                  ${cell === "X" ? "text-primary" : cell === "O" ? "text-[#e94560]" : "text-transparent"}
                  disabled:cursor-default
                `}
              >
                {/* Grid coordinates overlay */}
                <span className="absolute top-1 left-1 text-[8px] md:text-[10px] text-primary/40 font-normal">
                  [{Math.floor(index / 3)},{index % 3}]
                </span>

                {cell && <span className={`${isWinning ? "animate-pulse" : ""}`}>{cell}</span>}

                {!cell && gameState === "playing" && isPlayerTurn && (
                  <span className="text-primary/20 hover:text-primary/40 transition-colors">_</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Game state overlay */}
        {gameState !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#011221]/90 rounded-lg backdrop-blur-sm">
            {gameState === "won" && (
              <div className="text-center">
                <p className="text-primary font-mono text-lg mb-1 animate-pulse">ACCESS GRANTED</p>
                <p className="text-primary/60 font-mono text-xs mb-4">// firewall bypassed</p>
              </div>
            )}
            {gameState === "lost" && (
              <div className="text-center">
                <p className="text-[#e94560] font-mono text-lg mb-1">SYSTEM COMPROMISED</p>
                <p className="text-[#e94560]/60 font-mono text-xs mb-4">// intrusion detected</p>
              </div>
            )}
            {gameState === "draw" && (
              <div className="text-center">
                <p className="text-accent font-mono text-lg mb-1">DEADLOCK</p>
                <p className="text-accent/60 font-mono text-xs mb-4">// stalemate reached</p>
              </div>
            )}
            <button
              onClick={gameState === "idle" ? startGame : resetGame}
              className="px-4 py-2 bg-accent text-accent-foreground rounded text-sm font-mono hover:bg-accent/90 transition-colors"
            >
              {gameState === "idle" ? "start-hack" : "retry-hack"}
            </button>
          </div>
        )}
      </div>

      {/* Terminal panel */}
      <div className="flex flex-col gap-4 min-w-[180px]">
        {/* Terminal output */}
        <div className="bg-[#010c15] rounded p-3 border border-primary/20 font-mono text-[10px] md:text-xs">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-primary/20">
            <div className="w-2 h-2 rounded-full bg-[#e94560]" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground ml-2">terminal</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-hidden">
            {terminalLines.map((line, i) => (
              <p key={i} className={`${line.includes("status") ? "text-primary" : "text-muted-foreground"}`}>
                {line}
              </p>
            ))}
            <span className="text-primary animate-pulse">_</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-muted-foreground text-xs font-mono hidden sm:block">
          <p>{"// defeat the AI"}</p>
          <p>{"// to gain access"}</p>
        </div>

        {/* Status indicator */}
        <div className="text-xs font-mono">
          <p className="text-muted-foreground">{"// status"}</p>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                gameState === "playing" && isPlayerTurn
                  ? "bg-primary animate-pulse"
                  : gameState === "playing"
                    ? "bg-[#e94560] animate-pulse"
                    : "bg-muted-foreground"
              }`}
            />
            <span
              className={`${
                gameState === "playing" && isPlayerTurn
                  ? "text-primary"
                  : gameState === "playing"
                    ? "text-[#e94560]"
                    : "text-muted-foreground"
              }`}
            >
              {gameState === "idle"
                ? "STANDBY"
                : gameState === "playing" && isPlayerTurn
                  ? "YOUR TURN"
                  : gameState === "playing"
                    ? "AI THINKING..."
                    : gameState === "won"
                      ? "VICTORY"
                      : gameState === "lost"
                        ? "DEFEATED"
                        : "STALEMATE"}
            </span>
          </div>
        </div>

        {/* Hacking log */}
        <div className="text-[10px] font-mono text-primary/60 space-y-0.5 hidden md:block max-h-20 overflow-hidden">
          {hackingText.slice(-4).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        <button
          onClick={onSkip}
          className="mt-auto self-end px-4 py-2 bg-[#010c15] text-foreground text-sm font-mono rounded hover:bg-muted transition-colors border border-primary/20"
        >
          skip
        </button>
      </div>
    </div>
  )
}
