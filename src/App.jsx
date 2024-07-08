import { useEffect, useState } from 'react'
import './App.css'
import Card from './reusables/card'

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=hvONxWITf6N9G9wBS6XBRB44bczjfAnj&q=dogs&limit=16',
          {mode: 'cors'}
        );
        const responseJson = await response.json();
        setDogs(responseJson.data.map((gif, index) => {
          return {
            url:gif.images.original.url,
            name:`Dog ${index}`,
            alt:gif.alt_text
          }
        }))
    }

    fetchData();
  }, [])

  return (
    <>
    <header>
      <h1>Memory Game</h1>
      <div className="score-wrapper">
        <p className="score current">Score: {null}</p>
        <p className="score highest">Highscore: {null}</p>
      </div>
    </header>
    <main>
      {
        dogs
        .map((dog, index) => {
          console.log(dog.url);
          return (<Card key={`Dog ${index}`} imgSrc={dog.url} name={dog.name} alt={dog.alt} />);
        })
      }
    </main>

      
    </>
  )
}

export default App
