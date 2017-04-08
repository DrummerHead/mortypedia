// Scrape in the browsa
// https://pocketmortys.net/mortys

var getAttrElem = (morty, nthChild) =>
  morty.querySelector(`td:nth-child(${nthChild})`);

var getIntOrString = (morty) =>
  (nthChild, asInt = true) => {
    const dataString = getAttrElem(morty, nthChild).textContent;
    return asInt ? parseInt(dataString, 10) : dataString;
  };


var getAvatarUrl = id =>
  `/images/heads/icon_${id.toString().padStart(3, '0')}.png`;

var getUrl = morty =>
  getAttrElem(morty, 2).querySelector('a').getAttribute('href');

var getType = morty =>
  getAttrElem(morty, 3).querySelector('.typeimage').textContent;

var getRare = morty =>
  getAttrElem(morty, 10).textContent === 'Yes';


var mortyData = Array.from(document.querySelectorAll('#mortytable tbody .tabrow')).map(morty => {
  const getIoS = getIntOrString(morty);
  return {
    id: getIoS(1),
    name: getIoS(2, false),
    avatarUrl: getAvatarUrl(getIoS(1)),
    url: getUrl(morty),
    type: getType(morty),
    xp: getIoS(4),
    hp: getIoS(5),
    atk: getIoS(6),
    def: getIoS(7),
    spd: getIoS(8),
    total: getIoS(9),
    isRare: getRare(morty),
    badgesReq: getIoS(11)
  }
});

console.log(mortyData)