import React from 'react'
import { firestore } from '../../firebase';

export default function CategoryItem({category, id}) {
  
  const handleDeleteCategory = () => {
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
      <button onClick={() => handleDeleteCategory()}>radera</button> 
    </>
  )
}
