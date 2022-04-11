import React, { useState } from 'react';
import Packages from './packages';
import Contactdata from './contact';
import Payment from './payment';
import Description from './description';
import emailjs from '@emailjs/browser';

const Main = props => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState([0]);
  const [validOrder, setValidOrder] = useState(false);

  const handleChanges = (packageItem, index) => {
    props.packages[index] = packageItem;
    if(props.packages[0].anzahl > 0 || props.packages[1].anzahl > 0 ){
        setValidOrder(true);
    } else{
      setValidOrder(false);
    }
    props.packagesToParent(props.packages, calResult(props.packages));
  }

  const handleContactChanges = (contactData) => {
    props.contactDataToParent(contactData);
    next();
  }

  const calResult = (packageList) => {
    var i = 0;
    packageList.map((thisPackage, index) => {
      if (!isNaN(thisPackage.anzahl)) {
        return i += (thisPackage.anzahl * thisPackage.price);
      }
    })
    setResult(i);
    return i;
  }

  const goHome = () => {
    setStep(0);
    props.stepToParent(0);
  }
  const back = () => {
    setStep(step - 1);
    props.stepToParent(step - 1);
  }

  const next = () => {
    setStep(step + 1);
    props.stepToParent(step + 1);
  }

  const reset = () => {
    props.resetPackages();
    setValidOrder(false);
    back();
  }

  const finishOrder = () => {
    console.log("ghi");
    emailjs.sendForm('wbb', 'wbb_toCustomer', {vorname:"julian",send_to: "jul.geiss@web.de"}, 'QdHbBmPjMMuxD54QB')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

    props.resetPackages();
    next();
  }

  const cancelOrder = () => {
  }

  let includeStep;
  let buttons;
  let stepLabel;

  if (step === 0) {
    stepLabel = "";
    includeStep = <Description />
    buttons =
      <button className="p-button p-component minus" onClick={() => next()}>
        Los gehts
      </button>
  } else if (step === 1) {
    stepLabel = "Wähle mindestend ein Paket und deine gewünschte Menge an Gläsern dazu"
    includeStep =
      props.packages.map((thisPackage, index) => {
        return (
          <Packages packageItem={thisPackage} childToParent={handleChanges} />
        )
      })

    buttons = <div className="flex-row justify-space-between flex-grow">
      <button className="p-button p-component back-button" onClick={() => reset()}>
        Abbrechen
      </button>

      <button className="p-button p-component minus" onClick={() => next()} disabled={!validOrder} title={!validOrder ? 'Bitte wähle mind. ein Paket' : ''}>
        Weiter
      </button></div>
  } else if (step === 2) {
    stepLabel = "Gib uns deine Kontaktdaten"

    includeStep = <Contactdata childToParent={handleContactChanges} back={back} contactInfos={props.contactInfos}/>

    buttons = "";
  } else if (step === 3) {
    stepLabel = "Wähle deine Zahlunsgart und schließe deine Bestellung ab"

    includeStep = <Payment price={result} finishOrder={finishOrder} cancelOrder={cancelOrder} />

    buttons = <div className="flex-row justify-space-between flex-grow">
      <button className="p-button p-component back-button" onClick={() => back()}>
        Zurück
      </button>
    </div>
  } else if (step === 4) {
    stepLabel = "Viel Dank für deine Bestellung. Du bekommst nun eine Bestätigungsmail von uns mit allen weiteren Infos"

    includeStep = <div />

    buttons = <div className="flex-row justify-space-between flex-grow">
      <button className="p-button p-component minus" onClick={() => goHome()}>
        Zurück zu Startseite
      </button>
    </div>
  } else {
    stepLabel = "Leider ist etwas schief gelaufen. Bitte versuche es erneut oder melde dich bei uns unter info@bro-events.de."

    includeStep = <div />

    buttons = <div className="flex-row justify-space-between flex-grow">
      <button className="p-button p-component minus" onClick={() => goHome()}>
        Zurück zu Startseite
      </button>
    </div>
  }

  return (
    <div className="main-content flex-column gap-40">

      <label className="header_label1">{stepLabel}</label>

      <div className="flex-row gap-30 flex-wrap flex-grow justify-space-around">
        {includeStep}
      </div>

      <div className='flex-row justify-end flex-grow'>
        {buttons}
      </div>
    </div>
  )
}

export default Main