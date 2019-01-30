import React from 'react';

const SearchResults = ({ results }) => {
  return (
    results.map((entry) => {
      return (
        <tr>
          <td>{entry.date}</td>
          <td>{entry.description}</td>
        </tr>
      );
    })
  );
}

export default SearchResults;