import Card from '../Card/Card';
import './CardList.css';

export default function CardList({items, chatId}){
    return (
        <div id='card-list'>
            {items.map((card) => <Card card={card} chatId={chatId}/>)}
        </div>
    )
}