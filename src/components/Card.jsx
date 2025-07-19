import React, { useEffect, useState } from "react";

export const Card = ({ name, url, handleClick }) => {
    const [images, setImages] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data.results[9]);
                setImages(data.sprites.front_default);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    });

    return (
        <button
            value={name}
            className="border w-[170px] h-[220px] md:w-[200px] md:h-[250px] flex flex-col items-center justify-center cursor-pointer rounded-xl hover:bg-zinc-800"
            onClick={() => handleClick(name)}
        >
            <div>
                <img src={images} alt={name} width={200} />
                <h1>{name}</h1>
            </div>
        </button>
    );
};
