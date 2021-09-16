import React from 'react';
import './App.css';
import NavBar from './Services/NavBar';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './views/Home';
import SearchEvents from './views/SearchEvents';
import DetailEvents from './views/DetailEvents';
import Favoris from './views/Favoris'


function App() {

  return (
    <div className="App">

      <BrowserRouter>
      <NavBar />
        <Switch >
            <Route path="/" component={() => <Home />} exact/>
            <Route path="/search" component={() => <SearchEvents />} />
            <Route path="/detailevents/:id" component={() => <DetailEvents />}  />
            <Route path="/favoris" component={Favoris} />

          </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
