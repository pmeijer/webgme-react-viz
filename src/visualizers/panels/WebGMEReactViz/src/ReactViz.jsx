import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './App.css';
import ChildrenList from './ChildrenList';

export default class ReactViz extends Component {

    static propTypes = {
        gmeClient: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {gmeClient} = this.props;
        let content = <div/>;

        if (gmeClient) {
            // TODO: ChildrenList should get activeNode/Selection from the redux-store.
            content = <ChildrenList gmeClient={this.props.gmeClient} activeNode={""} activeSelection={[]}/>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={'/assets/DecoratorSVG/Router.svg'} className={this.props.gmeClient ? "App-logo" : "App-logo-loading"} alt="logo"/>
                    <h1 className="App-title">{this.props.gmeClient ? "Visualizer loaded" : "Loading Visualizer..."}</h1>
                </header>
                {content}
            </div>
        );
    }
}
