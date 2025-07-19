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
                    "https://pokeapi.co/api/v2/pokemon?limit=5"
                );
                const data = await response.json();
                const result = data.results.map((obj) => ({
                    ...obj,
                    isClicked: false,
                }));
                shuffle(result);
                setPokemonList(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);
    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
    }

    function playGame(name) {
        let updatedList = pokemonList.map((pokemon) => {
            if (pokemon.name === name) {
                if (pokemon.isClicked === true) {
                    setGameEnd(true);
                   
                    console.log("after setendgame true", gameEnd);
                } else {
                    pokemon.isClicked = true;
                    console.log(`${name} was clicked`, pokemon);
                }
            }
            return pokemon;
        });
        console.log("checkGame is called", checkGame());
        console.log(gameEnd);
        
        shuffle(updatedList);
        setPokemonList(updatedList);
    }
    function checkGame() {
        console.log("im from checkgame", gameEnd);
        
        let currentScore = score;
        if (gameEnd) {
            resetGame();
        } else {
            setScore(score + 1);
            currentScore++;
            if (currentScore > bestScore) setBestScore(currentScore);
        }
    }
    function resetGame() {
        let updatedList = pokemonList.map((pokemon) => {
            pokemon.isClicked = false;
            return pokemon;
        });
        setPokemonList(updatedList);
        console.log("game was over ->", pokemonList);
        setScore(0);
        setGameEnd(false);
    }
    return (
        <>
            <Navbar score={score} bestScore={bestScore} />
            <GameBoard pokemonList={pokemonList} playGame={playGame} />
        </>
    );
}

export default App;
