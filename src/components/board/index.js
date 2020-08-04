import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';
import { Square } from '../square/Square';
import confetti from 'canvas-confetti';

// NOTE: The code below works for any n x n grid

const selectBoard = (state) => state.board;
const selectGame = (state) => state.game;
let boardSize;
let currentX;
let currentY;
let currentPlayer;

const handleClick = (game, board, dispatch, x, y) => {
  // don't let user click on button that has a value already or if someone has won the game
  if (board[x][y] || game.winner) {
    return;
  }
  currentPlayer = game.currentPlayer;
  currentX = x;
  currentY = y;
  dispatch(selectCell(game.currentPlayer, x, y));
}

const createSquares = (game, board, dispatch) => {
  let rows = [];
  let counter = 0;
  for (let x = 0; x < boardSize; x++) {
    let rowSquares = [];
    for (let y = 0; y < boardSize; y++) {
      rowSquares.push(
        <Square 
              value={board[x][y]}
              x = {x}
              y = {y}
              key={counter} 
              onClick={() => 
                handleClick(game, board, dispatch, x, y)
              }
            />);
      counter++;
    }
    rows.push(<div className="board-row" key={x}> {rowSquares} </div>);
  }
  return rows;
}

const checkRow = (game, board) => {
  for (let i = 0; i < boardSize; i++) {
    if (board[currentX][i] !== currentPlayer) {
      game.winner = null;
      return false;
    }
  }
  game.winner = currentPlayer;
  highlightRow(currentX);
  return true;
}

const checkColumn = (game, board) => {
  for (let i = 0; i < boardSize; i++) {
    if (board[i][currentY] !== currentPlayer) {
      game.winner = null;
      return false;
    }
  }
  game.winner = currentPlayer;
  highlightColumn(currentY);
  return true;
}

const checkForwardDiagonal = (game, board) => {
  if (currentX === currentY) {
    for (let i = 0; i < boardSize; i++) {
      if (board[i][i] !== currentPlayer) {
        game.winner = null;
        return false;
      }
    }
    game.winner = currentPlayer;
    highlightForwardDiagonal();
    return true;
  }
  return false;
}

const checkBackDiagonal = (game, board) => {
  if (currentX + currentY === boardSize - 1) {
    for (let i = 0; i < boardSize; i++) {
      if (board[i][(boardSize - 1) - i] !== currentPlayer) {
        game.winner = null;
        return false;
      }
    }
    game.winner = currentPlayer;
    highlightBackDiagonal();
    return true;
  }
  return false;
}

const checkWinner = (game, board) => {
  if (currentX == null) {
    return null
  }

  if (checkRow(game, board) ||
    checkColumn(game, board) ||
    checkForwardDiagonal(game, board) ||
    checkBackDiagonal(game, board)
  ) {return} 

  return;
}

const winningStyle = {
  backgroundColor: "red",
  transition: "all 600ms ease-in-out"
}

const highlightRow = (x) => {
  for (let i = 0; i < boardSize; i++) {
    let button = document.getElementById("" + x + i);
    Object.assign(button.style, winningStyle);
  }
  confetti();
}

const highlightColumn = (y) => {
  for (let i = 0; i < boardSize; i++) {
    let button = document.getElementById("" + i + y);
    Object.assign(button.style, winningStyle);
  }
  confetti();
}

const highlightForwardDiagonal = () => {
  for (let i = 0; i < boardSize; i++) {
    for (let p = 0; p < boardSize; p++) {
      if (i === p) {
        let button = document.getElementById("" + i + p);
        Object.assign(button.style, winningStyle);
      }
    }
  }
  confetti();
}

const highlightBackDiagonal = () => {
  for (let i = 0; i < boardSize; i++) {
    for (let p = 0; p < boardSize; p++) {
      if (i + p === boardSize - 1) {
        let button = document.getElementById("" + i + p);
        Object.assign(button.style, winningStyle);
      }
    }
  }
  confetti();
}

export const Board = () => {
  const board = useSelector(selectBoard);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  boardSize = board.length;
  checkWinner(game, board);

  return (
    <div className="limiter">
      <div className="page-container">
        <div className="wrap">
          <div className="Board">
            {game.winner ? 
              <div className={"page-title " + currentPlayer}>Winner {game.winner} </div> 
              : <div className={"page-title " + game.currentPlayer}>Player {game.currentPlayer}</div>}
            {createSquares(game, board, dispatch)}
          </div>
        </div>
      </div>
    </div>
  )
}