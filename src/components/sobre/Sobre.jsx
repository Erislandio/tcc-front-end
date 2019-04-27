import React, { Component } from 'react';
import './sobre.css'

class Sobre extends Component {
    render() {
        return (
            <div className="sobre">
                <h1 className="sobre-title">Icterícia</h1>
                <div className="banner">
                    <div className="banner-oque">
                        <img src="https://ativosaude.akamaized.net/wp-content/uploads/2018/08/22072731/pele-amarelada-min.jpg" />
                        <p>
                        O que é icterícia?
        De acordo com o gastroenterologista Rodrigo Toledo, formado pela Universidade Federal do Paraná (UFPR), o amarelão acontece pelo excesso do pigmento bilirrubina, que se fixa na pele gradativamente de modo a comprometer sua coloração natural. “O acometimento é inofensivo, mas visto como um sinal importante para outros diagnósticos”, ressalta.
                        </p>
                    </div>
                    <div className="banner-desc">
                        <img src="https://ativosaude.akamaized.net/wp-content/uploads/2018/08/22072546/ictericia-no-corpo-min.jpg" />
                        <p>
                            Bilirrubina é um pigmento amarelo produzido quando as hemácias, responsáveis por levar oxigênio às células, são deterioradas em um processo natural de reciclagem. Essa ação acontece em diferentes partes do corpo, como baço, medula óssea e fígado, sendo a última a mais comum.
                            <br />
                            Em seu estado normal, a substância amarelada vai até o fígado, onde se mistura com a bile, e é processada por meio das vias biliares, sendo utilizada posteriormente no processo da digestão e na urina.
                        </p>
                    </div>
            </div>
                <a href="https://www.ativosaude.com/saude/ictericia/" >
                    Link de consulta.
                </a>
            </div>

        );
    }
}

export default Sobre;