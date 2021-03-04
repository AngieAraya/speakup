import React from 'react'
import { firestore } from '../firebase';


export default function Category({category, id}) {
  const handleDelete = () => {
    console.log(id);
    firestore
      .collection("categories")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <li>{category.category}</li>  
      <button onClick={() => handleDelete()}>radera</button> 
    </>
  )
}
