import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,

        // 'KeyConditionExpression' defines condition for query
        // Basically how do we want to query for items in ddb
        // - 'userId = :userId': only returns items with matching 'userId'
        // partition key
        KeyConditionExpression: "userId = :userId",
        // 'ExpressionAttributeValues' defines values for attributes passed
        // to key condition expression
        // - ':userId': defines 'userId' to be id of the author
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});