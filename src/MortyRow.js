import React from 'react';
import padStart from 'lodash.padstart';

const getAvatar = (id, name) =>
  <img src={`/images/heads/icon_${padStart(id.toString(), 3, '0')}.png`} alt={name} />;

const getTypeImage = type =>
  type === 'Normal'
    ? ''
    : <img src={`/images/types/${type.toLowerCase()}.png`} alt={type} />;

const MortyRow = (props) => {
  return <tr>
    <td>{props.id}</td>
    <td>
      {getAvatar(props.id, props.name)}
      <a href={`https://pocketmortys.net${props.url}`}>{props.name}</a>
    </td>
    <td>{getTypeImage(props.type)}</td>
    <td>{props.total}</td>
  </tr>
};

export default MortyRow;
