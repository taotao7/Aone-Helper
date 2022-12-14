import request from "./request";
import { getUserInfo } from "./utils";
import dayjs from "dayjs";

// 获取当前周有变动需求
export const getCurrentRequirements = async () => {
  const id = getUserInfo();

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
        spaceIdentifier: id,
        category: "",
        toPage: 1,
        pageSize: 500,
        conditions: `{"conditionGroups":[[{"fieldIdentifier":"assignedTo","operator":"CONTAINS","value":["${id}"],"toValue":null,"className":"user","format":"list"}]]}`,
        searchType: "LIST",
        groupCondition:
          '{"fieldIdentifier":"category","className":"category","format":"list","value":["Req"],"operator":"EQUALS"}',
        scope: "personal",
      }),
    }
  );
};

// 上月代码页面统计
export const getLastMonthCodeStat = async () => {
  let addLine = 0;
  let delLine = 0;

  // @ts-ignore
  const lastMonthStart = dayjs()
    .startOf("month")
    .subtract(1, "month")
    .format("YYYY-MM-DD");

  const lastMonthEnd = dayjs()
    .endOf("month")
    .subtract(1, "month")
    .format("YYYY-MM-DD");

  // .format("YYYY-MM");
  console.log("123--->", lastMonthStart);
  console.log("123--->", lastMonthEnd);

  const commitList = await request(
    // @ts-ignore
    `https://ati-app.alibaba-inc.com/open/personal/activities?startDate=${lastMonthStart}+00:00:00&endDate=${lastMonthEnd}+00:00:00&empId=${getUserInfo()}`
  );

  if (commitList?.data?.crAuthor?.repo_summary_list) {
    commitList.data.crAuthor.repo_summary_list.forEach((i) => {
      i?.review_list.forEach((j) => {
        addLine += j.add_line_count;
        delLine += j.del_line_count;
      });
    });
  }
  console.log("123", addLine);
  return { addLine, delLine };
};

// 本月代码页面统计
export const getCurrentMonthCodeStat = async () => {
  let addLine = 0;
  let delLine = 0;

  // @ts-ignore
  const monthStart = dayjs().startOf("month").format("YYYY-MM-DD");

  const monthEnd = dayjs().endOf("month").format("YYYY-MM-DD");

  const commitList = await request(
    // @ts-ignore
    `https://ati-app.alibaba-inc.com/open/personal/activities?startDate=${monthStart}+00:00:00&endDate=${monthEnd}+00:00:00&empId=${getUserInfo()}`
  );

  if (commitList?.data?.crAuthor?.repo_summary_list) {
    commitList.data.crAuthor.repo_summary_list.forEach((i) => {
      i?.review_list.forEach((j) => {
        addLine += j.add_line_count;
        delLine += j.del_line_count;
      });
    });
  }
  return { addLine, delLine };
};

// 代码页面统计
// export const getCodeStat = async () => {
//   const currentMonthStart = dayjs().startOf("month").format("YYYYMMDD");
//   const currentMonthEnd = dayjs().endOf("month").format("YYYYMMDD");
//   // 获取token
//   const token = await request(
//     "https://code.alibaba-inc.com/api/v3/internal/exchange",
//     {
//       code: true,
//     }
//   );
//   // 储存隐私token
//   window.localStorage.setItem("privateToken", token.privateToken);
//   const commitList = await request(
//     `https://code.aone.alibaba-inc.com/api/v3/projects/393249/reports/total_commit?_input_charset=utf-8&start_date=${currentMonthStart}&end_date=${currentMonthEnd}&private_token=${token.privateToken}`,
//     {
//       code: true,
//       headers: {
//         Accept: "application/json, text/javascript",
//         "Content-Type": "application/x-www-form-urlencoded",
//         Host: "code.aone.alibaba-inc.com",
//         Referer: "https://code.aone.alibaba-inc.com",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin",
//         Cookie: document.cookie,
//       },
//     }
//   );

//   console.log("123", commitList);
// };
