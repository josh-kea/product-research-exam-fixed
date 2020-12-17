import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Nav from './Nav'
import {authenticate, getUser } from './helpers.js';


const Login = (props) => {
    // create a state
    const [state, setState] = useState( {
        name: '',
        password: ''
    })

    const{name,password} = state // destructuring values from state

    useEffect(() => {
        getUser() && props.history.push('/')
    }, [])

    function handleChange(name) {
        return function(event) {
          setState({ ...state, [name]: event.target.value })
        };
    };
    
      const handleSubmit = event => {
        event.preventDefault();
        console.table({ name, password })
    
        axios.post(`${process.env.REACT_APP_API}/login`, { name, password })
        .then(response => {
            // console.log(response)
            // response contains token
            // redirect to create page
            authenticate(response, () => {  props.history.push('/create') })

        })
        .catch(error => {
          console.log(error.response)
          alert(error.response.data.error)
        })
    }

    return (
        <div className="container pb-5">

            <Nav></Nav>
            <br/>
            <h1>Login</h1>
            <br/>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Enter your name" required/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input value={password} onChange={handleChange('password')} type="text" className="form-control" placeholder="Enter your password" required/>
                </div>
                <button className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}

export default withRouter(Login);



