import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [message, setMessage] = useState("백엔드 연결 중...")
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/exp/landing')
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

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🎯 EXP Planner</h1>
        <p className="hero-subtitle">경험을 계획하고 성장하세요</p>
      </div>
      
      <div className="content-section">
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
          <div className="feature-card">
            <h3>💰 지출 관리</h3>
            <p>지출을 기록하고 예산을 관리하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
