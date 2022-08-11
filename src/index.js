import { getUrlRelativePath, init } from "./utils";
import { codeStat, controlPanel } from "./compontent/floatWin";

// 初始化tampermonkey变量
init();

//执行
(async function () {
  // aone 首页
  if (getUrlRelativePath() === "/v2") {
    controlPanel();
  }

  // aone 代码页
  if (getUrlRelativePath().includes("/my/profile")) {
    codeStat();
  }

  // layer.open({
  //   title: "hello",
  //   type: 1,
  // });
})();
