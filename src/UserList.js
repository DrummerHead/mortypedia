class UserList {
  constructor() {
    this.mortyList = [];
    this.initialize();
  }

  initialize() {
    if (localStorage.getItem('mortyList') === null) {
      localStorage.setItem('mortyList', JSON.stringify([]));
    } else {
      this.mortyList = JSON.parse(localStorage.getItem('mortyList'));
    }
  }

  getAll() {
    return this.mortyList;
  }

  add(id) {
    this.mortyList.push(id);
    localStorage.setItem('mortyList', JSON.stringify(this.mortyList));
    //   this.debug();
    return this.mortyList;
  }

  remove(id) {
    this.mortyList = this.mortyList.filter(prevId => prevId !== id);
    localStorage.setItem('mortyList', JSON.stringify(this.mortyList));
    //   this.debug();
    return this.mortyList;
  }

  debug() {
    console.info('this.mortyList');
    console.log(this.mortyList);
    console.info('JSON.parse(localStorage.getItem("mortyList"))');
    console.log(JSON.parse(localStorage.getItem("mortyList")));
  }
}

export default UserList;
