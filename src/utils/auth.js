/**
 *  cookie 设置
 */
import Cookies from 'js-cookie'

const TokenKey = 'token_name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
