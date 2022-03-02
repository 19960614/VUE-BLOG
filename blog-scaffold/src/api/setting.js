import axios from 'axios';

function find() { //查询接口
  return axios.get('/api/setting/find');
}

function update(data) { //更新个人信息接口
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
  });
}

export {
  find,
  update
}