import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import openSocket from 'socket.io-client';
const SERVER_URL = 'http://localhost:3001';

const socket = openSocket(SERVER_URL);

function Option(props) {

    return (
      <button className="option" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Answers extends React.Component {
    
  /* props:
      options: array of option strings
      onClick: onclick function for options */

    renderOption(i) {
      return (
        <Option
          value={this.props.options[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div className="answers">
          {this.renderOption(0)}
          {this.renderOption(1)}
          {this.renderOption(2)}
          {this.renderOption(3)}
        </div>
      );
    }
  }
  
  function Question(props){
    return(
      <div className="question">{props.questionText}</div>
    );
  }
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 0,
        options: Array(4).fill(null),
        questionText: "This is a sample question, or is it?",
        response: -1,
        // stepNumber: 0,
        // xIsNext: true
      };
    }
    handleClick(i) {
      // const history = this.state.history.slice(0, this.state.stepNumber + 1);
      // const current = history[history.length - 1];
      // const squares = current.squares.slice();
      // if (calculateWinner(squares) || squares[i]) {
      //   return;
      // }
      // squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        status:1,
        response: i,
      });
      socket.emit('answer',{
        answer:i,
      })
    }
  
    // jumpTo(step) {
    //   this.setState({
    //     stepNumber: step,
    //     xIsNext: (step % 2) === 0
    //   });
    // }
  
    render() {
      // const history = this.state.history;
      // const current = history[this.state.stepNumber];
      // const winner = calculateWinner(current.squares);
  
      // const moves = history.map((step, move) => {
      //   const desc = move ?
      //     'Go to move #' + move :
      //     'Go to game start';
      //   return (
      //     <li key={move}>
      //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
      //     </li>
      //   );
      // });
  
      // let status;
      // if (winner) {
      //   status = "Winner: " + winner;
      // } else {
      //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      // }
  
      return (
        <div className="game">
          <div className="response">{this.state.response}</div>
          <Question questionText={this.state.questionText} />
          <Answers
            options={this.state.options}
            onClick={i => this.handleClick(i)}
          />
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  // function calculateWinner(squares) {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];
  //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // }
  