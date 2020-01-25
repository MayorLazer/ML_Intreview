import React, { Component } from 'react'
import MainSearchBar from '../components/MainSearchBar'
import BreadCrumb from '../components/BreadCrumb';

const API ='https://api.mercadolibre.com/items/'

export class Product_profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
          product: [],
          isLoading: false,
          error: null,
        };
      }

    componentDidMount() {  
        if (this._isMounted) {
            this.setState({ isLoading: true });
        }

        let QUERY = this.props.match.params.id;
        fetch(API + QUERY)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ product: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { product, isLoading, error } = this.state;
        
        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        if(!isLoading && !error){
            return (
                <>
                    {console.log(this.props)}
                    <MainSearchBar/>
                    <BreadCrumb breadCrumb={this.props.location.state.breadCrumb}/>
                    <main>
                        <p>{product.title}</p>
                        <p>{product.subtitle}</p>
                        <p>{product.condition}</p>
                        <p>{product.sold_quantity}</p>
                        <p>{product.price}</p>
                        <p>{product.currency_id}</p>
                        <img src={product.thumbnail} width="100" height="100"/>
                    </main>
                </>
            )
        }
    }
}

export default Product_profile
