import { init } from "./utils";
import { getCurrentRequirements } from "./services";
import { controlPanel } from "./compontent/floatWin";

// 初始化tampermonkey变量
init();

//执行
(async function () {
  const requirementsList = await getCurrentRequirements();
  console.log("123", requirementsList);

  controlPanel();

  // layer.open({
  //   title: "hello",
  //   type: 1,
  // });
})();
