import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import requests from "../../request";
import Row from "./Row";

function MainPage() {
  return (
    <div>
      <Header />
      <Banner />
      <Row
        title="Action movies"
        fetchUrl={requests.fetchActionMovies}
        isLarge
      />
      <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row
        title="Documentaries movies"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default MainPage;
