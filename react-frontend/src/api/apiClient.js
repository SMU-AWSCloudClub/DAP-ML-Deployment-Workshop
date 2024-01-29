import axios from './axios';

const postCalculator = async (data) => {
  return axios.post('/dap-lambda', data);
};

export default { postCalculator };
