import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/****************************************************** */
  function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares:Array(9).fill(null) , //squares is an array we created 
        xIsNext:true //x's turn by default 
      }
    }

    handleClick(i){
      const squares= this.state.squares.slice();
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i]= this.state.xIsNext?"X":"O"; //magic 
      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext, 
      });
    }
    renderSquare(i) {
      return (
      <Square value={this.state.squares[i]}
       onClick={()=>{this.handleClick(i)}}
      />
      );
    }
  
    render() {
      //const status = 'Next player:'+ (this.state.xIsNext ? 'X':'O');
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner){
        status = 'WINNER:' + winner;
      }
      else {
        status = 'Next Player:'+ (this.state.xIsNext ? 'X':'O');
      }

      return (
        <div class="theBoard">
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares){  //given an array of 9 squares 
                                      //this function will check for winners 
                                      //and return X,O,NULL as appropriate
    const lines = [
      [0,1,2], //left 2 right all 3 rows 
      [3,4,5],
      [6,7,8],
      [0,3,6],  //top to bottom all 3 columns 
      [1,4,7],
      [2,5,8],
      [0,4,8], //diagonals 
    ];

    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];   //assigning each item in lines to [a,b,c] array 
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //nani?
        return squares[a];
      }
    }
    return null; 
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );