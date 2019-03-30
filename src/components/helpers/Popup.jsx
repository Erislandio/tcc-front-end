import React, { Component } from 'react'

export default class Popup extends Component {
    render() {

        const { text } = this.props

        return (
            <div className={(this.props.className) + " popup " }>
                <span className="content-popup">
                    {text}
                </span>
            </div>
        )
    }
}
