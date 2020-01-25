import React, { Component } from 'react'
import MainSearchBar from '../components/MainSearchBar'

export default class Home extends Component {
    render() {
        return (
            <>
                <MainSearchBar />
                <main>
                    <h1>home</h1>
                </main>
            </>
        )
    }
}

