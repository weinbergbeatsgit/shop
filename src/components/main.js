import React, { useState } from 'react';
import Packages from './packages';
import Contactdata from './contact';
import Summery from './summery';
import Payment from './payment';
import Description from './description';
import emailjs from '@emailjs/browser';
import team from '../images/team.jpeg'

const Main = props => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState([0]);
  const [validOrder, setValidOrder] = useState(false);

  const handleChanges = (packageItem, index) => {
    props.packages[index] = packageItem;
    if (props.packages[0].anzahl > 0 || props.packages[1].anzahl > 0) {
      setValidOrder(true);
    } else {
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
        if (index < 2) {
          return i += (thisPackage.anzahl * thisPackage.price) + thisPackage.anzahl * 4;
        }
        return i += (thisPackage.anzahl * thisPackage.price);
      }
    })
    setResult(i);
    return i;
  }

  const goHome = () => {
    setStep(0);
    props.stepToParent(0);
    props.resetPackages();
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

    var templateParams = {
      vorname: props.contactInfos.vorname,
      name:props.contactInfos.name,
      strasse:props.contactInfos.strasse,
      hnr:props.contactInfos.hnr,
      plz:props.contactInfos.plz,
      ort:props.contactInfos.ort,
      email:props.contactInfos.email,
      send_to: props.contactInfos.email,
      weinpakete:props.packages[0].anzahl > 0 ? props.packages[0].anzahl + " Weinpaket(e)" : '',
      sektpakete:props.packages[1].anzahl > 0 ? props.packages[1].anzahl + " Sektpaket(e)" : '',
      glaeser:props.packages[2].anzahl > 0 ? props.packages[2].anzahl + " Gläser" : ''
    };


    emailjs.send('wbb', 'wbb_toCustomer', templateParams, 'QdHbBmPjMMuxD54QB')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });
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
    stepLabel = "Wähle mindestens ein Paket und deine gewünschte Menge an Gläsern dazu"
    includeStep =
      props.packages.map((thisPackage, index) => {
        return (
          <Packages packageItem={thisPackage} childToParent={handleChanges} index={index} />
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

    includeStep = <Contactdata childToParent={handleContactChanges} back={back} contactInfos={props.contactInfos} />

    buttons = "";
  } else if (step === 3) {
    stepLabel = "Wähle deine Zahlunsgart und schließe deine Bestellung ab"

    includeStep = <div>
      <Summery contacts={props.contactInfos} cart={props.packages} result={result} />
      <Payment price={result} finishOrder={finishOrder} cancelOrder={cancelOrder} />
    </div>

    buttons = <div className="flex-row justify-space-between flex-grow">
      <button className="p-button p-component back-button" onClick={() => back()}>
        Zurück
      </button>
    </div>
  } else if (step === 4) {
    stepLabel = "Vielen Dank für deine Bestellung. Du bekommst nun eine Bestätigungsmail von uns mit allen weiteren Infos."

    includeStep = <div>
      <img src={team} className='team-img'/>
    </div>

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