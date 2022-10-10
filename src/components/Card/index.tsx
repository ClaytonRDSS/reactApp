import './styles.css'

//tipagem de componente
export type CardProps ={
    name: string;
    time: string;
}

export function Card(props: CardProps) { // utilizando props tornando o componente dinamico
    return (
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}