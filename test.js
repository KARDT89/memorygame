function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

let arr = [
    {
        name: "tamal",
        isClicked: false,
    },
    {
        name: "sarkar",
        isClicked: false,
    },
    {
        name: "nisha",
        isClicked: false,
    },
    {
        name: "bala",
        isClicked: false,
    },
];
let updatedList = arr.map((pokemon) => {
    if (pokemon.name === "nisha") {
        pokemon.isClicked = true;
    }
    return pokemon;
});
shuffle(updatedList);
console.log(updatedList);
