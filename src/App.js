import './App.css';
import React, { useState } from 'react';
import Header from './components/header';
import Main from './components/main';
import Cart from './components/cart';
import PACKAGELIST from './json/sets.json';
import cloneDeep from 'lodash/cloneDeep';

function App() {

  const [packages, setPackages] = useState(cloneDeep(PACKAGELIST));
  const [contacts, setContacts] = useState(undefined);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(0);

  const updatePackages = (packageList, tmpResult) => {
    setPackages(packageList);
    setResult(tmpResult);
  }

  const reset = () => {
    setPackages(cloneDeep(PACKAGELIST));
    setContacts(undefined);
    setResult(0);
  }

  return (
    <div className='flex-row'>
      <div className='flex-column align-center flex-grow'>
        <Header />

        <Main
          stepToParent={setStep}
          packagesToParent={updatePackages}
          resetPackages={reset}
          packages={packages}
          contactInfos={contacts}
          contactDataToParent={setContacts} />

          
          <div class="flex-row gap-30 footer">
            <a href="https://www.weinberg-beats.de/impressum.html">Impressum</a>
            <a href="https://www.weinberg-beats.de/dsgvo.html">DSGVO</a>
          </div>
      </div>
      {step > 0 && step < 4 ?
        <Cart
          cart={packages}
          result={result}
          contacts={contacts} /> : ''}
    </div>
  );
}

export default App;
