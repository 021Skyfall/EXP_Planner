import { useState, useEffect } from 'react';
import ExpenseForm from '../../components/expense/ExpenseForm';
import { expenseService } from '../../services/expenseService';
import './ExpensePage.css';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); //에러 상태 추가

  // [데이터 조회 로직] useEffect를 사용하여 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setError(null);
        setIsLoading(true);
        // 서버의 GET /expense/get 엔드포인트에 요청
        const data = await expenseService.getExpenses(); 
        
        // 🚨 중요: 서버에서 받아온 데이터 구조가 List<ExpenseDto.Response>라고 가정합니다.
        setExpenses(data); 

      } catch (err) {
        console.error("지출 목록 조회 실패:", err);
        setError("지출 목록을 불러오지 못했습니다. 서버 상태를 확인해주세요.");
        setExpenses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때 딱 한 번만 실행

  const handleExpenseAdded = (newExpense) => {
    // 새 지출이 등록되면 목록의 맨 앞에 추가
    setExpenses(prev => [newExpense, ...prev]);
  };

    // [로딩 및 에러 처리]
    if (isLoading) {
      return (
        <div className="expense-page loading-state">
          <p>지출 내역을 불러오는 중...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="expense-page error-state">
          <p>⚠️ 오류 발생: {error}</p>
        </div>
      );
    }

  return (
    <div className="expense-page">
      <div className="page-header">
        <h1>💰 지출 관리</h1>
        <p>지출을 기록하고 관리해보세요</p>
      </div>

      <div className="page-content">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        
        <div className="expense-list-container">
          <h2>📋 지출 내역</h2>
          {expenses.length === 0 ? (
            <div className="empty-state">
              <p>아직 등록된 지출이 없습니다.</p>
              <p>위의 폼을 사용해서 지출을 등록해보세요!</p>
            </div>
          ) : (
            <div className="expense-list">
            {expenses.map((expense, index) => (
              <div key={index} className="expense-item">
                <div className="expense-info">
                  {/* 금액 (amount 필드는 Number 타입으로 가정) */}
                  <div className="expense-amount">₩{expense.amount?.toLocaleString('ko-KR')}</div>
                  
                  {/* 게임 이름 및 플랫폼 */}
                  <div className="expense-game-details">
                      {expense.gameName} ({expense.gamePlatform})
                  </div>
                  
                   {/* 마켓과 결제 방법 */}
                  <div className="expense-game-details">
                      {expense.marketType} ({expense.paymentMethod})
                  </div>

                  {/* 지출 설명 (월간 패스) */}
                  {expense.description && (
                    <div className="expense-description">
                      {expense.description}
                    </div>
                  )}
                </div>
                
                {/* ⚠️ 날짜 필드를 paymentDate로 변경했습니다. 
                   - 스크린샷에 맞게 연도, 월, 일이 모두 포함되도록 수정했습니다.
                */}
                <div className="expense-date">
                  {new Date(expense.paymentDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                  }).replace(/\./g, '. ').trim()}
                </div>
              </div>
            ))}
          </div>       
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
