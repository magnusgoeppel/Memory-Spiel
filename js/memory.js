// Spielername
function start()
{
    const playername = prompt("Bitte geben Sie Ihren Namen ein:");
    const playernameElement = document.getElementById("spielername");
    playernameElement.textContent = playername;
    startZeit();
}

// Zeit
let intervalId;

function startZeit()
{
    let seconds = 0;
    intervalId = setInterval(function()
    {
        ++seconds;
        document.getElementById("zeit").innerHTML = seconds;
        if (kartengefunden == 8) {
            clearInterval(intervalId);
        }
    }, 1000);
}

// Karten
document.addEventListener("DOMContentLoaded", () =>
{
    // Kartenarray
    let cardArray = [{name: "mario", image: "pics/card1.png",}, {name:"mario", image: "pics/card16.png",},{name: "mushroom", image: "pics/card2.png",},
        {name: "mushroom", image: "pics/card15.png",}, {name:"pickle", image: "pics/card3.png",}, {name:"pickle", image: "pics/card14.png",},
        {name: "toad", image: "pics/card4.png",},  {name: "toad", image: "pics/card13.png",}, {name: "yoshi", image: "pics/card5.png",},
        {name: "yoshi", image: "pics/card12.png",}, {name: "bowser", image: "pics/card6.png",}, {name: "bowser", image: "pics/card11.png",},
        {name:"bluepickle", image: "pics/card7.png",}, {name:"bluepickle", image: "pics/card10.png",},  {name: "daisy", image: "pics/card8.png",},
        {name: "daisy", image: "pics/card9.png",},];


    // Karten mischen
    cardArray.sort(() => 0.5 - Math.random());
    const playground = document.querySelector(".spielbereich");
    const attemptsCounter = document.querySelector(".versuche");

    let attempts = 0;
    let cardsfound = 0;

    attemptsCounter.textContent = attempts;

    // Karten erstellen
    function spielStart()
    {
        for (let i = 0; i < cardArray.length; i++)
        {
            const card = document.createElement("img");
            card.setAttribute("src", "pics/memoryBg.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            playground.appendChild(card);
        }
    }

    let card = [];
    let card_ID = [];

    // Karten drehen
    function flipCard() {
        if (card.length != 2) {
            var cardID = this.getAttribute("data-id");
            if (this.getAttribute("src") != "pics/memoryBgl.png" &&
                !this.classList.contains("disabled") &&
                this.getAttribute("data-selected") != "true")
            {
                card.push(cardArray[cardID].name);
                card_ID.push(cardID);
                this.setAttribute("src", cardArray[cardID].image);
                this.setAttribute("data-selected", "true");
                this.classList.add("disabled");

                if (card.length == 2)
                {
                    setTimeout(checkForPair, 400);
                }
            }
        }
    }

    // Karten vergleichen
    function checkForPair()
    {
        ++attempts;
        const cards = document.querySelectorAll("img");
        const first = card_ID[0];
        const second = card_ID[1];
        if (card[0] == card[1])
        {
            cardsfound++;
            cards[first].setAttribute("src", "pics/memoryBgI.png");
            cards[second].setAttribute("src", "pics/memoryBgI.png");
        }
        else
        {
            cards[first].setAttribute("src", "pics/memoryBg.png");
            cards[second].setAttribute("src", "pics/memoryBg.png");
            cards[first].classList.remove("disabled");
            cards[second].classList.remove("disabled");
            cards[first].removeAttribute("data-selected");
            cards[second].removeAttribute("data-selected");
        }
        card = [];
        card_ID = [];
        attemptsCounter.textContent = attempts;

        if (cardsfound == 8)
        {
            alert("Du hast gewonnen!");
            clearInterval(intervalId);
        }
    }
    spielStart();
});
