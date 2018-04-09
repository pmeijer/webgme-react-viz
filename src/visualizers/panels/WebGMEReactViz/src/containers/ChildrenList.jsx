import React from 'react';
import {connect} from 'react-redux';

import {setActiveNode, setActiveSelection} from './actions';
import ChildrenList from '../components/ChildrenList';

const mapStateToProps = state => ({
    activeNode: state.activeNode,
    activeSelection: state.activeSelection,
});

const mapDispatchToProps = dispatch => ({
    setActiveNode: (activeNode) => {
        dispatch(setActiveNode(activeNode));
    },
    setActiveSelection: (activeSelection) => {
        dispatch(setActiveSelection(activeSelection));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenList);