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
      <Navbar />
      <Main>
        <Route exact path="/" component={Home} />
        <Route path="/vehicles" component={Vehicles} />
        <Route path="/not-found" component={NotFound} />
        <Route exact path="/vehicle/:id" component={Vehicle} />
      </Main>
      <Footer />
    </BrowserRouter>
);

export default App;
