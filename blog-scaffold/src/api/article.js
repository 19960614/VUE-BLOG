import axios from 'axios';

function add(data) { //添加文章接口
  let param = new FormData();
  param.append('articleTitle', data.articleTitle);
  param.append('articleImage', data.articleImage);
  param.append('articleContent', data.articleContent);
  param.append('articleYear', data.articleYear);
  param.append('articleMonth', data.articleMonth);
  param.append('articleDay', data.articleDay);
  param.append('articleHour', data.articleHour);
  param.append('articleMinute', data.articleMinute);
  return axios.post('/api/article/add', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

function find(data = {}) { //查询接口
  return axios.get('/api/article/find', { params: data });
}

function findArticleCount() { //查询个数接口
  return axios.get('/api/article/findArticleCount');
}

function update(data) { //更新文章接口
  let param = new FormData();
  param.append('articleTitle', data.articleTitle);
  param.append('articleImage', data.articleImage);
  param.append('articleContent', data.articleContent);
  param.append('_id', data._id);
  return axios.patch('/api/article/update', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

function remove(data) { //删除接口
  return axios.post('/api/article/remove', data);
}

function removeComment(data) { //删除评论接口
  return axios.post('/api/article/removeComment', data);
}

export {
  add,
  find,
  findArticleCount,
  update,
  remove,
  removeComment
}