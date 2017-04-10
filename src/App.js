import React from 'react';
import data from './data/data.json';
import UserList from './UserList'

import MortyRow from './MortyRow'

import './selectList.css'

const userList = new UserList();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mortyList: userList.getAll(),
      isAll: true
    }
    this.selectMorty = this.selectMorty.bind(this);
    this.isMine = this.isMine.bind(this);
  }

  selectMorty(ev, id) {
    if (this.isMine(id)) {
      this.setState(prevState => ({
        mortyList: prevState.mortyList.filter(prevStateId => prevStateId !== id)
      }))
      userList.remove(id);
    } else {
      this.setState(prevState => ({
        mortyList: [...prevState.mortyList, id]
      }))
      userList.add(id);
    }
  }

  isMine(id) {
    return this.state.mortyList.includes(id);
  }

  selectAll(isAll) {
    this.setState({
      isAll: isAll
    })
  }

  render() {
    const mortyList = this.state.isAll
      ? data
      : data.filter(morty => this.isMine(morty.id))

    return (
      <main>
        <div className='selectList'>
          <span className={`selectList__option ${this.state.isAll ? 'selectList--selected' : ''}`} onClick={() => this.selectAll(true)}>All</span>
          <span className={`selectList__option ${!this.state.isAll ? 'selectList--selected' : ''}`} onClick={() => this.selectAll(false)}>Mine</span>
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
            {mortyList.sort((a, b) => b.total - a.total || b.atk - a.atk || b.id - a.id ).map(morty =>
              <MortyRow key={morty.id} onClick={ev => this.selectMorty(ev, morty.id)} {...morty} isMine={this.isMine(morty.id)} />
            )}
          </tbody>
        </table>
      </main>
    );
  }
}

export default App;
