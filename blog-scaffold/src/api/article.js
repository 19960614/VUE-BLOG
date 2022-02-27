import axios from 'axios';

function add(data) {
  let param = new FormData();
  param.append('articleTitle', data.articleTitle);
  param.append('articleImage', data.articleImage);
  param.append('articleContent', data.articleContent);
  param.append('articleYear', data.articleYear);
  param.append('articleMonth', data.articleMonth);
  param.append('articleDay', data.articleDay);
  param.append('articleHour', data.articleHour);
  param.append('articleMinute', data.articleMinute);
  param.append('articleComment', JSON.stringify(data.articleComment));
  return axios.post('/api/article/add', param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }); //添加文章接口 
}

function find() {
  return axios.get('/api/article/find'); //查询接口 
}

function findArticleCount() {
  return axios.get('/api/article/findArticleCount'); //查询个数接口 
}

export {
  add,
  find,
  findArticleCount
}