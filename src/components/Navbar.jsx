import React from "react";

const Navbar = ({ score, bestScore }) => {
    return (
        <div className="flex items-center justify-between border md:text-xl lg:text-3xl border-white m-4 px-4 py-2 md:mx-8 lg:mx-20 lg:my-10 lg:px-20 lg:py-10 xl:mx-30 xl:my-10 xl:px-20 xl:py-5 rounded-sm font-mono">
            <h1 className="flex items-center gap-4"><img src="/odin-lined.png" alt="odin" width={30}/>MemoryCard</h1>
            <div className="flex flex-col md:flex-row gap-2">
                <p>Score: {score}</p>
                <p>Best-Score: {bestScore}</p>
            </div>
        </div>
    );
};

export default Navbar;
