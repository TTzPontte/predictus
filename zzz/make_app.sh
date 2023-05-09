#!/bin/bash

# Create a new React app
npx create-react-app my-app

# Change directory to the app
cd my-app

# Install dependencies
yarn add \
    @aws-amplify/datastore \
    @babel/polyfill \
    @fortawesome/fontawesome-free \
    @fortawesome/fontawesome-svg-core \
    @fortawesome/free-brands-svg-icons \
    @fortawesome/free-regular-svg-icons \
    @fortawesome/free-solid-svg-icons \
    @fortawesome/react-fontawesome \
    @hookform/error-message \
    @hookform/resolvers \
    @testing-library/jest-dom \
    @testing-library/user-event \
    react-hook-form \
    react-bootstrap \
    sass \
    react-router-dom

# Create the folder structure
mkdir src/components src/pages src/styles
touch src/App.js src/App.scss src/index.js src/routes.js
touch src/index.scss

# Write the content to files
echo "
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;
" > src/App.js

echo "
.App {
  font-family: sans-serif;
}
" > src/App.scss

echo "
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
" > src/index.js

echo "
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Home page</h1>
    </div>
  );
}

export default Routes;
" > src/routes.js

echo "
@import './index.scss';

" > src/index.scss

# Start the app
yarn start
