import { getReqName, getUserInfo } from "../utils";
import {
  getCurrentMonthCodeStat,
  getCurrentRequirements,
  getLastMonthCodeStat,
} from "../services";
import dayjs from "dayjs";

// 操作面板操作
const content = `
    <ul  style="display:block;margin-left:30px" class="site-dir layui-layer-wrap">
      <li>
        <a id="week">周工作填报</a>
      </li>
      <li>
        <a id="month">月代码量</a>
      </li>
    </ul>
    `;

// 显示本周工作 aone /v2
export const controlPanel = async () => {
  try {
    const requirementsList = await getCurrentRequirements();
    const id = getUserInfo();
    const nameList = getReqName(requirementsList?.result);
    // @ts-ignore
    layer.open({
      type: 1,
      title: "操作面板",
      // @ts-ignore
      maxHeight: $(window).height() - 300,
      closeBtn: 0,
      content,
      shade: 0,
      anim: 2,
      offset: "r",
    });

    $("#week").on("click", () => {
      // @ts-ignore
      layer.open({
        title: "本周需求",
        area: "400px",
        content: `
      <ul style="display:block;margin-left:30px" class="site-dir layui-layer-wrap">
        ${nameList.map((i) => `<li>${i}</li>`)}
      </ul>
      `,
        shade: 0,
        anim: 2,
        btn: ["复制"],
        yes: (index, _) => {
          // 复制到剪切板
          navigator.clipboard.writeText(nameList.toString()).then(() => {
            window.open(`https://team.aone.alibaba-inc.com/inventory/${id}`);
            // @ts-ignore
            layer.close(index);
          });
        },
      });
    });

    $("#month").on("click", () => {
      window.open("https://ati.alibaba-inc.com/person");
    });
  } catch (e) {
    console.log("123---->", e);
  }
};

// 代码页面 aone code page
export const codeStat = async () => {
  try {
    const lastStat = await getLastMonthCodeStat();
    const currentStat = await getCurrentMonthCodeStat();
    const currentMonth = dayjs().format("MM");
    const lastMonth = dayjs().add(-1, "month").format("MM");

    // @ts-ignore
    layer.open({
      title: `${lastMonth}--${currentMonth}月commit情况`,
      content: `<div>
      <h3>${currentMonth} 月</h3>
      <div>添加行: ${currentStat.addLine}<div>
      <div>删除行: ${currentStat.delLine}<div>

      <h3>${lastMonth} 月</h3>
      <div>添加行: ${lastStat.addLine}<div>
      <div>删除行: ${lastStat.delLine}<div>
    <div>`,
      shade: 0,
      anim: 2,
    });
  } catch (e) {
    console.log("123---->", e);
  }
};
