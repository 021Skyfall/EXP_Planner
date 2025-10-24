import { useState } from 'react';
import ExpenseForm from '../../components/expense/ExpenseForm';
import './ExpensePage.css';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);

  const handleExpenseAdded = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
  };

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
                      {expense.gameName} ({expense.gameType})
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
