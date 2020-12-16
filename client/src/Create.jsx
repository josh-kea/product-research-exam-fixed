import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav'


const Create = () => {
  const [state, setState] = useState({
    // state
    title: '',
    content: '',
    user: ''
  })
  // destructure
  const {title, content, user} = state
  // onchange event handler
  // const handleChange = (name) => (event) => {
  //   console.log('name', name, 'event', event)
    
  //   setState({...state, [name]: event.target.value })
  // }

  function handleChange(name) {
    return function(event) {
      setState({ ...state, [name]: event.target.value })
    };
  };

  const handleSubmit = event => {
    event.preventDefault();
   //  console.table({ title, content, user })

    axios.post(`${process.env.REACT_APP_API}/post`, { title, content, user })
    .then(response => {
      console.log(response)
      // empty the state
      setState({ ...state, title:'', content:'', user: ''})
      // show success alert
      alert(`Post titled ${response.data.title} is created.`)
    })
    .catch(error => {
      console.log(error.response)
      alert(error.response.data.error)
    })
  }

  return (
    <div className="container pb-5">

      <Nav></Nav>
      <br></br>
      <h1>Create Post</h1>
      <br></br>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={handleSubmit}>
         <div className="form-group">
             <label className="text-muted">Title</label>
             <input value={title} onChange={handleChange('title')} type="text" className="form-control" placeholder="Post title" required/>
         </div>
         <div className="form-group">
             <label className="text-muted">Content</label>
             <textarea value={content} onChange={handleChange('content')} type="text" className="form-control" placeholder="Write something..." required/>
         </div>
         <div className="form-group">
             <label className="text-muted">User</label>
             <input value={user} onChange={handleChange('user')} type="text" className="form-control" placeholder="Enter your username" required/>
         </div>
         <button className="btn btn-primary">Create</button>
      </form>
    </div>
  )
};

export default Create;
