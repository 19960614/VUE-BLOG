import axios from 'axios';

function addComment(data = {}) { //添加评论接口
  return axios.post('/api/comment/addComment', data);
}

function findComment(data = {}) { //查询接口
  return axios.get('/api/comment/findComment', { params: data });
}

function removeComment(data) { //删除接口
  return axios.post('/api/comment/removeComment', data);
}

export {
  addComment,
  findComment,
  removeComment
}