const baseURL = ``;

const endpoints = {};

const methods = {
  get: `GET`,
  post: `POST`,
  put: `PUT`,
  delete: `DELETE`,
};

const header = {
  simpleHeader: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  jsonHeader: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

async function authenticatedHeader() {
  // const beareToken = await getAuthTokenDetails();
  // return {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   Authorization: beareToken,
  // };
}

export {baseURL, endpoints, methods, header, authenticatedHeader};
