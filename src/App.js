import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";
import "./index.css";
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisbled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicating the images, so this line of code makes sure that there are 12 elements in the array, i.e two repeated each
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    //makes an array and allots a random id to the card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisbled(true);
      //if this condition is satisfied then we have a match, so we r updating the card state
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //dependency array : The useEffect hook takes a second parameter, a “dependencies” array, that will only re-run the effect when the values within the array change across re-renders. This allows us to optimize how many times the effect is run.
  //So what happens when the dependency array is empty? It simply means that the hook will only trigger once when the component is first rendered. So for example, for useEffect it means the callback will run once at the beginning of the lifecycle of the component and never again

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisbled(false);
  };
  //start a new game automatically
  useEffect(() => {
    shuffleCards(); //since this is the point from where the program starts
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
