import React, { Component } from 'react'
import MainSearchBar from '../components/MainSearchBar'
import BreadCrumb from '../components/BreadCrumb';

import { Container, Row, Col, Hidden } from 'react-grid-system';
import './product_profile.scss'

const API ='https://api.mercadolibre.com/items/'

export class Product_profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
          product: '',
          product_descri: '',
          isLoading: false,
          error: null,
        };
    }

    componentDidMount() {  
        let QUERY = this.props.match.params.id;

        if (this._isMounted) {
            this.setState({ isLoading: true });
        }

        (async () => {
            await fetch(API + QUERY)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => this.setState({ product: data }))
                .catch(error => this.setState({ error }));
    
            await fetch(API + QUERY + '/description')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => this.setState({ product_descri: data }))
                .catch(error => this.setState({ error }));

            this.setState({isLoading: false});
        })();
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { product, product_descri, isLoading, error } = this.state;
        
        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        if(!isLoading && !error){
            return (
                <>
                    <MainSearchBar/>
                    <BreadCrumb breadCrumb={this.props.location.state?.breadCrumb ? this.props.location.state.breadCrumb : [] }/>
                    <Container>
                        <main>
                            <Row align="start" justify="start">
                                <Col xs={8} md={3} push={{md:7}} className="buy_section">
                                    <p className="condition_qty">
                                        {product.condition} 
                                        {product.sold_quantity? <span> - {product.sold_quantity} </span> : ""}
                                    </p>
                                    <h1 className="title">{product.title}</h1>
                                    <p className="price">
                                        {product.currency_id} {product.price}
                                    </p>
                                    <button>Comprar</button>
                                </Col>
                                <Col md={7} pull={{md:3}} className="photo_section">
                                    <img src={product.thumbnail} height="500" style={{width:"100%",  maxWidth:"500px"}}/> 
                                </Col>
                                <Col md={12} className="descrip_section">
                                    <h2 className="descrip">Descripcion del producto</h2>
                                    <p>{product_descri.plain_text}</p>
                                    <p>{product_descri.text}</p>
                                </Col>
                            </Row>
                        </main>
                    </Container>
                </>
            )
        }
    }
}

export default Product_profile
