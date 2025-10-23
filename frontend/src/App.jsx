import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState("백엔드 연결 중...")
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/landing') // api = vite.config.js 에 정의된 프록시 규칙 ('/api': 'http://localhost:8080')
      .then(response => {
        setMessage(response.data);
        setIsConnected(true);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error when call API: " + error);
        setMessage("백엔드 연결에 실패했습니다.");
        setIsConnected(false);
        setLoading(false);
      });
  }, []); 
  // 마지막 빈 배열 = 의존성 배열, 코드를 컴포넌트가 맨 처음 화면에 렌더링될 때 딱 한 번만 실행하겠다는 의미
  // 여기선 백엔드의 데이터를 한 번만 호출하겠다는 의미임. 없으면 계속 랜더링될 때마다 실행됨

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 EXP Planner</h1>
        <p className="app-subtitle">경험을 계획하고 성장하세요</p>
      </header>
      
      <main className="app-main">
        <div className="status-card">
          <h2>시스템 상태</h2>
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {loading ? (
              <span>🔄 연결 중...</span>
            ) : isConnected ? (
              <span>✅ 백엔드 연결됨</span>
            ) : (
              <span>❌ 백엔드 연결 실패</span>
            )}
          </div>
          <p className="status-message">{message}</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 경험 추적</h3>
            <p>다양한 경험을 기록하고 관리하세요</p>
          </div>
          <div className="feature-card">
            <h3>🎯 목표 설정</h3>
            <p>구체적인 목표를 설정하고 달성해보세요</p>
          </div>
          <div className="feature-card">
            <h3>📈 성장 분석</h3>
            <p>나의 성장 과정을 시각화해보세요</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;