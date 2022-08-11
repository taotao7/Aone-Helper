import dayjs from "dayjs";

export const init = () => {
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

  // // @ts-ignore
  // unsafeWindow.layer = window.layer; // 把layer设置到原始window对象中
  // // @ts-ignore
  // unsafeWindow.csrfToken = window.csrfToken;
  // // @ts-ignore
  // unsafeWindow.profileUserInfo = window.profileUserInfo;
};

// 获取用户信息
export const getUserInfo = () => {
  // @ts-ignore
  return JSON.parse(window.localStorage.getItem("TB_USER"));
};

// 获取当前窗口相对路径
export const getUrlRelativePath = () => {
  const url = document.location.toString();
  const arrUrl = url.split("//");
  const start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
};

// 根据需求返回需求名称和Aone名称
export const getReqName = (reqList) => {
  // 上周天12点
  const lastWeek = dayjs().add(-1, "week").day(6).valueOf();

  const nameList = [];
  if (reqList.length > 0) {
    reqList.forEach((i) => {
      //大于上周天12点的
      if (i.gmtModified > lastWeek) {
        nameList.push(`${i.subject} -- aone id: ${i.identifier}`);
      }
    });
  }
  return nameList;
};
