import React, { useState } from 'react'
import { firestore } from '../firebase';

export default function CreateCategory() {
  const [createCategory, setCreateCategory] = useState("")

  const handleCreateCategory = (e) =>{
    e.preventDefault();
    saveCategoryToDB()
  }
  
  const saveCategoryToDB = async () => {
    const db = await firestore;
    return db
      .collection("category")
      .add({
        category: createCategory,
        date: new Date(),
      })
      .then((doc) => {
        db.collection("category").doc(doc.id).update({
          docId: doc.id,
        });
        setCreateCategory("")
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };




  return (
    <div>
          <form onSubmit={handleCreateCategory}>
        <input type="text"        
              value={createCategory}
              onChange={(e) => setCreateCategory(e.target.value)}
              required
              placeholder="skapa ny kategori" />
              <button type="submit">Skapa</button>
        </form>
      
    </div>
  )
}
