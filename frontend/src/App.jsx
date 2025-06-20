import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState("loading backend call...")

  useEffect(() => {
    axios.get('/api/hello') // api = vite.config.js 에 정의된 프록시 규칙 ('/api': 'http://localhost:8080')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("Error when call API: " + error);
        setMessage("Error occured when calling backend data.")
      });
  }, []); 
  // 마지막 빈 배열 = 의존성 배열, 코드를 컴포넌트가 맨 처음 화면에 렌더링될 때 딱 한 번만 실행하겠다는 의미
  // 여기선 백엔드의 데이터를 한 번만 호출하겠다는 의미임. 없으면 계속 랜더링될 때마다 실행됨

  return (
    <>
      <h1>EXP Planner</h1>
      <h2>백엔드 통신 테스트</h2>
      <p>{message}</p>
    </>
  );
}

export default App;