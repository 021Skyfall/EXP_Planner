import { useState } from 'react';
import { expenseService } from '../../services/expenseService';
import './ExpenseForm.css';

// 콤마 포함 문자열 => 숫자 변환
const formatAmount = (value) => {
  // value가 숫자 0이고 입력값이 없으면 공백으로 처리하여 0이 표시되는 것을 방지
  if (value === 0 && String(value) === '0') {
    return '';
  }
  const numberValue = Number(String(value).replace(/,/g, ''));
  if (!isNaN(numberValue) && numberValue !== 0) {
    return numberValue.toLocaleString('ko-KR');
  }
  return value;
};

// 콤마 제거 후 순수 문자열 반환
const parseAmount = (formattedAmount) => {
  return String(formattedAmount).replace(/,/g, '');
};

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    gameName: '',
    gamePlatform: '',
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    marketType: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ⭐️ 수정된 handleChange 함수: amount를 Number 타입으로 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let processedValue = value;

    if (name === 'amount') {
      // 1. 콤마 제거
      const parsedAmount = parseAmount(value);
      
      // 2. 입력값이 유효한 숫자인지 확인 (빈 문자열은 허용)
      if (parsedAmount !== '' && isNaN(Number(parsedAmount))) {
        return; // 숫자가 아니면 업데이트 중단
      }
      
      // 3. formData에는 숫자 타입으로 저장 (서버로 보낼 때 문자열 방지)
      // 빈 문자열인 경우 0으로 처리합니다.
      processedValue = parsedAmount === '' ? 0 : Number(parsedAmount);
    }
    
    // ⭐️ 4. 다른 필드는 그대로 문자열로 업데이트
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

        // 유효성 검사 (필수 필드)
    if (!formData.gameName || !formData.gamePlatform || !formData.paymentDate || !formData.marketType || formData.amount <= 0) {
        setMessage('필수 항목(*)을 모두 입력하고 금액을 0보다 크게 입력해주세요.');
        setLoading(false);
        return;
    }

    try {
      const response = await expenseService.createExpense(formData);
      setMessage('지출이 성공적으로 등록되었습니다!');
      setFormData({
        gameName: '',
        gamePlatform: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        amount: 0,
        description: '',
        marketType: ''
      });
      if (onExpenseAdded) {
        onExpenseAdded(response);
      }
    } catch (error) {
      setMessage('지출 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }  
  };

  return (
    <div className="expense-form-container">
      <h2>💰 지출 등록</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="gameName">게임 이름 *</label>
          <input
            type="text"
            id="gameName"
            name="gameName"
            value={formData.gameName}
            onChange={handleChange}
            placeholder="게임 이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gamePlatform">게임 플랫폼 *</label>
          <div className="select-wrapper">
          <select
            id="gamePlatform"
            name="gamePlatform"
            value={formData.gamePlatform}
            onChange={handleChange}
          >
            <option value="">게임 플랫폼을 선택하세요</option>
            <option value="PC">PC</option>
            <option value="모바일">모바일</option>
            <option value="콘솔">콘솔</option>
          </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">결제 방법</label>
          <div className="select-wrapper">
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="">결제 방법을 선택하세요</option>
            <option value="신용카드">신용카드</option>
            <option value="문화상품권">문화상품권</option>
            <option value="네이버페이">네이버페이</option>
            <option value="모바일 결제">모바일 결제</option>
            <option value="계좌이체">계좌이체</option>
            <option value="휴대폰 결제">휴대폰 결제</option>
          </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="paymentDate">결제 날짜 *</label>
          <input
            type="date"
            id="paymentDate"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            placeholder="결제 날짜를 선택하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marketType">마켓 *</label>
          <div className="select-wrapper">
          <select
            id="marketType"
            name="marketType"
            value={formData.marketType}
            onChange={handleChange}
          >
            <option value="">마켓 카테고리를 선택하세요</option>
            <option value="구글 플레이 스토어">구글 플레이 스토어</option>
            <option value="갤럭시 스토어">갤럭시 스토어</option>
            <option value="원스토어">원스토어</option>
          </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">금액 *</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formatAmount(formData.amount)}
            onChange={handleChange}
            placeholder="지출 금액을 입력하세요"
            required
            // 숫자 이외의 문자 블락
            onKeyDown={(e) => {
              const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
              if (!allowedKeys.includes(e.key) && e.key.length === 1) {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="지출 내용을 입력하세요"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? '등록 중...' : '지출 등록'}
        </button>

        {message && (
          <div className={`message ${message.includes('성공') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
