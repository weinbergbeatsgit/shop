import React, { useState } from 'react';
import minus from '../images/minus.png'
import plus from '../images/plus.png'

const Packages = props => {

    const formatPrice = (price) => {
        let tmpPrice = (price + "").split(".");
        if (tmpPrice[1] === null || tmpPrice[1] === undefined) {
            tmpPrice[1] = "0";
        }
    
        return tmpPrice[0] + "," + tmpPrice[1] + '0';
    }


    const rm = () => {
        if (isNaN(props.packageItem.anzahl) || props.packageItem.anzahl <= 1) {
            props.packageItem.anzahl = NaN;
        } else {
            props.packageItem.anzahl -= 1;
        }

        props.childToParent(props.packageItem, props.index);
    }
    
    const add = () => {
        if (isNaN(props.packageItem.anzahl)) {
            props.packageItem.anzahl = 0;
        }
        props.packageItem.anzahl++; 

        props.childToParent(props.packageItem, props.index);
    }

    return (
        <div className='flex-column margin-bottom-25 product-entry-panel align-center'>
            <h3 className='productName'>{props.packageItem.name}</h3>
            <div className="flex-column gap-5 variant flex-grow justify-space-between" >
                <span className='flex-column gap-10 flex-grow justify-space-between'>
                    <div className="flex-column gap-10 align-center">

                        <img src={process.env.PUBLIC_URL + '/icons/' + props.packageItem.image} className="variant-icon" alt="" />
                        <p>{props.packageItem.description}</p>
                        <div className='flex-column align-center'>
                            <label>{formatPrice(props.packageItem.price)} €</label>
                            {props.index < 2 ? 
                            <label className='pfand'> zzgl. 4,00€ Pfand</label> : ''}
                        </div>
                    </div>
                    <div className="flex-row justify-center gap-10 align-center">

                        <button className="p-button p-component minus plus-minus-button" onClick={() => rm()}>
                            <img src={minus} alt="-" className='plus-minus-icon' />
                        </button>
                        {props.packageItem.anzahl > 0 ? <h4>{props.packageItem.anzahl}</h4> : ''}
                        <button className="p-button p-component minus plus-minus-button" onClick={() => add()}>
                            <img src={plus} alt="+" className='plus-minus-icon' />
                        </button>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default Packages