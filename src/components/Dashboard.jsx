import React, { useEffect, useState } from "react";
import {
  Postwrapper,
  PostContainer,
  Button,
  Buttonwraper,
  UpdateLink,
  ButtonAdd,
} from "../components/styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "../firebase";
import DeletePost from "./DeletePost";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, deleteUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const history = useHistory();

  // console.log("nåt nt", posts);

  const getPosts = () => {
    firestore
      .collection("posts")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          // items.push(doc.data());
          // items.push(doc.id)
          items.push({ collectionId: doc.id, value: doc.data() });
          // console.log("document id", doc.id);
        });
        setPosts(items);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  //OBS! funkar denna bätrre ?
  // const getPosts = () => {
  //   setLoading(true)
  //   firestore.collection("posts").doc(currentUser.uid.toString()).collection("userPosts").onSnapshot((querySnapshot) => {
  //     const items = []
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data())
  //     })
  //     console.log("doc", items)
  //     setPosts(items)
  //     setLoading(false)
  //   })
  // }
  useEffect(() => {
    getPosts();
  }, [deleted]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleDelete = () => {
    console.log("delete"); 
    deleteUser()
  }

  // const updateData = (id) => {
  //   console.log("id 2", id);
  //   firestore.collection("posts").doc(id).update({
  //       title: "uppd",
  //     })
  //     .then(() => {
  //       console.log("Document successfully updated!");
  //     })
  //     .catch((error) => {
  //       // The document probably doesn't exist.
  //       console.error("Error updating document: ", error);
  //     });
  // };

  // const handleUpdate = (id) => {
  //   // console.log("handle updte", id);
  //   firestore
  //     .collection("posts")
  //     .doc(id)
  //     .update({
  //       title: " Girl",
  //     })
  //     .then(() => {
  //       console.log("Document successfully updated!");
  //     })
  //     .catch((error) => {
  //       // The document probably doesn't exist.
  //       console.error("Error updating document: ", error);
  //     });
  // };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <button onClick={() => handleDelete()}>Delete Account</button>
      <UpdateLink to="/update-profile">Update Profile</UpdateLink>
         <ButtonAdd onClick={() => history.push("/create-post")}>
              skapa inlägg
            </ButtonAdd>
      {posts && posts.map((post) => (
        <PostContainer key={post.collectionId}>
          <Postwrapper>
            <h2>{post.value.title}</h2>
            <h5>{post.value.description}</h5>
            <p>{post.value.text.substring(0, 300) + `...`}</p>
            <p>{post.collectionId}</p>
            <Link to={`/detail/${post.collectionId}`}>Gå vidare till sidan</Link>
          </Postwrapper>
          <Buttonwraper>
            {/* <Button onClick={() => handleUpdate(post.collectionId)}>
              Uppdatera
            </Button> */}
             <UpdateLink to={`/update-post/${post.collectionId}`}>Modifiera</UpdateLink>
            <DeletePost id={post.collectionId} setDeleted={setDeleted} />
          </Buttonwraper>
        </PostContainer>
      ))}
    </div>
  );
}
