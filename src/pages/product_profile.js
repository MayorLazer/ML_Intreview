import React, { Component } from 'react'
import MainSearchBar from '../components/MainSearchBar'
import BreadCrumb from '../components/BreadCrumb';

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
                    {console.log(this.props, this.state)}
                    <MainSearchBar/>
                    <BreadCrumb breadCrumb={this.props.location.state?.breadCrumb ? this.props.location.state.breadCrumb : [] }/>
                    <main>
                        <p>{product.title}</p>
                        <p>{product.subtitle}</p>
                        <p>{product.condition}</p>
                        <p>{product.sold_quantity}</p>
                        <p>{product.price}</p>
                        <p>{product.currency_id}</p>
                        <img src={product.thumbnail} width="100" height="100"/>
                        
                        <p>{product_descri.plain_text}</p>
                        <p>{product_descri.text}</p>
                    </main>
                </>
            )
        }
    }
}

export default Product_profile
