import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import Spinner from "./components/Spinner";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPage, {
        cancelToken: new axios.CancelToken(
          (cancelToken) => (cancel = cancelToken)
        ),
      })
      .then((res) => {
        setPokemon(res.data.results);
        setPrevPage(res.data.previous);
        setNextPage(res.data.next);
        setLoading(false);
      });

    return () => cancel();
  }, [currentPage]);

  if (loading) return <Spinner />;

  return (
    <div className="App">
      <PokemonList pokemon={pokemon} />
    </div>
  );
};

export default App;
