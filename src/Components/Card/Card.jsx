import './Card.css';

export default function Card({card, chatId}) {
  
  const sendMessage = async (msj, chatId) => {
    const botToken = `${process.env.REACT_APP_BOT_TOKEN}`;
    const chatId = chatId;

    const message = `Id: ${msj.id}
    Name: ${msj.name}
    Image: ${msj.images.small}`

    
    if(chatId != '') await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`);

  };
  return (
    <div className='card'
      onClick={() => {sendMessage(card, chatId)}}>
        <h3 id='cardId'>{card.id}</h3>
        <img src={card.images.small} className='imageCard' alt=''></img>
    </div>
  )
}