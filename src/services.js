import request from "./request";
import { getUserInfo } from "./utils";

// 获取当前需求
export const getCurrentRequirements = async () => {
  const userInfo = getUserInfo();
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
        toPage: 1,
        pageSize: 15,
        conditions: `{"conditionGroups":[[{"fieldIdentifier":"statusStage","operator":"CONTAINS","value":["1","2"],"toValue":null,"className":"statusStage","format":"multiList","originalIndex":0},{"fieldIdentifier":"assignedTo","operator":"CONTAINS","value":["${userInfo.openId}"],"toValue":null,"className":"user","format":"list","originalIndex":1}]]}`,
        searchType: "LIST",
        scope: "personal",
        groupCondition:
          '{"fieldIdentifier": "category","className":"category","format":"list","value":["Req"],"operator":"EQUALS"}',
      }),
    }
  );
};
