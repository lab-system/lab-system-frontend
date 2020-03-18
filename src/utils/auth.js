/**
 * author:laoseng(QQ:1572665580),feilong(hhr66@qq.com)
 * create:2018-07
 *  cookie 设置
 */
import Cookies from 'js-cookie'

const TokenKey = 'token_name'

// var param = {path: '/', domain: document.domain.match(/[^\.]+\.[^\.]+$/)[0]}
// var param = {path: '/', domain: document.domain.match(/[^\.]+\.[^\.]+$/)}
export function getToken() {
  // var tokenName = Cookies.get('token_name', param)
  // // var tokenName = Cookies.get('token')
  // console.log('param', param)
  // console.log('tokenName', tokenName)
  // if(tokenName){
  //   return Cookies.get(tokenName, param)
  // }else{
  //   return false
  // }
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
