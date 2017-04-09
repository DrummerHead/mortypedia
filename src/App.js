import React from 'react';
import data from './data/data.json';
import MortyRow from './MortyRow'

class App extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>type</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => b.total - a.total).map(morty =>
            <MortyRow key={morty.id} {...morty} />
          )}
        </tbody>
      </table>
    );
  }
}

export default App;
