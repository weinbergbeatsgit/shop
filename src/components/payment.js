import React, { useState } from 'react';
import Paypal from './PayPal';


const Payment = (props) => {


    const [checkout, setCheckOut] = useState();

const toggleCheckout = () => {
  setCheckOut(!checkout);
}

    return (
      <div className="flex-column gap-30">
     
    <div className='flex-row gap-10 align-center'>
            <input id="agb" type='checkbox' required={true}   
            onClick={toggleCheckout}/>
            <label for="agb" id="agb-label">	Ich habe die <a href="https://www.weinberg-beats.de/agb.html">allgemeinen GeschĂ¤ftsbedingungen</a>  gelesen und akzeptiere diese.</label>
            </div>
            <div className="paypal">
            <Paypal price={props.price} finishOrder={props.finishOrder} cancelOrder={props.cancelOrder} disable={!checkout}/>
         
           </div>
  
      </div>
    )
}

export default Payment