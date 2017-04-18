class UserList {
  constructor() {
    this.mortyList = [1];
    this.initialize();
  }

  initialize() {
    if (localStorage.getItem('mortyList') === null) {
      localStorage.setItem('mortyList', JSON.stringify(this.mortyList));
    } else {
      this.mortyList = JSON.parse(localStorage.getItem('mortyList'));
    }
  }

  sync() {
    localStorage.setItem('mortyList', JSON.stringify(this.mortyList));
  }

  add(id) {
    this.mortyList.push(id);
    this.sync();
    //this.debug();
    return this.mortyList;
  }

  remove(id) {
    this.mortyList = this.mortyList.filter(prevId => prevId !== id);
    this.sync();
    //this.debug();
    return this.mortyList;
  }

  getAll() {
    return this.mortyList;
  }

  debug() {
    console.log('----------------------------')
    console.info('this.mortyList');
    console.log(this.mortyList);
    console.info('JSON.parse(localStorage.getItem("mortyList"))');
    console.log(JSON.parse(localStorage.getItem("mortyList")));
  }
}

export default UserList;
