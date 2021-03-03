import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import "antd/dist/antd.css";
import './App.css';


function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.cryptonator.com/api/full/btc-pln")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result.ticker.price);
          setItem(result.ticker);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        <li key={item.id}>

          {item.price}
          <Button>Click</Button>
        </li>
      </ul>
    );
  }

  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <Button>Default Button</Button>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
}

export default App;
