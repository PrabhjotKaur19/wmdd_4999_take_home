'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');
module.exports.savedb = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = JSON.parse(event.body);
  var Item = {
      id: uuid.v4(),
      url: params.url,
      description: params.description
  };

  docClient.put({TableName: 'imgsharing', Item: Item}, (error) => {
    if (error) {
      callback(error);
    }

    callback(null, {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
    });
  });
}