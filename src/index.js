// @ts-ignore
GM_addStyle(GM_getResourceText("0"));
// @ts-ignore
GM_addStyle(
  ".site-dir{display:none;}.site-dir li{line-height:26px;overflow:visible;list-style-type:disc;}.site-dir li a{display:block;text-decoration:none}.site-dir li a:active{color:#01AAED;}.site-dir li a.layui-this{color:#01AAED;}body .layui-layer-dir{box-shadow:none;border:1px solid #d2d2d2;}body .layui-layer-dir .layui-layer-content{padding:10px;}.site-dir a em{padding-left:5px;font-size:12px;color:#c2c2c2;font-style:normal;}"
);
// @ts-ignore
GM_addStyle(
  ".layui-layer-ico16,.layui-layer-loading.layui-layer-loading2{width:32px;height:32px;background:url(https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/loading-2.gif)no-repeat;}.layui-layer-ico{background: url(https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/icon.png) no-repeat;}"
);

// @ts-ignore
unsafeWindow.layer = window.layer; // 把layer设置到原始window对象中
// @ts-ignore
unsafeWindow.csrf = window.csrfToken;

// 获取用户信息
const getUserInfo = () => {
  // @ts-ignore
  return JSON.parse(window.localStorage.getItem("TB_USER"));
};

// 获取当前窗口相对路径
function GetUrlRelativePath() {
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

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

// 获取当前需求
const getCurrentRequirements = async () => {
  const userInfo = getUserInfo();
  return await request(
    "https://aone.alibaba-inc.com/v2/api/workitem/adapter/workitem/list?_input_charset=utf-8",
    {
      method: "POST",
      contentType: "application/json",
      headers: {
        accept: "application/json, text/plain, */*",
      },
      dataType: "json",
      data: JSON.stringify({
        spaceType: "User",
        spaceIdentifier: userInfo.openId,
        category: "",
        toPage: 1,
        pageSize: 15,
        conditions: `{"conditionGroups":[[{"fieldIdentifier":"statusStage","operator":"CONTAINS","value":["1","2"],"toValue":null,"className":"statusStage","format":"multiList","originalIndex":0},{"fieldIdentifier":"assignedTo","operator":"CONTAINS","value":["${userInfo.openId}"],"toValue":null,"className":"user","format":"list","originalIndex":1}]]}`,
        searchType: "LIST",
        scope: "personal",
        groupCondition:
          '{"fieldIdentifier": "category","className":"category","format":"list","value":["Req"],"operator":"EQUALS"}',
      }),
    }
  );
};

//执行
(async function () {
  // @ts-ignore
  const requirementsList = await getCurrentRequirements();

  // layer.open({
  //   title: "hello",
  //   type: 1,
  // });
})();
