import React from 'react'

import { Container, Row, Col, Hidden } from 'react-grid-system';
import './CardWide.scss'

export default function CardWide(props) {
    return (
        <div className="cardWide">
            <Row align="start" justify="center">
                <Col xs="content" >
                    <img src={props.thumbnail} width="180px" height="180px" style={{maxWidth:"180px"}}/>
                </Col>
                <Col xs={7}>
                    <Row justify="between">
                        <Col xs={4}>
                            <p className={`price ${props.freeShipping? "hasShipping" : ""}`}>
                                {props.currency} {props.price}
                            </p>
                        </Col>
                        <Col xs={1}>
                            <span className="city">{props.cityName}</span>
                        </Col>
                    </Row>
                    <Row align="start">
                        <Col xs={7}>
                            <p className="title">{props.title}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
