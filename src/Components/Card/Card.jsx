import './Card.css';

export default function Card({card}) {
  const sendMessage = async (msj) => {
    const botToken = `${process.env.REACT_APP_BOT_TOKEN}`;
    const chatId = `${process.env.REACT_APP_CHAT_ID}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=<a href="${msj}"></a>`);

  };
  return (
    <div className='card'
      onClick={() => {sendMessage(card.id)}}>
        <h3 id='cardId'>{card.id}</h3>
        <img src={card.images.small} className='imageCard' alt=''></img>
    </div>
  )
}