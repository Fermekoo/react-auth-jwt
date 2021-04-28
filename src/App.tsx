import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Login from './pages/Login';
import Nav from './components/Nav';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import constant from './utils/constant';


function App() {
  const [name, setName]       = useState('');
  const[isLogin, setIsLogin]  = useState(true);

    useEffect(() => {
        (
        async () => {

            let headerReq = constant.headers;
            headerReq.Authorization = 'Bearer '+localStorage.getItem('token');
            console.log(headerReq);
            const response = await fetch(constant.url + 'user/profile', {
                method: "GET",
                headers: headerReq
            });

            const content = await response.json();
            if(content.code === 401){
                localStorage.removeItem('token');
            } else {
                setName(content.results.name);
            }

            
        }   
        )()
    });

  return (
    <div className="App">
      <BrowserRouter>
      <Nav isLogin={isLogin}/>
        <main className="form-signin">
              <Route path="/" exact component={ () => <Home name={name}/>}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
