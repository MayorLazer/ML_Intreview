import React from 'react'

export default function CardWide(props) {
    return (
        <div className="CardWide">
            <img src={props.thumbnail} width="100" height="100"/>
            <p>{props.price}</p>
            <p>{props.freeShipping? 'SI' : 'NO'}</p>
            <p>{props.title}</p>
            <p>{props.cityName}</p>
        </div>
    )
}
