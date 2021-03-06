import React, { Component } from "react";
import Ball from "./Ball";
import "./Lottery.css";
export default class Lottery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nums: Array.from({ length: this.props.numBalls })
    };
    this.handleClick = this.handleClick.bind(this);
  }
  generate() {
    this.setState(
      currState => ({
        nums: currState.nums.map(
          n => Math.floor(Math.random() * this.props.maxNum) + 1
        )
      }),
      () => {
        if (this.props.title === "Lottery") {
          this.props.setMatch(this.state.nums);
        }
      }
    );
  }
  //for main lottery component
  handleClick(e) {
    this.generate();
  }

  render() {
    if (this.props.isWinner) {
      return (
        <section className='Lottery'>
          <h1>{this.props.title}</h1>
          <div>
            {this.state.nums.map(n => (
              <Ball num={n} />
            ))}
          </div>
          <button onClick={this.handleClick} disabled={this.props.isWinner}>
            Generate
          </button>
        </section>
      );
    } else {
      return (
        <section className='Lottery'>
          <h1>{this.props.title}</h1>
          <div>
            {this.state.nums.map(n => (
              <Ball num={n} />
            ))}
          </div>
          <button onClick={this.handleClick}>Generate</button>
        </section>
      );
    }
  }
}
