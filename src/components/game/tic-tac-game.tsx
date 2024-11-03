// import React, { useState } from 'react';
// import { Container, Grid, Card, CardContent, CardHeader, Typography, Button, Box } from '@mui/material';

// type GameStatus = 'playing' | 'won' | 'draw';
// type CellValue = 'X' | 'O' | null;

// interface GameState {
//   board: CellValue[];
//   currentPlayer: 'X' | 'O';
//   status: GameStatus;
//   winner: CellValue;
// }

// const TicTacToe: React.FC = () => {
//   const [gameState, setGameState] = useState<GameState>({
//     board: Array(9).fill(null),
//     currentPlayer: 'X',
//     status: 'playing',
//     winner: null,
//   });

//   const [stats, setStats] = useState({
//     xWins: 0,
//     oWins: 0,
//     draws: 0,
//   });

//   const winningCombos = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
//   ];

//   const checkWinner = (board: CellValue[]): CellValue => {
//     for (const combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         return board[a];
//       }
//     }
//     return null;
//   };

//   const checkDraw = (board: CellValue[]): boolean => {
//     return board.every(cell => cell !== null);
//   };

//   const handleCellClick = (index: number) => {
//     if (gameState.board[index] || gameState.status !== 'playing') return;

//     const newBoard = [...gameState.board];
//     newBoard[index] = gameState.currentPlayer;

//     const winner = checkWinner(newBoard);
//     const isDraw = !winner && checkDraw(newBoard);

//     let newStatus: GameStatus = 'playing';
//     if (winner) {
//       newStatus = 'won';
//       setStats(prev => ({
//         ...prev,
//         [winner === 'X' ? 'xWins' : 'oWins']: prev[winner === 'X' ? 'xWins' : 'oWins'] + 1,
//       }));
//     } else if (isDraw) {
//       newStatus = 'draw';
//       setStats(prev => ({
//         ...prev,
//         draws: prev.draws + 1,
//       }));
//     }

//     setGameState({
//       board: newBoard,
//       currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
//       status: newStatus,
//       winner: winner,
//     });
//   };

//   const resetGame = () => {
//     setGameState({
//       board: Array(9).fill(null),
//       currentPlayer: 'X',
//       status: 'playing',
//       winner: null,
//     });
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Card>
//         <CardHeader title="Tic Tac Toe Game" />
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Current Player: {gameState.currentPlayer}
//           </Typography>
//           <Grid container spacing={2}>
//             {gameState.board.map((cell, index) => (
//               <Grid item xs={4} key={index}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   sx={{ height: 100 }}
//                   onClick={() => handleCellClick(index)}
//                   disabled={cell !== null || gameState.status !== 'playing'}
//                 >
//                   <Typography variant="h4">{cell}</Typography>
//                 </Button>
//               </Grid>
//             ))}
//           </Grid>
//           <Box mt={4}>
//             <Button variant="contained" color="primary" onClick={resetGame}>
//               New Game
//             </Button>
//           </Box>
//           <Box mt={4}>
//             <Typography variant="h6">X Wins: {stats.xWins}</Typography>
//             <Typography variant="h6">Draws: {stats.draws}</Typography>
//             <Typography variant="h6">O Wins: {stats.oWins}</Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default TicTacToe;

import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

type GameStatus = "playing" | "won" | "draw";
type CellValue = "X" | "O" | null;

