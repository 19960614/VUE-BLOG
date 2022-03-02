import axios from 'axios';

function add(data) {
  let param = new FormData();
  param.append('photosUrl', data.photosUrl);
  return axios.post('/api/photos/add', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }); //添加照片接口 
}

function find(data = {}) {
  return axios.get('/api/photos/find', { params: data }); //查询接口 
}

function findPhotosCount() {
  return axios.get('/api/photos/findPhotosCount'); //查询个数接口 
}

function remove(data) {
  return axios.post('/api/photos/remove', data); //添加、更新评论接口 
}

export {
  add,
  find,
  findPhotosCount,
  remove
}