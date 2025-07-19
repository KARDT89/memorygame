import GameBoard from "./components/GameBoard";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
    let [pokemonList, setPokemonList] = useState([]);
    let [gameEnd, setGameEnd] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=15"
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

    useEffect(() => {
        if (gameEnd) {
            resetGame();
        }
    }, [gameEnd]);

    function playGame(name) {
        let isClickedTwice = false;
        let updatedList = pokemonList.map((pokemon) => {
            if (pokemon.name === name) {
                if (pokemon.isClicked === true) {
                    isClickedTwice = true;
                    setGameEnd(isClickedTwice);
                    console.log("after setendgame true", gameEnd);
                } else {
                    pokemon.isClicked = true;
                    console.log(`${name} was clicked`, pokemon);
                }
            }
            return pokemon;
        });
        if (!isClickedTwice) {
            let currentScore = score;
            setScore(score + 1);
            currentScore++;
            if (currentScore > bestScore) setBestScore(currentScore);
        }
        shuffle(updatedList);
        setPokemonList(updatedList);
        // checkGame();
    }
    // function checkGame() {
    //     console.log("im from checkgame", gameEnd);

    //     let currentScore = score;
    //     if (gameEnd) {
    //         resetGame();
    //     } else {
    //         setScore(score + 1);
    //         currentScore++;
    //         if (currentScore > bestScore) setBestScore(currentScore);
    //     }
    // }
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
        <div className="flex flex-col h-screen">
            <div className="flex-1">
                <Navbar score={score} bestScore={bestScore} />
                <GameBoard pokemonList={pokemonList} playGame={playGame} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
