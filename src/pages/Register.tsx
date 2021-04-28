import React, {SyntheticEvent, useState } from 'react';
import {Redirect} from 'react-router-dom';
import constant from './../utils/constant';

const Register = () => {

    const [name, setName]                       = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [confirmPasword, setConfirmPassword]  = useState('');
    const [redirect, setRedirect]               = useState(false);
    const [errorName, setErrorName]             = useState('');
    const [errorEmail, setErrorEmail]           = useState('');
    const [errorPassword, setErrorPassword]     = useState('');
    const [errorPasswordConfirm, setErrorPasswordConfirm]     = useState('');
    const [isFormError, setIsFormError]         = useState(false);

    const handleValidation = () => {
        if(!name) {
            setIsFormError(true);
            setErrorName('harus di isi');
        }
        if(!email) {
            setIsFormError(true);
            setErrorEmail('harus di isi');
        }
        if(!password) {
            setIsFormError(true);
            setErrorPassword('harus di isi');
        }
        if(!confirmPasword) {
            setIsFormError(true);
            setErrorPasswordConfirm('harus di isi');
        }

        return isFormError;
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if(handleValidation()) {
            alert('validasi gagal');
        } else {
            
            const response = await fetch(constant.url + 'auth/register', {
                method: 'POST',
                headers: constant.headers,
                body: JSON.stringify({
                    name, 
                    email, 
                    password, 
                    passwordConfirmation: confirmPasword
                })
            });

            const content = await response.json();
            
            if(content.code === 201) {
                setRedirect(true);
            }
        }
        
    }
    if(redirect) {
        return <Redirect to="/login"/>
     }

    return(
        <div>
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>
            
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="Fullname" onChange={e => {
                    setErrorName('');
                    setName(e.target.value);
                }
                    }/>
                <span style={{color: "red"}}><p>{errorName}</p></span>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com" onChange={e => {
                    setErrorEmail('');
                    setEmail(e.target.value);
                }} />
                <span style={{color: "red"}}><p>{errorEmail}</p></span>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" onChange={e =>{
                    setErrorPassword('');
                    setPassword(e.target.value);
                }}/>
                <span style={{color: "red"}}><p>{errorPassword}</p></span>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password Confirmation" onChange={e => {
                    setErrorPasswordConfirm('');
                    setConfirmPassword(e.target.value);
                }}/>
                <span style={{color: "red"}}><p>{errorPasswordConfirm}</p></span>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Register;