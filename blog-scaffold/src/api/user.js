import axios from 'axios';

function register(data){  //注册接口
  return axios.post('/api/users/register',data); 
}

function login(data){ //登录接口
  return axios.post('/api/users/login',data);  
}

function info(){ //验证token接口 
  return axios.get('/api/users/info'); 
}

export {
  register,
  login,
  info
}