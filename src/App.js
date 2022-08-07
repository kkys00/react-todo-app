import React from "react";
import { useState } from "react";
import './App.css';
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
  console.log("App Component");

  const [todoData, setTodoData] = useState(initialTodoData); //처음에는 빈 배열 사용
  const [value, setValue] = useState(""); //처음에는 빈 스트링

  const handleSubmit = (e) => {
    e.preventDefault(); //페이지 리로드 막기
    let newTodo = {
      id: Date.now(), //아이디가 유니크한 값이어야 해서 이렇게 작성
      title: value, //handleChange에 의해 현재 밸류가 여기에 들어있다.
      completed: false,
    }
    setTodoData(prev => [...prev, newTodo]); //Setter에서 이전 state를 가져오려면 인수에 함수를 이용
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");

  }

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));

  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );

}