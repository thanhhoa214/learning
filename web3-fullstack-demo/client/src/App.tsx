import React, { useRef } from 'react';

import {
  Footer,
  Navbar,
  Services,
  Transactions,
  Welcome
} from './components';
import { WelcomeContextProvider } from './context/WelcomeContext';

function App() {
  const transactionsRef = useRef();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-welcome">
        <Navbar></Navbar>
        <WelcomeContextProvider>
          <Welcome></Welcome>
        </WelcomeContextProvider>
      </div>
      <Services></Services>
      <Transactions></Transactions>
      <Footer></Footer>
    </div>
  );
}

export default App;
