// 过滤特殊字符
export function dizhi (str) {
  //格式 RegExp("[在中间定义特殊过滤字符]")
  var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
};
// 验证用户名
export function testName (name) {
  let reg = /^[a-zA-Z0-9_-]{4,16}$/
  return reg.test(name)
}
// 验证密码
export function testPass (pass) {
  let reg = /^[A-Za-z0-9]+$/
  console.log(reg.test(pass))
  return reg.test(pass)
}
// 使用export 可以使用多次
// 但import 需要花括号