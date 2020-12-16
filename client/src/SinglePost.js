import React, {useState, useEffect} from 'react';
import Nav from './Nav';


const SinglePost = (props) => {
    
  const [post, setPost] = useState('');
  console.log(props)
  console.log(props.match.params.slug)

  async function fetchPost() {
    const response = await fetch(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`);
    const result = await response.json();
    console.log(result) // This is the json array of objects that is returned from posts.
    setPost(result);
  }

  // Everytime component mounts, useEffect hook will run.
  useEffect(() => {
    fetchPost();
  }, [])


    return (
    <div className="container pb-5">
        <Nav></Nav>
        <br></br>
        <h1>Hello</h1>
        <hr/>
        <br/>
        <div className="row" key={post._id} style={{borderBottom: '1px solid silver'}}>
              <div className="col pt-3 pb-2">
                
                  <h2>{post.title}</h2>
                
                <p className="lead">{post.content}</p>
                <p>Author <span className="badge">{post.user}</span> Published on <span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
              </div>
            </div>
    </div>
    )
}

export default SinglePost;