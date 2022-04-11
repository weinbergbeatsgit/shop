import React, { useState } from 'react';
import user from '../images/user.png'

const Contactdata = props => {
    const [vorname, setVorname] = useState(props.contactInfos !== undefined ? props.contactInfos.vorname : '');
    const [name, setName] = useState(props.contactInfos !== undefined ? props.contactInfos.name : '');
    const [strasse, setStrasse] = useState(props.contactInfos !== undefined ? props.contactInfos.strasse : '');
    const [hnr, setHnr] = useState(props.contactInfos !== undefined ? props.contactInfos.hnr : '');
    const [plz, setPlz] = useState(props.contactInfos !== undefined ? props.contactInfos.plz : '');
    const [ort, setOrt] = useState(props.contactInfos !== undefined ? props.contactInfos.ort : '');
    const [email, setEmail] = useState(props.contactInfos !== undefined ? props.contactInfos.email : '');




    const handleSubmit = async (e) => {
        e.preventDefault();

        const { vorname, name, strasse, hnr, plz, ort, email } = e.target.elements;
        let contactInfos = {
            vorname: vorname.value,
            name: name.value,
            strasse: strasse.value,
            hnr: hnr.value,
            plz: plz.value,
            ort: ort.value,
            email: email.value
        };
        childToParent(contactInfos);
    };

    const childToParent = (details) => {
        props.childToParent(details);
    }

    return (

        <form onSubmit={handleSubmit} className="flex-column gap-20 flex-grow align-center">
            <div className='flex-row gap-40 align-center'>
                <div className='tablet-hide'>
                    <img src={user} className="user-icon" alt="user" />
                </div>
                <div className='flex-row contact gap-30'>

                    <div className='flex-column gap-10'>
                        <div className='contact-item justify-space-between'>
                            <label>Vorname</label>
                            <input
                                placeholder='Vorname'
                                name="vorname"
                                className='flex-grow'
                                required={true}
                                onChange={(e) => setVorname(e.target.value)}
                                value={vorname} />
                        </div>
                        <div className='contact-item justify-space-between'>
                            <label>Nachname</label>
                            <input
                                placeholder='Nachname'
                                name="name"
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                                value={name} />
                        </div>
                        <div className='flex-row gap-10'>
                            <div className='contact-item justify-space-between'>
                                <label>Sraße, Hausnummer</label>
                                <input
                                    placeholder='Straße'
                                    name="strasse"
                                    required={true}
                                    onChange={(e) => setStrasse(e.target.value)}
                                    value={strasse} />
                            </div>
                            <div className='contact-item justify-space-between'>
                              <p></p>
                                <input
                                    placeholder='Hnr'
                                    size={5}
                                    maxLength={5}
                                    name="hnr"
                                    required={true}
                                    onChange={(e) => setHnr(e.target.value)}
                                    value={hnr} />
                            </div>

                        </div>
                        <div className='flex-row gap-10'>
                            <div className='contact-item justify-space-between'>
                                <label>PLZ, Ort</label>
                                <input
                                    placeholder='PLZ'
                                    size={5}
                                    maxLength={5}
                                    name="plz"
                                    required={true}
                                    onChange={(e) => setPlz(e.target.value)}
                                    value={plz} />
                            </div>
                            <div className='contact-item justify-space-between'>
                            <p></p>
                                <input
                                    placeholder='Ort'
                                    name="ort"
                                    required={true}
                                    onChange={(e) => setOrt(e.target.value)}
                                    value={ort} />
                            </div>

                        </div>
                        <div className='contact-item justify-space-between'>
                            <label>Email</label>
                            <input placeholder='Email'
                                name="email"
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex-row justify-space-between width-100 margin-top-20">
                <button className="p-button p-component back-button" onClick={props.back}>
                    Zurück
                </button>

                <button className="p-button p-component minus" type="submit">
                    Weiter
                </button></div>
        </form>


    )
}

export default Contactdata