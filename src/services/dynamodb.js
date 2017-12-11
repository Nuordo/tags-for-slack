class DynamoDBService {
  constructor (documentClient, tableName) {
    this.db = documentClient
    this.tableName = tableName
  }

  get (userId) {
    const params = {
      TableName: this.tableName,
      IndexName: 'UserTagsIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId }
    }

    return this.db
      .query(params)
      .promise()
      .then(data => data.Items)
  }

  put (Item) {
    if (!Item.userId) {
      return Promise.reject('Item.userId is not defined!')
    }

    const params = {
      TableName: this.tableName,
      Item
    }

    return this.db.put(params).promise()
  }

  delete (userId, tag) {
    const params = {
      TableName: this.tableName,
      Key: {
        userId,
        tag
      }
    }

    return this.db.delete(params).promise()
  }
}

module.exports = DynamoDBService
