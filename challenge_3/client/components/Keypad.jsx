import React from 'react';
import PropTypes from 'prop-types';

const numOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const Keypad = ({ handleClick }) => {
  const generateRow = (numArr) => {
    return numArr.map((num) => {
      return (
        <td>
          <button type="button" className="selectedPins" value={num} onClick={handleClick}>{num}</button>
        </td>
      );
    });
  };
  return (
    <table>
      <tbody>
        <tr>
          {generateRow([1, 2, 3])}
        </tr>
        <tr>
          {generateRow([4, 5, 6])}
        </tr>
        <tr>
          {generateRow([7, 8, 9])}
        </tr>
        <tr>
          {generateRow([10, 0])}
        </tr>
      </tbody>
    </table>
  );
};

Keypad.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Keypad;
