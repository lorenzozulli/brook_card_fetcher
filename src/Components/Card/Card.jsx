import './Card.css';

export default function Card({card}) {
  
  const sendMessage = async (msj) => {
    const botToken = `${process.env.REACT_APP_BOT_TOKEN}`;

    const message = `Id: ${msj.id}
    Name: ${msj.name}
    Image: ${msj.images.small}`

    
    if(chatId != '') await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=30&text=${message}`);

  };
  return (
    <div className='card'
      onClick={() => {sendMessage(card)}}>
        <h3 id='cardId'>{card.id}</h3>
        <img src={card.images.small} className='imageCard' alt=''></img>
    </div>
  )
}