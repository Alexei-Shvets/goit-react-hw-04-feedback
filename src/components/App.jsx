import React, { Fragment, useState } from 'react';

//куски секций и компонентов
import SectionTitle from './SectionTitle/SectionTitle';
import Feedback from './Feedback';
import Notification from './Notification/Notification';
import Statistics from './Statistics/Statistics';

//стилистика общего контейнера
import { Container } from './App.styled'; 

function App() {
  //первый элемент в массиве [] это изначальный стейт(само состояние), а второе - функция, которая позволяет изменять это состояния.
  //useState(0) - В качестве параметра хук принимает начальное состояние, в данном случае это число 0.
  //useState - функция хук возвращает картеж (массив с заранее определенными элементами (вышеуказанные))
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //функция по увеличению значения накопительного стейта на 1 при нажатии на кнопку good или neutral или bad.
  //state - это предыдущее состояние
  const handleIncrement = name => {
    switch (name) {
      case 'good':
        setGood(state => state + 1);
        return;
      case 'neutral':
        setNeutral(state => state + 1);
        return;
      case 'bad':
        setBad(state => state + 1);
        return;
      default:
        return;
    }
  };   
  //функция по суммированию значений, которые появились на 20 строке в параметре нейм.
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  //функция по подсчету позитивных оценок  
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const result = (good / total) * 100;
    return Math.round(result);
  };
  //переменная с условием для выведения соответствующей нотификашки.
  const variation = good > 0 || neutral > 0 || bad > 0;

    return (
      <Fragment>
        <Container>
        <SectionTitle title="Please leave Feedback">
        <Feedback 
            options={{ good, neutral, bad }}
            handleIncrement ={handleIncrement}
          />
        </SectionTitle>
        <SectionTitle title="Statictics">
          {!variation ?
            <Notification message="There is no feedback" /> :
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
            //вызов в тотале, потому как в компоненте фидбэк в баттоне кинул функцию
            total={countTotalFeedback()}
            positiveTotal={countPositiveFeedbackPercentage()}              
        />}              
          </SectionTitle>
          </Container>
    </Fragment>)
  }

export default App;



