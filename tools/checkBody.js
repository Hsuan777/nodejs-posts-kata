const { errorHandle  } = require('../handles');

function checkBody(res, data){
  const required = ['name', 'tags', 'type', 'content'];
  let count = 0;
  try {
    required.forEach((item) => {
      if (data[item] === undefined) {
        throw `屬性「${item}」為必要欄位`
      } else if (data[item] === "" || data[item].length === 0) {
        throw `屬性「${item}」不能為空值`
      } else {
        count += 1;
      }
    });
    if (count === required.length) {
      return true
    }
  } catch(error) {
    errorHandle(res, error);
  }
};

module.exports = checkBody;