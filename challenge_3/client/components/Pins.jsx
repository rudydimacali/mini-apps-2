import React from 'react';

const Pins = ({ pins }) => {
  const generateRow = (start, end) => {
    return pins.slice(start, end + 1).map(pin => <td>{pin}</td>);
  };
  return (
    <table>
      <tbody>
        <tr>
          {generateRow(0, 3)}
        </tr>
        <tr>
          {generateRow(4, 6)}
        </tr>
        <tr>
          {generateRow(7, 8)}
        </tr>
        <tr>
          {generateRow(9, 9)}
        </tr>
      </tbody>
    </table>
  );
};

export default Pins;
