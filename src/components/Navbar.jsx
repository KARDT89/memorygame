import React from "react";

const Navbar = ({ score, bestScore }) => {
    return (
        <div className="flex justify-between border border-white m-4 px-4 py-2">
            <h1>Memory Game</h1>
            <div className="flex gap-2">
                <p>Score: {score}</p>
                <p>Best-Score: {bestScore}</p>
            </div>
        </div>
    );
};

export default Navbar;
