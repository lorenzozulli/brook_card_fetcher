import './Card.css';

export default function Card({card}) {
  return (
    <div className='card'>
        <h3 id='cardId'>{card.id}</h3>
        <img src={card.images.small} className='imageCard' alt=''></img>
    </div>
  )
}