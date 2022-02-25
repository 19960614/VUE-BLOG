
import axios from 'axios';

function verify(){
  return axios.get('/api/users/verify'); 
}

export {
  verify
}