import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import StarIcon from '@material-ui/icons/Star';

import Territory from '../gme/Territory';

export default class ChildrenList extends Component {
    static propTypes = {
        gmeClient: PropTypes.object.isRequired,
        activeNode: PropTypes.string.isRequired,
        activeSelection: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    state = {
        territory: null,
        children: {},
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        const {activeNode} = newProps;

        if (activeNode !== this.props.activeNode) {
            this.setState({
                territory: {
                    [activeNode]: {children: 1}
                }
            });
        }
    };

    componentDidMount() {
        const {activeNode} = this.props;
        this.setState({
            territory: {
                [activeNode]: {children: 1}
            }
        });
    }

    handleEvents = (hash, loads, updates, unloads) => {
        const {gmeClient} = this.props;
        const updateDesc = {};

        loads.forEach((nodeId) => {
            if (nodeId !== this.props.activeNode) {
                const nodeObj = gmeClient.getNode(nodeId);

                updateDesc[nodeId] = {
                    $set: {
                        name: nodeObj.getAttribute('name'),
                    },
                };
            }
        });

        updates.forEach((nodeId) => {
            if (nodeId !== this.props.activeNode) {
                const nodeObj = gmeClient.getNode(nodeId);

                updateDesc[nodeId] = {
                    name: {
                        $set: nodeObj.getAttribute('name'),
                    },
                };
            }
        });

        updateDesc.$unset = unloads.filter(nodeId => nodeId !== this.props.activeNode);

        this.setState({children: update(this.state.children, updateDesc)});
    };

    onListItemClick = (id) => {
        return (/*e*/) => {
            this.props.setActiveSelection([id]);
        };
    };

    render() {
        const {children, territory} = this.state;
        const {activeSelection} = this.props;

        const content = (<List>
            {Object.keys(children)
                .map(id => {
                    return (
                        <ListItem key={id} button onClick={this.onListItemClick(id)}>
                            {activeSelection.includes(id) ? <ListItemIcon><StarIcon/></ListItemIcon> : null}
                            <ListItemText primary={children[id].name}/>
                        </ListItem>
                    )
                })
            }
        </List>);

        return (
            <div>
                <Territory
                    gmeClient={this.props.gmeClient}
                    territory={territory}
                    onUpdate={this.handleEvents}
                    onlyActualEvents={true}
                />
                {content}
            </div>);
    }
}

ChildrenList.propTypes = {
    gmeClient: PropTypes.object
};