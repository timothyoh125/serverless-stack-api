import handler from "./libs/handler-lib";
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // Key defines the partitio and sort key of item that should be updated
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the item attributes to be updated in ddb
        // 'ExpressionAttributeValues' defines value in update expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content" : data.content || null,
        },
        // 'ReturnValues' specifies if and how to return item's attributes
        // ALL_NEW returns all attributes of the item after the update
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);
    return { status: true };
});