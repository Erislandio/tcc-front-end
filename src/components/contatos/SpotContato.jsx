import React, { Component } from 'react';

class SpotContato extends Component {
    render() {
        return (
            <aside className="profile-card">
                <header>
                    <a href="/contatos">
                        <img src={this.props.imagem} className="hoverZoomLink" />
                    </a>
                    <h1>{this.props.name}</h1>
                    <h2>{this.props.email}</h2>
                </header>
                <div className="profile-bio">
                    <p>
                        {this.props.desc}
                    </p>
                </div>
            </aside>
        );
    }
}

export default SpotContato;