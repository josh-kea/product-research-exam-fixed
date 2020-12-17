import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import axios from 'axios';
import {getUser, getToken} from './helpers.js'


const UpdatePost = (props) => {
  const [state, setState] = useState({
      title:'',
      content: '',
      slug:'',
      user: ''
  })

  const title = state.title;
  const content = state.content;
  const slug = state.slug;
  const user = state.user;

  async function fetchPost() {
    const response = await fetch(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`);
    const result = await response.json();
    // console.log(result) // This is the json array of objects that is returned from posts.
    // setPost(result);
    setState({...state, title: result.title, content: result.content, slug: result.slug, user: result.user })
  }

  // Everytime component mounts, useEffect hook will run.
  useEffect(() => {
    fetchPost();
  }, [])


  // Handle form change
  function handleChange(name) {
    return function(event) {
      setState({ ...state, [name]: event.target.value })
    };
  };

    // Handle form submit
  const handleSubmit = event => {
    event.preventDefault();
   //  console.table({ title, content, user })

    axios.put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user }, {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })
    .then(response => {
      console.log(response)

      const {title, content, slug, user} = response.data
      // empty the state
      setState({ ...state, title: title, content: content, slug: slug, user: user})
      // show success alert
      alert(`Post titled ${title} is updated.`)
    })
    .catch(error => {
      console.log(error.response)
      alert(error.response.data.error)
    })
  }


    const showUpdateForm = () => {
        return (
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
         <button className="btn btn-primary">Update</button>
      </form>
        )
    }


    return (
    <div className="container pb-5">
        <Nav></Nav>
        <br></br>
        <h1>Hello</h1>
        <hr/>
        <br/>
        <h2>Update Post</h2>
        {showUpdateForm()}
    </div>
    )
}

export default UpdatePost;