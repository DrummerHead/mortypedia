import React from 'react';
import padStart from 'lodash.padstart';

import './morty-row.css'


const getAvatar = (id, name) => {
  const imageUrl = `/images/heads/icon_${padStart(id.toString(), 3, '0')}.png`;
  return <picture>
    <source srcSet={`${imageUrl} 2x`} />
    <img src={imageUrl} alt={name} />
  </picture>
}

const getTypeImage = type => {
  if (type === 'Normal') {
    return '';
  } else {
    const imageUrl = `/images/types/${type.toLowerCase()}.png`;
    return <picture>
        <source srcSet={`${imageUrl} 2x`} />
        <img src={imageUrl} alt={type} />
      </picture>
  }
}

const MortyRow = (props) => {
  return <tr className='mortyRow'>
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
