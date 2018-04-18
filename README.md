# webgme-react-viz
This is a template repository for wrapping a react bundle into a webgme visualizer. The basic outline is the following:
- The webgme visualizer panel is defined in [WebGMEReactVizPanel.js](src/visualizers/panels/WebGMEReactViz/WebGMEReactVizPanel.js).
- The visualizer panel loads the [reactViz.bundle.js](src/visualizers/panels/WebGMEReactViz/reactViz.bundle.js) which is the react app from src [wrapped as
a requirejs module](webpack.config.js) and constructor like function that provides the id of the DOM-element where react app should attach.
- The webgme (backbone) state is propagated via mediator globally available. The react app can also trigger state events (as shown with setActiveNode/Selection). In addition
panel-events such as readOnly, isActivePanel and destroy are propagated.
- The state in the react component is handled by redux and provided to the [component ChildrenList.jsx](src/visualizers/panels/WebGMEReactViz/src/components/ChildrenList.jsx)
via a [wrapper-container ChildrenList.jsx](src/visualizers/panels/WebGMEReactViz/src/containers/ChildrenList.jsx).

The entry point for the react application is [index.js](src/visualizers/panels/WebGMEReactViz/src/index.js) and this example also shows how to bundle css with webpack.
To rebuild the reactViz.bundle.js/css run `npm run webpack`.


## Installation
First, install the react-viz following:
- [NodeJS](https://nodejs.org/en/) (v8.x.x recommended)
- [MongoDB](https://www.mongodb.com/)

Second, start mongodb locally by running the `mongod` executable in your mongodb installation (you may need to create a `data` directory or set `--dbpath`).

Then, run `webgme start` from the project root to start . Finally, navigate to `http://localhost:8888` to start using react-viz!
