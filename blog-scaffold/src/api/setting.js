import axios from 'axios';

function find() {
  return axios.get('/api/setting/find'); //查询接口 
}

function update(data) {
  let param = new FormData();
  param.append('myName', data.myName);
  param.append('myHead', data.myHead);
  param.append('myTel', data.myTel);
  param.append('myQQ', data.myQQ);
  param.append('myMail', data.myMail);
  return axios.patch('/api/setting/update', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }); //更新个人信息接口
}

export {
  find,
  update
}