import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

export default function DetailPostPage(props) {
  const id = props.match.params.id;
  const [postDetail, setPostDetail] = useState(null);
  console.log("post detail", postDetail);

  const getPost = () => {
      firestore.collection("posts").doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPostDetail(doc.data())
      } else {
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  //   console.log("detail ID TEST", id);
  //   firestore
  //     .collection("posts").where("id", "==", id)
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log(querySnapshot.data());
  //       // const items = [];
  //       // querySnapshot.forEach((doc) => {
  //       //   console.log("doc", doc.data());
  //       // //   items.push(doc.data());
  //       // });
  //       // // console.log(items);
  //       // setPostDetail(items);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents DASHBOARD: ", error);
  //     });
  // }


  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      detail
      {postDetail &&
          <div key={id}>
            <h2>{postDetail.title}</h2>
            <h3>{postDetail.description}</h3>
            <p>{postDetail.text}</p>
            {/* <p>{postDetail.date.seconds}</p> */}
          </div>
       }
    </div>
  );
}
