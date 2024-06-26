import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


// const cardImages=[
//   {"src": "/img/1.png",matched:false},
//   {"src": "/img/2.png",matched:false},
//   {"src": "/img/3.png",matched:false},
//   {"src": "/img/4.png",matched:false},
//   {"src": "/img/5.png",matched:false},
//   {"src": "/img/6.png",matched:false},
//   {"src": "/img/7.png",matched:false},
//   {"src": "/img/8.png",matched:false}
// ]

const cardImages = [
  {"src": process.env.PUBLIC_URL + "/img/1.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/2.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/3.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/4.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/5.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/6.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/7.png", matched: false},
  {"src": process.env.PUBLIC_URL + "/img/8.png", matched: false}
];


function App() {
  const[cards, setCards]= useState([])
  const[turns, setTurns]= useState([])
  const[choiceOne, setChoiceOne]=useState(null)
  const[choiceTwo, setChoiceTwo]=useState(null)
  const [matchFound, setMatchFound] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { width, height } = useWindowSize();
  // const[disabled, setDisabled]=useState(false)

  //shuffle cards
  const shuffleCards =()=>{
    const shuffleCards=[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((card)=>({...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)
    setChoiceOne(null);
    setChoiceTwo(null);
    setMatchFound(false);
    setGameOver(false);
  }

  //handle a choice
  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(()=>{
    if (choiceOne && choiceTwo)
      // setDisabled(true)
      if(choiceOne.src===choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){
              return {...card, matched: true};
            } else{
              return card;
            }
          });
        });
        setMatchFound(true);
        setTimeout(() => {
          setMatchFound(false);
        }, 2000);
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),1000)
      }

  },[choiceOne, choiceTwo]);
  console.log(cards)

  //check if gameover
  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  //reset choices and increase turn
  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns+1)
    // setDisabled(false)
  }


  return (
    <div className="App">
    <h1>Happy Birthday Shreyas!</h1>
    <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card=>(
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card===choiceOne || card===choiceTwo || card.matched}
        // disabled={disabled}
        />
      ))}
    </div>
    {matchFound && <Confetti width={width} height={height} />}
        {gameOver && (
            <>
              <Confetti width={width} height={height} numberOfPieces={5000} recycle={false} />
              <div className="final-message">Yay! congratulations</div>
            </>
      )}
    </div>
  );
}

export default App;
