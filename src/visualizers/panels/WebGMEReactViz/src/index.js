/*globals VISUALIZER_INSTANCE_ID, WebGMEGlobal*/
/**
 * This file is specific for the wrapper in webgme. Note how the VISUALIZER_INSTANCE_ID
 * is defined in the wrapper inside webpack.config.js and later passed by the WebGMEReactVizPanel.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import ReactViz from './ReactViz';

// FIXME: This is just a temporary placeholder - this will be a mediator between WebGMEs back-bone
// FIXME: and a redux store.
window.WebGMEGlobal.WebGMEReactPanels[VISUALIZER_INSTANCE_ID].stateHandler = {
    destroy: () => {
        console.log('Goodbye..')
    },
    activeObjectChanged: (nodeId) => {
        console.log('There\'s a new node in town', nodeId);
    },
    setActiveObject: (nodeId) => {
        console.log('New node', nodeId);
    }
};

window.WebGMEGlobal.WebGMEReactPanels[VISUALIZER_INSTANCE_ID].initialized = true;

ReactDOM.render(<ReactViz gmeClient={window.WebGMEGlobal.WebGMEReactPanels[VISUALIZER_INSTANCE_ID].client}/>,
    document.getElementById(VISUALIZER_INSTANCE_ID));
