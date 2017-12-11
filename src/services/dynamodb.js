class DynamoDBService {
  constructor (documentClient, tableName) {
    this.db = documentClient
    this.tableName = tableName
  }

  getByUserId (teamId, userId) {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'userId = :userId and teamId = :teamId',
      ExpressionAttributeValues: { ':userId': userId, ':teamId': teamId }
    }

    return this.db
      .scan(params)
      .promise()
      .then(data => data.Items)
  }

  getByTag (teamId, tag) {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'tag = :tag and teamId = :teamId',
      ExpressionAttributeValues: { ':tag': tag, ':teamId': teamId }
    }

    return this.db
      .scan(params)
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
