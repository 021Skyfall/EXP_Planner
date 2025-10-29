import axios from 'axios';

const API_BASE_URL = '/exp';

export const expenseService = {
  // 지출 등록
  createExpense: async (expenseData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/expenses/post`, expenseData);
      return response.data;
    } catch (error) {
      console.error('지출 등록 실패:', error);
      throw error;
    }
  },

  // 지출 목록 조회 (추후 구현)
  getExpenses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/expenses/getAll`);
      return response.data;
    } catch (error) {
      console.error('지출 목록 조회 실패:', error);
      throw error;
    }
  }
};
