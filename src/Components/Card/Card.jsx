import './Card.css';

export default function Card({card, chatId}) {
  
  const sendMessage = async (msj, chatId) => {
    const botToken = `${process.env.REACT_APP_BOT_TOKEN}`;

    const message = `*Name:* ${msj.name} \ *Id:* ${msj.id} \ *Image URL:* ${msj.images.large}`
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=MarkdownV2`);

  };
  return (
    <div className='card'
      onClick={() => {sendMessage(card, chatId)}}>
        <h3 id='cardName'>{card.name}</h3>
        <p id='cardId'>{card.id}</p>
        <img src={card.images.small} className='imageCard' alt=''></img>
    </div>
  )
}