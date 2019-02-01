import React from 'react';
import Keypad from './Keypad';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPins: 0,
      turn: 0,
      frame: 1,
      score: 0,
      totalScore: 0,
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      activeBonuses: [],
    };
    this.generateNextTurn = this.generateNextTurn.bind(this);
    this.throwBall = this.throwBall.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.addBonusPoints = this.addBonusPoints.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  generateNextTurn() {
    const { selectedPins, turn, frame, score } = this.state;
    // First, set score for current frame to the current score plus last throw
    this.setState({
      score: score + selectedPins,
    }, () => {
      // If first turn in frame
      if (turn === 0) {
        // If strike
        if (this.state.score === 10 && frame < 10) {
          // Go to next frame, and increase total score by 10. Set score for next frame to 0.
          this.nextFrame(2);
        } else if (this.state.score === 10) {
          this.nextFrame(0);
        } else {
          this.setState({
            turn: turn + 1,
          }, () => { this.addBonusPoints(0); });
        }
        // If second turn in frame
      } else if (turn === 1) {
        // If spare
        if (this.state.score >= 10) {
          // Go to next frame, and increase total score by 10. Set score for next frame to 0.
          this.setState({ score: 10 }, () => { this.nextFrame(1); });
          // Otherwise, just add score for current frame to total score and go to next frame.
        } else {
          this.nextFrame(0);
        }
      }
    });
  }

  nextFrame(...args) {
    const { frame, totalScore, score } = this.state;
    this.setState({
      totalScore: totalScore + score,
      score: 0,
      frame: frame + 1,
      turn: 0,
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }, () => {
      this.addBonusPoints(args[0]);
    });
  }

  addBonusPoints(bonusToAdd) {
    const { activeBonuses, selectedPins, frame } = this.state;
    // Create copy of active bonuses to modify
    const newActiveBonuses = activeBonuses.slice();
    if (newActiveBonuses.length) {
      // If there are active bonuses, add to total score the current throw for each
      let newTotal = this.state.totalScore;
      newActiveBonuses.forEach((activeBonus, index) => {
        if (activeBonus > 0) {
          newTotal += selectedPins;
          newActiveBonuses[index] -= 1;
        };
        if (index + 1 === newActiveBonuses.length) {
          this.setState({
            totalScore: newTotal,
          });
        }
      });
    }
    // If the previous throw was a strike or spare, add the resulting bonus to active bonuses.
    if (bonusToAdd && frame < 11) {
      newActiveBonuses.push(bonusToAdd);
    }
    this.setState({
      activeBonuses: newActiveBonuses,
    }, () => {
      if (frame > 10 && !newActiveBonuses.includes(1) && !newActiveBonuses.includes(2)) {
        this.newGame();
      }
    });
  }

  newGame() {
    this.setState({
      selectedPins: 0,
      turn: 0,
      frame: 1,
      score: 0,
      totalScore: 0,
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      activeBonuses: [],
    });
  }


  handleClick(e) {
    this.setState({
      [e.target.className]: Number(e.target.value),
    }, this.throwBall);
  }

  throwBall() {
    const { pins, selectedPins } = this.state;
    const pinIndices = [];
    // get indices of standing pins
    pins.forEach((pin, index) => {
      if (pin === 1) { pinIndices.push(index); }
    });
    // knock down random pins according to number of selected pins
    for (let i = 0; i < selectedPins; i += 1) {
      const pinIndex = Math.floor(Math.random() * pinIndices.length);
      pins[pinIndices[pinIndex]] = 0;
      pinIndices.splice(pinIndex, 1);
    }
    this.setState({ pins }, this.generateNextTurn);
  }

  render() {
    return (
      <div>
        <Keypad handleClick={this.handleClick} />
      </div>
    );
  }
}
