// 封装请求
const request = (url, options) => {
  return new Promise((resolve, resject) => {
    $.ajax({
      type: options?.method || "GET",
      url,
      contentType: options?.contentType || null,
      beforeSend: (request) => {
        // 默认一定要带的
        request.setRequestHeader("bx-v", "2.2.2");
        // @ts-ignore
        request.setRequestHeader("x-csrf-token", csrfToken);

        // 如果添加了options且带headers
        if (options?.headers) {
          Object.keys(options.headers).forEach((i) => {
            request.setRequestHeader(i, options.headers[i]);
          });
        }
      },
      dataType: options?.dataType || null,
      data: options?.data || null,
      success: (res) => {
        resolve(res);
      },
      error: (e) => {
        resject(e);
      },
    });
  });
};

export default request;
