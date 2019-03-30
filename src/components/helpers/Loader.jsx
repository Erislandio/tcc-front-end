import React, { Component } from 'react'
import './loader.css'

export default class Loader extends Component {
    render() {
        return (
            <div className="container-loader">
                <div className="top-left"></div>
                <div className="top-right"></div>
                <div className="bottom-left"></div>
                <div className="bottom-right"></div>
            </div>
        )
    }
}
