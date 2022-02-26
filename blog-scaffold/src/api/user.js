import axios from 'axios';

function register(data){
  return axios.post('/api/users/register',data); //注册接口 
}

function login(data){
  return axios.post('/api/users/login',data); //登录接口 
}

function info(){
  return axios.get('/api/users/info'); //验证token接口 
}

export {
  register,
  login,
  info
}