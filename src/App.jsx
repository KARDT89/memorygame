import GameBoard from "./components/GameBoard";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
    let [pokemonList, setPokemonList] = useState([]);
    let [gameEnd, setGameEnd] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=10"
                );
                const data = await response.json();
                const result = data.results.map((obj) => ({
                    ...obj,
                    isClicked: false,
                }));
                setPokemonList(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);
    // function shuffle(array) {
    //     let currentIndex = array.length;

    //     // While there remain elements to shuffle...
    //     while (currentIndex != 0) {
    //         // Pick a remaining element...
    //         let randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex--;

    //         // And swap it with the current element.
    //         [array[currentIndex], array[randomIndex]] = [
    //             array[randomIndex],
    //             array[currentIndex],
    //         ];
    //     }
    // }

    console.log(pokemonList);

    function playGame(name) {
        let updatedList = pokemonList.map((pokemon) => {
            if (pokemon.name === name) {
                if (!pokemon.isClicked) {
                    return { ...pokemon, isClicked: true };
                } else {
                    setGameEnd(true);
                }
            }
        });
        setPokemonList(updatedList);
        checkGameEnd()
    }

    return (
        <>
            <Navbar score={score} bestScore={bestScore} />
            <GameBoard pokemonList={pokemonList} playGame={playGame} />
        </>
    );
}

export default App;
