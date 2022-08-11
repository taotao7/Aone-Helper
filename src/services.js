import request from "./request";
import { getUserInfo } from "./utils";
import dayjs from "dayjs";

// 获取当前周有变动需求
export const getCurrentRequirements = async () => {
  const userInfo = getUserInfo();
  const currentWeek = `${dayjs().day(1).format("YYYY-MM-DD ")}23:59:59`;

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
        // toPage: 1,
        pageSize: 100,
        conditions: `{\"conditionGroups\":[[{\"fieldIdentifier\":\"assignedTo\",\"operator\":\"CONTAINS\",\"value\":[\"${userInfo.openId}\"],\"toValue\":null,\"className\":\"user\",\"format\":\"list\"},{\"fieldIdentifier\":\"gmtModified\",\"operator\":\"MORE_THAN\",\"value\":[\"${currentWeek}\"],\"toValue\":null,\"className\":\"date\",\"format\":\"input\"},{\"fieldIdentifier\":\"updateStatusAt\",\"operator\":\"MORE_THAN\",\"value\":[\"${currentWeek}\"],\"toValue\":null,\"className\":\"date\",\"format\":\"input\"}]]}`,
        searchType: "LIST",
        scope: "personal",
        groupCondition:
          '{"fieldIdentifier": "category","className":"category","format":"list","value":["Req"],"operator":"EQUALS"}',
      }),
    }
  );
};

// 代码页面统计
export const getCodeStat = async () => {
  let addLine = 0;
  let delLine = 0;

  // @ts-ignore
  const currentMonth = dayjs().format("YYYY-MM");
  const commitList = await request(
    // @ts-ignore
    `https://my.aone.alibaba-inc.com/my/profile/timeline/codeReviewAuthor?_input_charset=utf-8&type=codeReviewAuthor&queryTime=${currentMonth}&profileStaffId=${profileUserInfo.staffId}`
  );

  if (commitList?.repoSummaries) {
    if (commitList?.repoSummaries) {
      commitList?.repoSummaries.forEach((i) => {
        i?.reviews.forEach((j) => {
          addLine += j.addLineCount;
          delLine += j.delLineCount;
        });
      });
    }
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
