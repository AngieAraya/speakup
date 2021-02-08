import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../firebase'

export default function StartPage() {
  const history = useHistory()
  const [post, setPost ] = useState([])
  const [loading, setLoading ] = useState(false)

  const ref = firebase.firestore().collection("posts")

  const getPosts = () => {
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setPost(items)
      setLoading(false)
    })
  }

  useEffect(() => {
    getPosts()
  
  }, [])

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h3>START PAGE</h3>
      {/* <button onClick={()=> history.push("/login")} > Log IN</button> */}
      {post.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <h3>{post.description}</h3>
          <p>{post.text}</p>
        </div>
      ))}
      
    </div>
  )
}
