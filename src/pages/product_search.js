import React, { Component } from 'react'
import { Link } from "react-router-dom";

import MainSearchBar from '../components/MainSearchBar'
import CardWide from '../components/CardWide';
import BreadCrumb from '../components/BreadCrumb';

const API = 'https://api.mercadolibre.com/sites/MLA/search?q=';
const qs = require('query-string');

export class Product_search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          breadCrumb: [],
          isLoading: false,
          error: null,
        };
      }

    getData = (QUERY) => {
        this.setState({ isLoading: true });
        
        fetch(API + QUERY)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                // Checks undefined in API for breadCrumb component
                let cate = data.filters.findIndex( x => x.id === "category");
                if (cate !== -1) { this.setState({breadCrumb: data.filters[cate].values[0].path_from_root})}
                this.setState({ products: data.results, isLoading: false })
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.getData(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search)
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidMount() {
        this.getData( qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search );
    }

    render() {
        let { products, breadCrumb, isLoading, error } = this.state;
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        if(!isLoading && !error ){
            return (
                <>
                    <MainSearchBar getData={this.getData} isSearchPage={true} />
                    <BreadCrumb breadCrumb={breadCrumb} />
                    <main>
                        <ul>
                            {products.map( (item,key) =>
                                <Link to={{
                                    pathname: "/item/"+item.id,
                                    state: {
                                        breadCrumb: breadCrumb
                                    }
                                }} key={key}>
                                    <CardWide 
                                        thumbnail={item.thumbnail}
                                        price={item.price}
                                        freeShipping={item.shipping.free_shipping}
                                        title={item.title}
                                        cityName={item.address.city_name}
                                    /> 
                                </Link>
                            )}
                        </ul>
                    </main>
                </>
            )
        }
    }
}

export default Product_search
