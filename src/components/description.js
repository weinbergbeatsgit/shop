import FAQ from '../json/faq.json';
import FaqItem from './faqItem';
import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';


const Description = () => {

    const [faq, setFaq] = useState(cloneDeep(FAQ));

    return (
        <div className='description'>
            <div className="flex-column text-center margin-top-20 gap-10 align-center">
            <label className="header_label1">Herzlich Willkommen bei unserem VVK</label>
            <span>
            Ihr könnt den Startschuss von Weinberg-Beats am Sonnenberg kaum noch erwarten? <br/>
            Sichert euch schon im Voraus euer Wein- oder Seccopaket samt attraktivem Online-Rabatt. 
            </span>

            <div className='faqPanel flex-column gap-10'>
                {faq.map((thisFaq, index) => {
                    return (
                        <FaqItem question={thisFaq.question} answer={thisFaq.answer} />
                    )
                    }
                    )
                }
            </div>

            </div>
        </div>
    )
}

export default Description