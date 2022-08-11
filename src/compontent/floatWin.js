import { getReqName, getUserInfo } from "../utils";
import { getCurrentRequirements, getCodeStat } from "../services";
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
  const requirementsList = await getCurrentRequirements();
  const userInfo = getUserInfo();
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
          window.open(
            `https://team.aone.alibaba-inc.com/inventory/${userInfo.openId}`
          );
          // @ts-ignore
          layer.close(index);
        });
      },
    });
  });

  $("#month").on('click', () => {
    window.open("https://my.aone.alibaba-inc.com/my/profile")
  })
};

// 代码页面 aone code page
export const codeStat = async () => {
  const stat = await getCodeStat();
  const currentMonth = dayjs().format("MM");

  // @ts-ignore
  layer.open({
    title: `${currentMonth}月commit情况`,
    content: `<div>
      <div>添加行: ${stat.addLine}<div>
      <div>删除行: ${stat.delLine}<div>
    <div>`,
    shade: 0,
    anim: 2,
  });
};
