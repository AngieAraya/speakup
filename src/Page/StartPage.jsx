import React, { useEffect, useState } from "react";
import SelectCategories from "../components/SelectCategories";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { Container } from "../components/styles/StartPageStyle";
import GetCategories from "../components/GetCategories";
import { firestore } from "../firebase";

export default function StartPage() {
  const [radio, setRadio] = useState("");
  const [posts, setPosts] = useState([]);
 

  // if(radio){
  //   console.log("radio var klickad")
  // }
  // else(
  //   console.log("alla post körs nu")
  // )
  return (
    <Container>
      <Header />
      <SelectCategories setPosts={setPosts} radio={radio} setRadio={setRadio} />
      <h3>START PAGE</h3>
      {radio ? <GetCategories radio={radio} posts={posts} /> : <Posts />}
      {radio == "Alla" && <Posts />}
    </Container>
  );
}
