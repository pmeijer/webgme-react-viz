import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './App.css';
import reducers from './containers/reducers';
import {setActiveNode, setActiveSelection} from './containers/actions';
import ChildrenList from './containers/ChildrenList';

export default class ReactViz extends Component {

    static propTypes = {
        gmeClient: PropTypes.object,
        stateMediator: PropTypes.object,
        initialState: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.store = createStore(reducers, this.props.initialState);

        const {stateMediator} = this.props;

        stateMediator.getActiveNode = () => {
            return this.store.getState().activeNode;
        };

        stateMediator.onActiveNodeChange = (activeNode) => {
            console.log('onActiveNodeChange', activeNode);
            this.store.dispatch(setActiveNode(activeNode));
        };

        stateMediator.onActiveSelectionChange = (activeSelection) => {
            console.log('onActiveSelectionChange', activeSelection);
            this.store.dispatch(setActiveSelection(activeSelection));
        };

        this.store.subscribe(() => {
            const state = this.store.getState();
            console.log('store.subscribe, state:', state);

            // TODO: Do we need to filter the state or will BackBone take care of this?
            stateMediator.setActiveNode(state.activeNode);
            stateMediator.setActiveSelection(state.activeSelection);
        });
    }

    render() {
        const {gmeClient} = this.props;
        let content = <div/>;

        if (gmeClient) {
            content = <ChildrenList gmeClient={this.props.gmeClient}/>;
        }

        return (
            <Provider store={this.store}>
                <div className="App">
                    <header className="App-header">
                        <img
                            src={'/assets/DecoratorSVG/Router.svg'}
                            className={this.props.gmeClient ? "App-logo" : "App-logo-loading"}
                            alt="logo"
                        />
                        <h1 className="App-title">
                            {this.props.gmeClient ? "Visualizer loaded" : "Loading Visualizer..."}
                        </h1>
                    </header>
                    {content}
                </div>
            </Provider>
        );
    }
}
