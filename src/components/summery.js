import React, { useState } from 'react';
import CartItem from './cartItem';

const Summery = (props) => {

    const formatPrice = (price) => {
        let tmpPrice = (price + "").split(".");
        if (tmpPrice[1] === null || tmpPrice[1] === undefined) {
            tmpPrice[1] = "0";
        }

        return tmpPrice[0] + "," + tmpPrice[1] + '0';
    }



    let anzahl = 0;

    props.cart.map((thisCart, index) => {
        if (index < 2 && thisCart.anzahl > 0) {
            anzahl += thisCart.anzahl;
        }
        return 0;
    });


    return (
        <div className="summery">
            <div className='cartContent'>
                <label className='header_label3'>Bestellzusammenfassung</label>
                <div className="flex-row gap-40 margin-left-10 margin-top-10 justify-space-between">
                    <div className='flex-grow justify-space-around flex-column'>
                        <div>
                        {props.cart.map((thisCart, index) => {
                            if (!isNaN(thisCart.anzahl)) {
                                return (
                                    <CartItem cartItem={thisCart} result={props.result} />
                                )
                            }
                        }
                        )
                        }

                        <div className="flex-row justify-space-between cart-item margin-top-10">
                                <label className="text-overflow-ellipsis flex-grow">Pfand</label>
                                <label> {anzahl}  x <label className="price-label">{formatPrice(4)}</label> €</label>
                            </div>
                        </div>
                        <div className="flex-row justify-space-between cart-item margin-top-10">
                                <label className="text-overflow-ellipsis flex-grow">Überraschung</label>
                                <label> 1  x <label className="price-label">0,00</label> €</label>
                            </div>

                        <div>
                            <hr className='width-100' />
                            <div className="flex-row justify-space-between cart-item">
                                <label className="text-overflow-ellipsis flex-grow">Gesamt</label>
                                <label className="price-label">{formatPrice(props.result)} €</label>
                            </div>
                        </div>
                    </div>

                    <div className='flex-column gap-10 flex-grow'>

                        <div className='flex-column contact cart-item'>
                            <div className='flex-row gap-5'><label>{props.contacts.vorname}</label> <label>{props.contacts.name}</label></div>
                            <div className='flex-row gap-5'><label>{props.contacts.strasse}</label> <label>{props.contacts.hnr}</label></div>
                            <div className='flex-row gap-5'><label>{props.contacts.plz}</label> <label>{props.contacts.ort}</label></div>
                            <div className='flex-row gap-5'><label>{props.contacts.email}</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summery