import React from 'react'
import UpdatePost from '../components/UpdatePost'

export default function UpdatePostPage(props) {
  const id = props.match.params.id;
  return (
    <div>
      <UpdatePost id={id}/>
    </div>
  )
}