interface GameState {
  board: CellValue[];
  currentPlayer: "X" | "O";
  status: GameStatus;
  winner: CellValue;
}

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: "X",
    status: "playing",
    winner: null,
  });

  const [stats, setStats] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0,
  });

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board: CellValue[]): CellValue => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board: CellValue[]): boolean => {
    return board.every((cell) => cell !== null);
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.status !== "playing") return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);

    let newStatus: GameStatus = "playing";
    if (winner) {
      newStatus = "won";
      setStats((prev) => ({
        ...prev,
        [winner === "X" ? "xWins" : "oWins"]:
          prev[winner === "X" ? "xWins" : "oWins"] + 1,
      }));
    } else if (isDraw) {
      newStatus = "draw";
      setStats((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
      status: newStatus,
      winner: winner,
    });
  };

  const resetScores = () => {
    setStats({
      xWins: 0,
      oWins: 0,
      draws: 0,
    });
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      status: "playing",
      winner: null,
    });
    resetScores();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 1 }}>
      <Card>
        {/* <CardHeader title="" /> */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Player: {gameState.currentPlayer}
          </Typography>
          <Box mt={3} py={1}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ bgcolor: "lightblue", p: 2, borderRadius: 1 }}
                >
                  X Wins: {stats.xWins}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ bgcolor: "lightgreen", p: 2, borderRadius: 1 }}
                >
                  Draws: {stats.draws}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ bgcolor: "lightcoral", p: 2, borderRadius: 1 }}
                >
                  O Wins: {stats.oWins}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2}>
            {gameState.board.map((cell, index) => (
              <Grid item xs={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ height: 100 }}
                    onClick={() => handleCellClick(index)}
                    disabled={cell !== null || gameState.status !== "playing"}
                  >
                    <Typography variant="h4">{cell}</Typography>
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Box mt={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="contained" color="primary" onClick={resetGame}>
                New Game
              </Button>
            </motion.div>
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

export default TicTacToe;

// export default TicTacToeGame;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// type GameStatus = 'playing' | 'won' | 'draw';
// type CellValue = 'X' | 'O' | null;

// interface GameState {
//   board: CellValue[];
//   currentPlayer: 'X' | 'O';
//   status: GameStatus;
//   winner: CellValue;
//   winningCombination: number[] | null;
// }

// const TicTacToe = () => {
//   const [gameState, setGameState] = useState<GameState>({
//     board: Array(9).fill(null),
//     currentPlayer: 'X',
//     status: 'playing',
//     winner: null,
//     winningCombination: null,
//   });

//   const [stats, setStats] = useState({
//     xWins: 0,
//     oWins: 0,
//     draws: 0,
//   });

//   const winningCombos = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
//   ];

//   const checkWinner = (board: CellValue[]): [CellValue, number[] | null] => {
//     for (const combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         return [board[a], combo];
//       }
//     }
//     return [null, null];
//   };

//   const checkDraw = (board: CellValue[]): boolean => {
//     return board.every(cell => cell !== null);
//   };

//   const handleCellClick = (index: number) => {
//     if (gameState.board[index] || gameState.status !== 'playing') return;

//     const newBoard = [...gameState.board];
//     newBoard[index] = gameState.currentPlayer;

//     const [winner, winningCombo] = checkWinner(newBoard);
//     const isDraw = !winner && checkDraw(newBoard);

//     let newStatus: GameStatus = 'playing';
//     if (winner) {
//       newStatus = 'won';
//       setStats(prev => ({
//         ...prev,
//         [winner === 'X' ? 'xWins' : 'oWins']: prev[winner === 'X' ? 'xWins' : 'oWins'] + 1,
//       }));
//     } else if (isDraw) {
//       newStatus = 'draw';
//       setStats(prev => ({
//         ...prev,
//         draws: prev.draws + 1,
//       }));
//     }

//     setGameState({
//       board: newBoard,
//       currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
//       status: newStatus,
//       winner: winner,
//       winningCombination: winningCombo,
//     });
//   };

//   const resetGame = () => {
//     setGameState({
//       board: Array(9).fill(null),
//       currentPlayer: 'X',
//       status: 'playing',
//       winner: null,
//       winningCombination: null,
//     });
//   };

//   const getCellStyle = (index: number) => {
//     const isWinningCell = gameState.winningCombination?.includes(index);
//     const baseStyle = "w-24 h-24 text-4xl font-bold flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-105";

//     if (isWinningCell) {
//       return `${baseStyle} bg-green-400 text-white shadow-lg`;
//     }

//     if (gameState.board[index] === 'X') {
//       return `${baseStyle} bg-blue-100 text-blue-600 shadow-md`;
//     }

//     if (gameState.board[index] === 'O') {
//       return `${baseStyle} bg-pink-100 text-pink-600 shadow-md`;
//     }

//     return `${baseStyle} bg-gray-50 hover:bg-gray-100 shadow-sm`;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="p-8 bg-white rounded-2xl shadow-2xl"
//       >
//         <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
//           Tic Tac Toe
//         </h1>

//         {/* Game Status */}
//         <motion.div
//           className="mb-6 text-center text-lg"
//           animate={{ scale: gameState.status !== 'playing' ? 1.1 : 1 }}
//         >
//           {gameState.status === 'playing' && (
//             <div className="flex items-center justify-center space-x-2">
//               <span className="text-gray-600">Current Player:</span>
//               <span className={`font-bold ${
//                 gameState.currentPlayer === 'X' ? 'text-blue-600' : 'text-pink-600'
//               }`}>
//                 {gameState.currentPlayer}
//               </span>
//             </div>
//           )}
//           {gameState.status === 'won' && (
//             <motion.p
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="text-green-600 font-bold text-2xl"
//             >
//               Player {gameState.winner} wins! 🎉
//             </motion.p>
//           )}
//           {gameState.status === 'draw' && (
//             <motion.p
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="text-blue-600 font-bold text-2xl"
//             >
//               It's a draw! 🤝
//             </motion.p>
//           )}
//         </motion.div>

//         {/* Game Board */}
//         <div className="grid grid-cols-3 gap-3 mb-8">
//           {gameState.board.map((cell, index) => (
//             <motion.button
//               key={index}
//               onClick={() => handleCellClick(index)}
//               className={getCellStyle(index)}
//               disabled={cell !== null || gameState.status !== 'playing'}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               {cell}
//             </motion.button>
//           ))}
//         </div>

//         {/* Game Controls */}
//         <div className="flex justify-center mb-8">
//           <motion.button
//             onClick={resetGame}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-bold hover:from-blue-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             New Game
//           </motion.button>
//         </div>

//         {/* Game Stats */}
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <div className="p-4 bg-blue-50 rounded-xl">
//             <p className="text-blue-600 font-bold text-lg">{stats.xWins}</p>
//             <p className="text-gray-600">X Wins</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-xl">
//             <p className="text-gray-600 font-bold text-lg">{stats.draws}</p>
//             <p className="text-gray-600">Draws</p>
//           </div>
//           <div className="p-4 bg-pink-50 rounded-xl">
//             <p className="text-pink-600 font-bold text-lg">{stats.oWins}</p>
//             <p className="text-gray-600">O Wins</p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TicTacToe;
