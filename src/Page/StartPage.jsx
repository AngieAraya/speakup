 import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import {Container} from "../components/styles/StartPageStyle"
// import { useHistory } from "react-router-dom";
// import { firestore } from "../firebase";
// import { Link } from "react-router-dom";

export default function StartPage() {
  // const history = useHistory();
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // // .collection("posts")
  // // .doc(currentUser.uid.toString())
  // // .collection("userPosts").doc(autoID)

  // const getPosts = () => {
  //   setLoading(true);
  //   // firestore.collection("posts").doc("IqmEAgmuwqPZeluYETfYY25t7gm1").collection("userPosts").onSnapshot((querySnapshot) => {
  //   firestore.collection("posts").onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setPosts(items);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <Container>
      <Header/>
      <h3>START PAGE</h3>
      <Posts/>
      {/* {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <h3>{post.description}</h3>
          <p>{post.text}</p>
          <Link to={`/detail/${post.id}`}>Go to detail page</Link>
        </div>
      ))} */}
    </Container>
  );
}
