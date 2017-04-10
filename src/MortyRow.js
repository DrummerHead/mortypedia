import React from 'react';
import padStart from 'lodash.padstart';

import './morty-row.css'


const getAvatar = (id, name) => {
  const imageUrl = `${process.env.PUBLIC_URL}/images/heads/icon_${padStart(id.toString(), 3, '0')}.png`;
  return <picture>
    <source srcSet={`${imageUrl} 2x`} />
    <img src={imageUrl} alt={name} />
  </picture>
}

const getTypeImage = type => {
  if (type === 'Normal') {
    return '';
  } else {
    const imageUrl = `${process.env.PUBLIC_URL}/images/types/${type.toLowerCase()}.png`;
    return <picture>
        <source srcSet={`${imageUrl} 2x`} />
        <img src={imageUrl} alt={type} />
      </picture>
  }
}

const MortyRow = (props) => {
  return <tr className={`mortyRow ${props.isMine ? 'mortyRow--selected' : ''}`} onClick={props.onClick}>
    <td>{props.id}</td>
    <td>
      {getAvatar(props.id, props.name)}
      <a href={`https://pocketmortys.net${props.url}`}>{props.name}</a>
    </td>
    <td>{getTypeImage(props.type)}</td>
    <td className='mortyTable--tertiary'>{props.xp}</td>
    <td className='mortyTable--secondary'>{props.hp}</td>
    <td className='mortyTable--secondary'>{props.atk}</td>
    <td className='mortyTable--secondary'>{props.def}</td>
    <td className='mortyTable--tertiary'>{props.spd}</td>
    <td className='mortyTable--tertiary'>{props.isRare ? 'Y' : 'N'}</td>
    <td className='mortyTable--tertiary'>{props.badgesReq}</td>
    <td>{props.total}</td>
  </tr>
};

export default MortyRow;
