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
                <ul className="profile-social-links">
                    <li>
                        <a target="_blank" href="https://www.facebook.com/creativedonut">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://twitter.com/dropyourbass">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://github.com/vipulsaxena">
                            <i className="fa fa-github"></i>
                        </a>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default SpotContato;