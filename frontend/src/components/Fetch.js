import { DOMAIN_NAME } from './apiUrls';

export const fetch_get = (url, status=false, alert=false) => {
  const ROOT_API = DOMAIN_NAME;
  console.log(ROOT_API, localStorage.getItem('token'))
  return fetch(ROOT_API + url, {
    method: 'GET',
    headers: {
      'Authorization': 'Token a178c9ba828b33604a1670b55ed172ad12a140b6',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if(response.status === 403) {
      console.log('You DO not access to this page')
      return {}
    }
    if(response.status === 401) {
      console.log('You do not access to this page')
      return {'unauthorized': true}
    }
    else if(status) {
      return response
    } else {
      return response.json()
    }
  })
  .catch((error) => {
    console.log('Server busy, Please try again.', error)
  });
}

export const fetch_post = (url, data, status=false, alert=false) => {
  const ROOT_API =DOMAIN_NAME;
  console.log(ROOT_API)

  return fetch(ROOT_API + url, {
    method: 'POST',
    headers: {
      'Authorization': 'Token a178c9ba828b33604a1670b55ed172ad12a140b6',
    },
    body: data
  })
  .then(response => {
    console.log(status, response)
    if(response.status === 403) {
      console.log('You DO not access to this page')
      return {}
    }
    if(status) {
      return response
    } else {
      return response.json()
    }
  })
  .catch((error) => {
    console.log('Server busy, Please try again.')
  });
}

