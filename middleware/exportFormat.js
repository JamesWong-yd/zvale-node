module.exports = {
  normal: (obj, msg) => {
    let _msg = msg || ''
    let _obj = {
      status: true,
      msg: _msg,
      data: obj
    }
    return _obj
  },
  list: (obj, count, msg) => {
    let _msg = msg || ''
    let _obj = {
      status: true,
      count: count,
      data: obj,
      msg: _msg
    }
    return _obj
  },
  not: (bool,msg) => {
    return {
      status: bool,
      msg: msg
    }
  }
}