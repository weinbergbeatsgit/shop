import React, { useState } from 'react';
import CartItem from './cartItem';


const Cart = props => {

    const formatPrice = (price) => {
        let tmpPrice = (price + "").split(".");
        if (tmpPrice[1] === null || tmpPrice[1] === undefined) {
            tmpPrice[1] = "0";
        }

        return tmpPrice[0] + "," + tmpPrice[1] + '0';
    }


    return (
        <div className="cart">
            <div className='cartContent'>
                <label className='header_label3'>Bestellzusammenfassung</label>
                <div className="flex-column gap-10 margin-left-10 margin-top-10">
                    {props.cart.map((thisCart, index) => {
                        if (!isNaN(thisCart.anzahl)) {
                            return (

                                <CartItem cartItem={thisCart} result={props.result} />
                            )
                        }
                    }
                    )
                    }

                    {props.result > 0 ?
                    <div>
                    <hr className='width-100' />
                    <div className="flex-row justify-space-between cart-item">
                        <label className="text-overflow-ellipsis flex-grow">Gesamt</label>
                        <label className="price-label">{formatPrice(props.result)} €</label>
                    </div>
                    </div> : ""}


                    <div className='mobi-hide'>
                        {props.contacts !== undefined ?
                            <div className='flex-column gap-10'>
                                <label className='header_label3'>Kontaktdaten</label>
                                <div className='flex-column contact cart-item'>
                                        <div className='flex-row gap-5'><label>{props.contacts.vorname}</label> <label>{props.contacts.name}</label></div>
                                        <div className='flex-row gap-5'><label>{props.contacts.strasse}</label> <label>{props.contacts.hnr}</label></div>
                                        <div className='flex-row gap-5'><label>{props.contacts.plz}</label> <label>{props.contacts.ort}</label></div>
                                        <div className='flex-row gap-5'><label>{props.contacts.email}</label></div>
                                </div> 
                            </div> : <div />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart