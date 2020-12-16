import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import {Link} from 'react-router-dom'

const App = () => {
  // const [posts, setPosts] = useState([])

  const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     (async function fetchPosts() {
    //         const response = await fetch(`${process.env.REACT_APP_API}/posts`);
    //         const result = await response.json();
    //         setPosts(result?.posts);
    //     })();
    // }, []);

  // Fetch posts and store them in state
  /* 
    const fetchPosts = () => {
      axios.get(`${process.env.REACT_APP_API}/posts`)
      .then(response => {
        console.log(response)
        setPosts(response.data)
      })
      .catch(error => alert ('Error facing posts.'))
    };

    */

    async function fetchPosts() {
      const response = await fetch(`${process.env.REACT_APP_API}/posts`);
      const result = await response.json();
      console.log(result) // This is the json array of objects that is returned from posts.
      setPosts(result);
    }

    // Everytime component mounts, useEffect hook will run.
    useEffect(() => {
      fetchPosts();
    }, [])

  return (
    <div className="container pb-5">
      <Nav></Nav>
      <br></br>
      <h1>Hello</h1>
      <hr/>
      <br/>


      {
        posts.map((post, i) => {
          return (
            <div className="row" key={post._id} style={{borderBottom: '1px solid silver'}}>
              <div className="col pt-3 pb-2">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p className="lead">{post.content.substring(0, 100)}</p>
                <p>Author <span className="badge">{post.user}</span> Published on <span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
              </div>
            </div>
          )
        })
      }



      {/* {JSON.stringify(posts)} */}
    </div>
  );
}

export default App;
