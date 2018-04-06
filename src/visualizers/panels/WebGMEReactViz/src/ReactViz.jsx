import React, {Component} from 'react';
import './App.css';
import Projects from './Projects';

export default class ReactViz extends Component {

    constructor(props) {
        super(props);

        window.onGMEInit = (client) => {
            this.setState({initialConnect: true, gmeClient: client});
        };

        this.state = {
            initialConnect: false
        }
    }

    render() {
        const {initialConnect} = this.state;
        let content = <div/>;

        if (initialConnect) {
            content = <Projects gmeClient={this.state.gmeClient}/>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={'/assets/DecoratorSVG/Router.svg'} className={initialConnect ? "App-logo" : "App-logo-loading"} alt="logo"/>
                    <h1 className="App-title">{initialConnect ? "Visualizer loaded" : "Loading Visualizer..."}</h1>
                </header>
                {content}
            </div>
        );
    }
}
