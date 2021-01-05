import React, { useState, useEffect } from "react";
import "./styles.css";

function Counter() {
  const [people, setPeople] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("salmon");

  useEffect(() => {
    console.log(`I'm in  a useEffect hook, count is ${count}`);

    return () => console.log("I'm cleaning up the count effect");
  }, [count]);

  useEffect(() => {
    console.log(`I'm in another useEffect hook, count is ${color}`);
  }, [color]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleColorChange = () => {
    const nextColor = color === "salmon" ? "gold" : "salmon";

    setColor(nextColor);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={handleColorChange}>Change Color</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <h1 style={{ color }}> {count} </h1>

      {people.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
}

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Unmount" : "Mount"}
      </button>

      {visible && <Counter />}
    </div>
  );
}
