import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,

        // key defines keys used to specify item we want from ddb
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId, // id of the author
            noteId: event.pathParameters.id, // id of the note from path
        },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found");
    }

    return result.Item;
});