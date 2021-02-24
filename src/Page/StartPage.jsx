 import React, { useState } from "react";
import SelectCategories from "../components/SelectCategories";
import Header from "../components/Header";
import Posts from "../components/Posts";
import {Container} from "../components/styles/StartPageStyle"
import GetCategories from "../components/GetCategories";

export default function StartPage() {
  const [radio, setRadio] = useState("");

  return (
    <Container>
       <Header/>
     <SelectCategories radio={radio} setRadio={setRadio}/>
      <h3>START PAGE</h3>
      {radio ?  <GetCategories radio={radio} /> : <Posts/> }
    </Container>
  );
}

