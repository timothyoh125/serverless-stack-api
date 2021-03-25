import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler( async (event, context) => {
    const params = {
        TableName: process.env.tableName,

        // Key defines the partition and sort index of item to be removed
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
    };

    await dynamoDb.delete(params);

    return { status: true };
});