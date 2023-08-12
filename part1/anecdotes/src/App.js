import { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={() => handleClick()}>{name}</button>
);
const Header = ({ name }) => <h1>{name}</h1>;

const Text = ({ text }) => <p>{text}</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const startPoints = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(startPoints);
  const [maxIndex, setMaxIndex] = useState();

  const handlePoints = () => {
    const currentPoints = [...points];
    currentPoints[selected] += 1;

    const max = Math.max(...currentPoints);
    const indexOfMax = currentPoints.indexOf(max);

    setMaxIndex(indexOfMax);
    setPoints(currentPoints);
  };

  const handleClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  return (
    <div>
      <Header name={"Anecdote of the day"} />
      <Text text={`${anecdotes[selected]}`} />

      <div>
        <Button name={"Vote"} handleClick={handlePoints} />
        <Button name={"next anecdode"} handleClick={handleClick} />
      </div>
      <Header name={"Anecdote with most votes"} />

      {maxIndex >= 0 && (
        <Text text={`${anecdotes[maxIndex]} has ${points[maxIndex]} points`} />
      )}
    </div>
  );
};

export default App;
