import { useState } from 'react'

const Button =({name,handleClick}) => <button onClick={() => handleClick()}>{name}</button>

const StatisticLine = ({name,value}) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({good,neutral,bad,all,average,positive}) => {  
return <div>
<h1>Statistics</h1>
{(!good && !average && !bad) ? 'No feedback given' : (
<table>
<StatisticLine name={'Good'} value={good}/>
<StatisticLine name={'Neutral'} value={neutral}/>
<StatisticLine name={'Bad'} value={bad}/>
<StatisticLine name={'All'} value={all}/>
<StatisticLine name={'Average'} value={average}/>
<StatisticLine name={'Positive'} value={positive}/>
</table>
)
}
</div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const handleClick = (state,setter) => () => setter(state + 1)
const all = good + neutral + bad
const average = ((good * 1) + (bad * -1)) / all || 0
const positive = good / all || 0
  return (
    <div>
      <div>
        <h1>Give feeback</h1>
    <Button name={'Good'} handleClick={handleClick(good,setGood)}/>
    <Button name={'Neutral'}handleClick={handleClick(neutral,setNeutral)}/>
    <Button name={'Bad'} handleClick={handleClick(bad,setBad)}/>
      </div>
     <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App