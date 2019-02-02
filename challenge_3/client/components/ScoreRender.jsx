import React from 'react';

const ScoreRender = ({ totalScore, score, frame }) => (
  <div>
    <h1 id='totalScore'>Total Score: {totalScore}</h1>
    <h1 id='score'>Score for Current Frame: {score}</h1>
    <h1 id='frame'>Current Frame: {frame} </h1>
  </div>
);

export default ScoreRender;
