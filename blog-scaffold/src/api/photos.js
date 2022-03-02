import axios from 'axios';

function add(data) { //添加照片接口
  let param = new FormData();
  param.append('photosUrl', data.photosUrl);
  return axios.post('/api/photos/add', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

function find(data = {}) { //查询接口
  return axios.get('/api/photos/find', { params: data });
}

function findPhotosCount() { //查询个数接口
  return axios.get('/api/photos/findPhotosCount');
}

function remove(data) { //删除接口
  return axios.post('/api/photos/remove', data);
}

export {
  add,
  find,
  findPhotosCount,
  remove
}