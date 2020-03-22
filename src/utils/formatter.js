const gender = (row, column, cellValue) => {
  if (cellValue === 1) {
    return '男'
  } else (cellValue === 0)
  {
    return '女'
  }
}

const status = (row, column, cellValue) => {
  if (cellValue === true) {
    return '启用'
  } else if (cellValue === false)
  {
    return '禁用'
  } else if (cellValue == 1) {
    return '启用'
  } else if (cellValue == 0) {
    return '禁用'
  }
}

// 0-待审核，1-审核通过，2-驳回，3-撤销
const auditStatus = (row, column, cellValue) => {
  var str = ''
  switch (cellValue) {
    case 0:
      str = '待审核'
      break
    case 1:
      str = '审核通过'
      break
    case 2:
      str = '驳回'
      break
    case 3:
      str = '撤销'
      break
  }
  return str
}

var propNameArr = []
var orderByArr = []
const sortChange = (column) => {
  let orderType = ''
  if (column.order === 'ascending') {
    orderType = 'asc'
  } else if (column.order === 'descending') {
    orderType = 'desc'
  }
  // 单列排序
  if( column.prop == 'buyTime' || column.prop == 'instockTime' || column.prop == 'weight' || column.prop == 'length' || column.prop == 'createTime') {
    return {
      propName: column.prop,
      orderBy: orderType
    }
  } else { //组合排序
    if(propNameArr.includes(column.prop)) {
      var i = propNameArr.indexOf(column.prop)
      orderByArr[i] = orderType
    } else {
      propNameArr.push(column.prop)
      orderByArr.push(orderType)
    }
    // 过滤空字符串
    var newPropArr = propNameArr.filter(item => item)
    var newOrderArr = orderByArr.filter(item => item)
    return {
      propName: newPropArr.join(','),
      orderBy: newOrderArr.join(',')
    }
  }
}

export default {
  gender,
  status,
  auditStatus,
  sortChange
}
