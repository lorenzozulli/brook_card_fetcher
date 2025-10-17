import Card from '../Card/Card'

export default function CardList({items}){
    return (
        <div>
            {items.map((card) => <Card card={card}/>)}
        </div>
    )
}