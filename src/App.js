import React from 'react';
import data from './data/data.json';

import MortyRow from './MortyRow'

import './selectList.css'


class App extends React.Component {
  render() {
    return (
      <main>
        <div className='selectList'>
          <span className='selectList__option selectList--selected'>All</span>
          <span className='selectList__option'>Mine</span>
        </div>
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
      </main>
    );
  }
}

export default App;
