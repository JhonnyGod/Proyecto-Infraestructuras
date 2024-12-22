import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/login';
import Home from './pages/Homepage/home';
import Recover from '../src/pages/PasswordForgot/recover';
import Register from '../src/pages/Register/register';
import Settings from '../src/pages/Settings/settings';
import ResultsPage from './pages/Search/search';
import HomeEdition from './pages/Homepage/homeedition';
import About from './pages/Homepage/about';
import Service from './pages/Homepage/service';
import Aboutyou from './components/Profile/aboutyou';
import History from './pages/History/history';
import Devolutions from './components/Settings-pages/devolutions-page/devolutions';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/searchresults" element={<ResultsPage />} />
          
          <Route path="/homeedition" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/aboutyou" element={<Aboutyou/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/devolutions" element={<Devolutions/>}/>

        </Routes>
    </Router>
  );
};

export default App;
