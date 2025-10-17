import Card from '../Card/Card'

export default function CardList({items, chatId}){
    return (
        <div>
            {items.map((card) => <Card card={card} chatId={chatId}/>)}
        </div>
    )
}