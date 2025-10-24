// React Router를 사용한 페이지 라우팅 설정
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import ExpensePage from './pages/expense/ExpensePage';
import './App.css';

function App() {
  return (
    // BrowserRouter: 브라우저 URL과 컴포넌트를 연결하는 라우터
    <Router>
      <div className="app-container">
        {/* 공통 헤더 컴포넌트 - 모든 페이지에서 표시 */}
        <Header />
        {/* Routes: URL 경로에 따라 다른 컴포넌트를 렌더링 */}
        <Routes>
          {/* 홈페이지: "/" 경로로 접근 */}
          <Route path="/" element={<HomePage />} />
          {/* 지출관리 페이지: "/expenses" 경로로 접근 */}
          <Route path="/expenses" element={<ExpensePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;