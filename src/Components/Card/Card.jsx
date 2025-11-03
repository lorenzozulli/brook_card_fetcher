import './Card.css';

export default function Card({card, chatId}) {
  
  const sendMessage = async (msj, chatId) => {
    const botToken = `${process.env.REACT_APP_BOT_TOKEN}`;

    const message = `Image URL: ${msj.images.large}`
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`);

  };
  return (
    <div className='card'
      onClick={() => {sendMessage(card, chatId)}}>
        <img src={card.images.small} className='imageCard' alt=''></img>
        <div className='details'>
          <h1 id='cardName'>{card.name}</h1>
          <p id='cardId'>{card.id}</p>
        </div>
    </div>
  )
}