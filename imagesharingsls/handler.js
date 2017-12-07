'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');
const dbclient = new AWS.DynamoDB.DocumentClient();
module.exports.upload = (event, context, callback) => {
  var s3 = new AWS.S3();
  var params = JSON.parse(event.body);

  var s3Params = {
    Bucket: 'imgsharingbct',
    Key:  params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };
  const dynaparams = {
    TableName: 'imgsharing',
    Item: {
      "id": uuid.v1(),
      "link":params.link,
      "description": params.description
    }
  }
  

  var uploadURL = s3.getSignedUrl('putObject', s3Params);
 dbclient.put(dynaparams, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Error occur while inserting.'));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response);
  })
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}



module.exports.show = (event, context, callback) => {
  var s3 = new AWS.S3();
  var params = JSON.parse(event.body);

  var s3Params = {
    Bucket: 'imgsharingbct',
    Key:  params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };
  const dynaparams = {
    TableName: 'imgsharing',
    Item: {
      "id": uuid.v1(),
      "link":params.link,
      "description": params.description
    }
  }
  

  var uploadURL = s3.getSignedUrl('putObject', s3Params);
 dbclient.put(dynaparams, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Error occur while inserting.'));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response);
  })
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}

 const params = {
  TableName: 'imgsharing'
}
module.exports.show = (event, context, callback) => {
 
  dbclient.scan(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error('Could not display.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);

  })

}