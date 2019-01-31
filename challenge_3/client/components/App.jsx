import React from 'react';

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
    this.resetField = this.resetField.bind(this);
    this.throwBall = this.throwBall.bind(this);
  }

  generateNextTurn() {
    const
      {
        score, selectedPins, totalScore, activeBonuses, turn, frame,
      } = this.state;
    // First, set score for current frame to the current score plus last throw
    this.setState({
      score: score + selectedPins,
    }, () => {
      let bonusToAdd = 0;
      switch (turn) {
        // If first turn in frame
        case 0:
          // If strike
          if (score === 10) {
            bonusToAdd = 2;
            this.resetField();
            // Go to next frame, and increase total score by 10. Set score for next frame to 0.
            this.setState({
              score: 0,
              totalScore: totalScore + 10,
              frame: frame + 1,
              turn: turn + 1,
            });
          } else {
            this.setState({
              turn: turn + 1,
            });
          }
          break;
        // If second turn in frame
        case 1:
          // If spare
          if (score === 10) {
            bonusToAdd = 1;
            this.resetField();
            // Go to next frame, and increase total score by 10. Set score for next frame to 0.
            this.setState({
              score: 0,
              totalScore: totalScore + 10,
              frame: frame + 1,
              turn: 0,
            });
            // Otherwise, just add score for current frame to total score and go to next frame.
          } else {
            this.setState({
              totalScore: totalScore + score,
              score: 0,
              frame: frame + 1,
              turn: 0,
            });
          }
          break;
        // Testing for all cases
        default:
      }
      // Create copy of active bonuses to modify
      const newActiveBonuses = activeBonuses.slice();
      if (newActiveBonuses.length) {
        // If there are active bonuses, add to total score the current throw for each
        newActiveBonuses.forEach((activeBonus, index) => {
          if (activeBonus > 0) {
            this.setState({
              totalScore: totalScore + selectedPins,
            }, () => {
              newActiveBonuses[index] -= 1;
            });
          }
          // If current bonus has been dropped to 0, remove the bonus
          if (activeBonus === 0) {
            newActiveBonuses.splice(index, 1);
          }
        });
      }
      // If the previous throw was a strike or spare, add the resulting bonus to active bonuses.
      if (bonusToAdd && frame < 11) {
        newActiveBonuses.push(bonusToAdd);
      }
    });
  }

  resetField() {
    this.setState({
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  throwBall(e) {
    const { pins, selectedPins } = this.state;
    const pinIndices = [];
    e.preventDefault();
    // get indices of standing pins
    pins.forEach((pin, index) => {
      if (pin === 1) { pinIndices.push(index); }
    });
    // knock down random pins according to number of selected pins
    for (let i = 0; i < selectedPins; i += 1) {
      pins[pinIndices[Math.random() * pinIndices.length]] = 0;
    }
    this.generateNextTurn();
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}
