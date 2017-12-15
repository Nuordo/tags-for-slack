'use strict';

const AWS = require('aws-sdk');
const DocumentDB = new AWS.DynamoDB.DocumentClient();
const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

const TagsService = new DynamoDBService(DocumentDB, 'tags-for-slack-tags');

const AssignTagCommand = require('./commands/assignTag');
const ListByTagCommand = require('./commands/listByTag');
const ListByUserCommand = require('./commands/listByUser');
const UntagCommand = require('./commands/untag');

exports.handler = slack.handler.bind(slack);

new AssignTagCommand(slack, TagsService);
new ListByTagCommand(slack, TagsService);
new ListByUserCommand(slack, TagsService);
new UntagCommand(slack, TagsService);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
