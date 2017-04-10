import React from 'react';
import data from './data/data.json';
import UserList from './UserList'

import MortyRow from './MortyRow'

import './selectList.css'
import './search.css'
import './mortyTable.css'

const userList = new UserList();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mortyList: userList.getAll(),
      isAll: true,
      searchText: '',
      sortBy: 'total'
    }

    this.selectMorty = this.selectMorty.bind(this);
    this.isMine = this.isMine.bind(this);
    this.setSorting = this.setSorting.bind(this);
    this.sortingPredicate = this.sortingPredicate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
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
      isAll
    })
  }

  setSorting(sortBy) {
    this.setState({
      sortBy
    })

  }

  sortingPredicate() {
    switch (this.state.sortBy) {
      case 'total':
        return (a, b) =>
          b.total - a.total ||
          b.atk - a.atk ||
          b.hp - a.hp ||
          b.def - a.def ||
          a.id - b.id;
      case 'id':
        return (a, b) => a.id - b.id;
    }
  }

  handleSearch(ev) {
    this.setState({
      searchText: ev.target.value
    })
  }

  handleClear() {
    this.setState({
      searchText: ''
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
        <table className='mortyTable'>
          <thead>
            <tr>
              <th onClick={() => this.setSorting('id')} className='mortyTable--sortable'>id</th>
              <th>name</th>
              <th>type</th>
              <th className='mortyTable--tertiary'>xp</th>
              <th className='mortyTable--secondary'>hp</th>
              <th className='mortyTable--secondary'>atk</th>
              <th className='mortyTable--secondary'>def</th>
              <th className='mortyTable--tertiary'>spd</th>
              <th className='mortyTable--tertiary'>rare</th>
              <th className='mortyTable--tertiary'>bdgs</th>
              <th onClick={() => this.setSorting('total')} className='mortyTable--sortable'>total</th>
            </tr>
          </thead>
          <tbody>
            {mortyList
              .filter(morty => morty.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
              .sort(this.sortingPredicate())
              .map(morty =>
                <MortyRow key={morty.id} onClick={ev => this.selectMorty(ev, morty.id)} {...morty} isMine={this.isMine(morty.id)} />
            )}
          </tbody>
        </table>
        <div className='search'>
          <input type='search' className='search__input' value={this.state.searchText} onChange={this.handleSearch} />
          <div className='search__clear' onClick={this.handleClear} >×</div>
        </div>
      </main>
    );
  }
}

export default App;
