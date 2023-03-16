import { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";

interface Props {
  onSearch: (value: string) => void;
}

function Home(props: Props) {
  function handleSearch(value: string) {
    console.log(`Searching for ${value} in Home.tsx...`);
    props.onSearch(value);
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center my-5">
      <p
        className="text-center font-weight-bold mb-4"
        style={{ fontSize: "18px" }}
      >
        How sustainable is your GitHub repository? 🦖📟
      </p>
      <SearchBar onSearch={handleSearch} />
    </Container>
  );
}

export default Home;
