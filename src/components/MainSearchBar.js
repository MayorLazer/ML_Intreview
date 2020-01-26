import React from 'react';
import {Link, useHistory } from "react-router-dom";

import { Container, Row, Col, Hidden } from 'react-grid-system';
import './MainSearchBar.scss'

const qs = require('query-string');
const assets = './assets/'

export default function MainSearchBar(props) {
    let history = useHistory();
    let textInput = React.createRef();
    let query = qs.parse(props.location, { ignoreQueryPrefix: true }).search;

    function handleSubmit(evt) {
        evt.preventDefault();
        // TODO: Refactor this as a variable
        history.push("/items?search="+textInput.current.value);
        // Updates list only on SearchPage
        if( props.isSearchPage ){ props.getData(textInput.current.value); }
    }

    return ( 
        <nav className="ml_nav">
            <Container fluid>
                <Row align="center">
                    <Col sm={1} offSet={{sm:1}}>
                        <Hidden xs> 
                            <Link to={"/"}>
                                <img src="/assets/Logo_ML.png" srcSet="/assets/Logo_ML@2x.png 2x"/>
                            </Link>
                        </Hidden>
                    </Col>
                    <Col sm={9}>
                        <form onSubmit={handleSubmit}>
                            <input id="site-search" 
                                type="search" 
                                placeholder="Nunca dejes de buscar"
                                ref={textInput}  
                                // TODO: If (query) reflect it on input
                            />
                            <button type="submit" value="Search">
                                <img src="/assets/ic_Search.png" srcSet="/assets/ic_Search@2x.png 2x"/>
                            </button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </nav>

        
    );
}