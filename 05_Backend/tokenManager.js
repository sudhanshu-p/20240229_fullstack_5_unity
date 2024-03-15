var token = null;

function setToken(newToken) {
  token = newToken;
}

function getToken() {
  return token;
}

function clearToken() {
  token = null;
}

module.exports = { setToken, getToken, clearToken };
