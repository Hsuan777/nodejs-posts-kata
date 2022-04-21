const headers = require('./headers');

function successHandle(res, data){
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data: data
  }));
  res.end();
};

function errorHandle(res, status, detailCode ,data){
  const errorStatusCode = {
    205: 'Reset Content',
    400: {
      40001: '資料驗證錯誤',
      40002: data,
      40003: '無此 ID'
    },
    404: '無此要求'
  };
  const outputMessage = errorStatusCode[status][detailCode] || errorStatusCode[status];
  res.writeHead(status, headers);
  res.write(JSON.stringify({
    status: 'false',
    data: outputMessage
  }));
  res.end();
};

module.exports = {
  successHandle,
  errorHandle
}