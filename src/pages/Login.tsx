import React, {SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';
import constant from './../utils/constant';

const Login = () => {

    const [email, setEmail]                 = useState('');
    const [password, setPassword]           = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail]       = useState('');
    const [isFormError, setIsFormError]     = useState(false);
    const [redirect, setRedirect]           = useState(false);

   
    const handleValidation = () => {
        if(!email){
            setIsFormError(true);
            setErrorEmail('harus di isi');
        }
        if(!password){
            setIsFormError(true);
            setErrorPassword('harus di isi');
        }

        return isFormError;

    }
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if(handleValidation()){
            alert('validasi gagal');
        } else {
            const response = await fetch(constant.url+'auth/login', {
                method:'POST',
                headers:constant.headers,
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const content = await response.json();

            if(content.status){
                localStorage.setItem('token', content.accessToken);
                setRedirect(true);
            } else {
                alert(content.message);
                return;
            }
        }
        
    }

    if(redirect){
        return <Redirect to="/"/>
    }
    return (
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;