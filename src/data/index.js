export async function signUp(body) {
  return fetch('/api/signup', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}