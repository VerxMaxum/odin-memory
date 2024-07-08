import { useEffect, useState } from 'react'
import './App.css'
import Card from './reusables/card'

function App() {
  const [dogs, setDogs] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=hvONxWITf6N9G9wBS6XBRB44bczjfAnj&q=dogs&limit=16',
          {mode: 'cors'}
        );
        const responseJson = await response.json();
        setDogs(responseJson.data.map((gif) => {
          return {
            id: gif.id,
            url:gif.images.original.url,
            name: gif.title,
            alt:gif.alt_text
          }
        }))
    }

    fetchData();
  }, [])

  function shuffle(arr) {
    let curr = arr.length-1;
    while(curr > 0) {
      let randomIndex = Math.floor(curr * Math.random());
      curr--;

      [arr[curr], arr[randomIndex]] = [arr[randomIndex], arr[curr]];
    }

    return arr;
  }

  function handleClicked(e) {
    const clickedId = e.currentTarget.id;
    const shuffled = shuffle(dogs);
    setDogs(shuffled);
    console.log(clickedId);
    if(clicked.includes(clickedId)) {
      if(score > highscore) {
        setHighscore(score);
      }
      setScore(0);
      setClicked([]);
      return;
    }
    
    const updatedScore = score + 1;
    const updatedClicked = [...clicked, clickedId];

    setScore(updatedScore);
    setClicked(updatedClicked);
  }

  return (
    <>
    <header>
      <h1>Memory Game</h1>
      <div className="score-wrapper">
        <p className="score current">Score: {score}</p>
        <p className="score highest">Highscore: {highscore}</p>
      </div>
    </header>
    <main>
      {
        dogs
        .map((dog) => {
          return (<Card
            key={dog.id}
            id={dog.id}
            imgSrc={dog.url}
            name={dog.name}
            alt={dog.alt}
            onClick={handleClicked}
            />);
        })
      }
    </main>

      
    </>
  )
}

export default App
