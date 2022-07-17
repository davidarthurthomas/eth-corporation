import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Home from './pages/Home';
import Round from './pages/Round';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={`${process.env.REACT_APP_MORALIS_SERVER_URL}`} appId={`${process.env.REACT_APP_MORALIS_APP_ID}`}>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/round/:round_id' element={<Round />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);
