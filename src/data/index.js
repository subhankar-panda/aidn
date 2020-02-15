import request from 'superagent';
import nocache from 'superagent-no-cache';

export async function signUp(body) {
  return request
    .post('/api/signup')
    .field('body', JSON.stringify(body))
    .attach('pic', body.image ? body.image : null)
    .use(nocache)
}

export async function facialRecog(body) {
  console.log(body)
  return request
    .post('/api/lookup')
    .field('ahhhhaha', 'pls')
    .attach('pic', body.image ? body.image : null)
    .use(nocache)
}