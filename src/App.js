import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Main from './components/Main';
import Vehicle from './components/Vehicle';
import Vehicles from './components/Vehicles';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const App = () => (
    <BrowserRouter>
      <Navbar /> {/** This is the base navbar component */}
      <Main>
        <Route exact path="/" component={Home} /> {/** This sets the path to homepage */}
        <Route path="/vehicles" component={Vehicles} /> {/** This sets the path to vehicles page */}
        <Route path="/not-found" component={NotFound} /> {/** This sets the path to 404 page */}
        <Route exact path="/vehicle/:id" component={Vehicle} /> {/** This sets the path to view individual vehicles */}
      </Main> {/** This the main section of all pages */}
      <Footer /> {/** This sets the footer incoporated to all pages */}
    </BrowserRouter>
);

export default App;
