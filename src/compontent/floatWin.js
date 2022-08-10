// 操作面板操作
const content = `
    <ul  style="display:block;margin-left:30px" class="site-dir layui-layer-wrap">
      <li>
        <a id="test">测试</a>
      </li>
      <li>
        <a id="se">第二</a>
      </li>
    </ul>
    `;

export const controlPanel = () => {
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

  // 绑定事件
  $("#test").on("click", () => {
    console.log("click");
  });
};
