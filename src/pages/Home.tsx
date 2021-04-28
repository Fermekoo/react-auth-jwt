import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import constant from './../utils/constant';

const Home = (props: {name: string}) => {
    
    
    if(!localStorage.getItem('token')){
        return <Redirect to="/login"/>
    }

    return (
        <div>
        Hi {props.name}
        </div>
    );
}

export default Home;