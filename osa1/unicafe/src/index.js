import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//FullStack2020-course, task "Unicafe" 1.6 - 1.11*, Henrik Tarnanen

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ name, handleClick }) => <button onClick={handleClick}>{name}</button>

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <p>No Statistics yet</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine name="goodish" value={good} />
        <StatisticLine name="okay-ish" value={neutral} />
        <StatisticLine name="bad-ish" value={bad} />
        <StatisticLine name="total" value={total} />
        <StatisticLine name="average" value={(good - bad) / total} />
        <StatisticLine name="portion of goodish values" value={good / total * 100} tail={"%"} />
      </tbody>
    </table>
  )
}



const StatisticLine = props => {
  return (
    <tr><td>{props.name}</td><td> {props.value} </td><td> {props.tail} </td></tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodHandler = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const neutralHandler = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badHandler = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }


  return (
    <div>
      <Header title="Anna palautetta" />
      <div>
        <Button name="hyvä" handleClick={goodHandler} />
        <Button name="ok" handleClick={neutralHandler} />
        <Button name="huono" handleClick={badHandler} />
      </div>
      <Header title="Palautetilasto" />

      <Statistics good={good} neutral={neutral} bad={bad} total={total}></Statistics>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)