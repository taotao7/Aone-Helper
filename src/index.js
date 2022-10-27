import { getUrlRelativePath, init } from "./utils";
import { codeStat, controlPanel } from "./compontent/floatWin";

const check = () => {
  // 检测是否输入了id
  if (!window.localStorage.getItem("aoneHelper")) {
    layer.prompt(
      {
        type: 1,
        title: "输入你的ID例如WBxxxxxx",
        value: "输入后会保存在localstorage",
      },
      (v, i) => {
        window.localStorage.setItem("aoneHelper", v);
        layer.close(i);
        location.reload();
      }
    );
    return;
  }
};

// 初始化tampermonkey变量
init();

//执行
(async function () {
  // aone 首页

  if (getUrlRelativePath() === "/v2") {
    check();
    await controlPanel();
  }

  // aone 代码页
  if (getUrlRelativePath().includes("/my/profile")) {
    check();
    await codeStat();
  }

  // layer.open({
  //   title: "hello",
  //   type: 1,
  // });
})();
