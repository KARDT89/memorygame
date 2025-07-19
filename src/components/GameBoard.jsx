
import { Card } from "./Card";

function GameBoard({pokemonList, playGame}) {
    
    return (
        <div className="grid mx-5 justify-items-center gap-4 grid-cols-2 lg:grid-cols-6 md:grid-cols-3 max-w-screen lg:gap-10 lg:px-20 lg:py-20">
            {pokemonList.map((pk, idx) => (
                <Card key={idx} name={pk.name} url={pk.url} isClicked={pk.isClicked} handleClick={playGame}/>
            ))}
        </div>
    );
}

export default GameBoard;
