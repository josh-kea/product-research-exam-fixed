import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav'

const Login = () => {
    // create a state
    const [state, setState] = useState( {
        name: '',
        password: ''
    })

    const{name,password} = state // destructuring values from state

    function handleChange(name) {
        return function(event) {
          setState({ ...state, [name]: event.target.value })
        };
    };
    
      const handleSubmit = event => {
        event.preventDefault();
       //  console.table({ title, content, user })
    
        // axios.post(`${process.env.REACT_APP_API}/post`, { title, content, user })
        // .then(response => {
        //   console.log(response)
        //   // empty the state
        //   setState({ ...state, title:'', content:'', user: ''})
        //   // show success alert
        //   alert(`Post titled ${response.data.title} is created.`)
        // })
        // .catch(error => {
        //   console.log(error.response)
        //   alert(error.response.data.error)
        // })
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
                <button className="btn btn-primary">Create</button>
        </form>
        </div>
    )
}

export default Login;



