import React, { useEffect, useState } from "react";
import SelectCategories from "../components/start/SelectCategories";
import Header from "../components/start/Header";
import PostList from "../components/start/PostList";
import { Container } from "../components/styles/StartPageStyle";
import GetCategories from "../components/start/GetCategories";
import { useCategory } from "../contexts/CategoryContext";

export default function StartPage() {
  const { selectedCategory } = useCategory();

  return (
    <Container>
      <Header />
      <SelectCategories/>
      {selectedCategory ? <GetCategories /> : <PostList />}
      {selectedCategory == "Alla" && <PostList />}
    </Container>
  );
}
