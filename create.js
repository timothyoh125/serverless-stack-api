import * as uuid from "uuid";
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    // Parse request body from the event body i.e. HTTP request
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            // attributes of item that is added to dynamoDb table
            userId: event.requestContext.identity.cognitoIdentityId, // id of the author
            noteId: uuid.v1(), // unique uuid
            content: data.content, // body parsed from HTTP request
            attachment: data.attachment, // parsed file attachment from request body
            createdAt: Date.now(), // current Unix timestamp
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});