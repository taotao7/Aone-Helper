// ==UserScript==
// @name        aone-helper
// @description a aone helper
// @namespace   github.com/taotao7
// @require     http://libs.baidu.com/jquery/1.8.3/jquery.min.js
// @require     https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.js
// @resource    0 http://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/layer.css
// @match       https://aone.alibaba-inc.com/*
// @version     0.0.1
// @author      taotao7
// @license     MIT
// @grant       GM_log
// @grant       GM_listValues
// @grant       GM_getValue
// @grant       Gm_setValue
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       unsafeWindow
// ==/UserScript==

/*
MIT License

Copyright (c) 2020 cvzi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* globals React, ReactDOM */
(function () {
  'use strict';

  // @ts-ignore
  GM_addStyle(GM_getResourceText("0")); // @ts-ignore

  GM_addStyle(".site-dir{display:none;}.site-dir li{line-height:26px;overflow:visible;list-style-type:disc;}.site-dir li a{display:block;text-decoration:none}.site-dir li a:active{color:#01AAED;}.site-dir li a.layui-this{color:#01AAED;}body .layui-layer-dir{box-shadow:none;border:1px solid #d2d2d2;}body .layui-layer-dir .layui-layer-content{padding:10px;}.site-dir a em{padding-left:5px;font-size:12px;color:#c2c2c2;font-style:normal;}"); // @ts-ignore

  GM_addStyle(".layui-layer-ico16,.layui-layer-loading.layui-layer-loading2{width:32px;height:32px;background:url(https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/loading-2.gif)no-repeat;}.layui-layer-ico{background: url(https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/icon.png) no-repeat;}"); // @ts-ignore

  unsafeWindow.layer = window.layer; // 把layer设置到原始window对象中
  // @ts-ignore

  unsafeWindow.csrf = window.csrfToken; // 获取用户信息

  const getUserInfo = () => {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem("TB_USER"));
  }; // 获取当前窗口相对路径


  const request = (url, options) => {
    return new Promise((resolve, resject) => {
      $.ajax({
        type: options?.method || "GET",
        url,
        contentType: options?.contentType || null,
        beforeSend: request => {
          // 默认一定要带的
          request.setRequestHeader("bx-v", "2.2.2"); // @ts-ignore

          request.setRequestHeader("x-csrf-token", csrfToken); // 如果添加了options且带headers

          if (options?.headers) {
            Object.keys(options.headers).forEach(i => {
              request.setRequestHeader(i, options.headers[i]);
            });
          }
        },
        dataType: options?.dataType || null,
        data: options?.data || null,
        success: res => {
          resolve(res);
        },
        error: e => {
          resject(e);
        }
      });
    });
  }; // 获取当前需求


  const getCurrentRequirements = async () => {
    const userInfo = getUserInfo();
    return await request("https://aone.alibaba-inc.com/v2/api/workitem/adapter/workitem/list?_input_charset=utf-8", {
      method: "POST",
      contentType: "application/json",
      headers: {
        accept: "application/json, text/plain, */*"
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
        groupCondition: '{"fieldIdentifier": "category","className":"category","format":"list","value":["Req"],"operator":"EQUALS"}'
      })
    });
  }; //执行


  (async function () {
    // @ts-ignore
    await getCurrentRequirements(); // layer.open({
    //   title: "hello",
    //   type: 1,
    // });
  })();

})();
//# sourceMappingURL=bundle.user.js.map
