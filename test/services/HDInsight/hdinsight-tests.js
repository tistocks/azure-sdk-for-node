/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var assert = require('assert');
var mocha = require('mocha');
var should = require('should');
var sinon = require('sinon');

// Test includes
var testutil = require('../../util/util');

var HDInsightUtil = require('./hdinsight-util.js');

var azure = testutil.libRequire('azure');
var hdInsightUtil;

describe('HDInsight Test', function() {
  var storageAccounts;
  var sqlServers;

  var storage1Name = "azurehdxstrtst00";
  var storage2Name = "azurehdxstrtst01";
  var foundStorage1 = false;
  var foundStorage2 = false;

  var subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
  var auth = { keyvalue: testutil.getCertificateKey(), certvalue: testutil.getCertificate() };
  var serviceMan = azure.createServiceManagementService(subscriptionId, auth);
  var sqlMan = azure.createSqlManagementService(subscriptionId, auth);
  var HDInsight = require('../../../lib/services/serviceManagement/hdinsightservice.js');
  var hdInsight = azure.createHDInsightService(subscriptionId, auth);
  var WebResource = require('../../../lib/http/webresource');
  var _performRequestSpy;
  var _performRequestOriginal;

  // var createStorageAccountAndWait = function (name, next) {
  //   serviceMan.listStorageAccounts(function (err, response)) {
  //   }
  // };

  beforeEach(function (done) {
    hdInsightUtil.NoStubProcessRequest();
    done();
  });

  afterEach(function (done) {
    hdInsightUtil.NoStubProcessRequest();
    done();
  });

  after(function (done) {
    hdInsightUtil.Revert();
    done();
  });

  // NOTE: To Do, we should actually create new acounts for our tests
  //       So that we can work on any existing subscription.
  before (function (done) {
    hdInsightUtil = new HDInsightUtil(HDInsight);
    // this._performRequestOriginal = hdInsight._performRequest;
    // this._performRequestSpy = sinon.spy(hdInsight, '_performRequest');
    // hdInsight._performRequest = this._performRequestSpy;
    // this._performRequestOriginal.should.eql('');
    // false.should.be.eql(true);
    // console.log(typeof(hdInsight._performRequest));
    // hdInsight._performRequest = sinon.stub(hdInsight, '_performRequest', function(a, b , c, callback) {
    //   callback({ error: null, response: response }, function(responseObject, finalCallback) {
    //   // callback({ error: null, response: response }, function(responseObject, finalCallback) {
    //     finalCallback(responseObject);
    //   });
    // });

    // serviceMan.listStorageAccounts(function (err, response) {
    //   should.not.exist(err);
    //   should.exist(response.body);
    //   // // response.body.length.should.eql(2);
    //   // for(var i in response.body)
    //   // {
    //   //   if (response.body[i].ServiceName === storage1Name)
    //   //   {
    //   //     foundStorage1 = true;
    //   //   }
    //   //   else if (response.body[i].ServiceName === storage2Name)
    //   //   {
    //   //     foundStorage2 = true;
    //   //   }
    //   // }
    //   // if (!foundStorage1)
    //   // {
    //   //   var options = {};
    //   //   options.Location = 'East US';
    //   //   serviceMan.createStorageAccount(storage1Name, options, function(err, response) {
    //   //     "asdf".should.eql(response);
    //   //     done(err);
    //   //   });
    //   // }
    //   storageAccounts = response.body;

    //   sqlMan.listServers(function (err, response) {
    //     should.not.exist(err);
    //     should.exists(response);
    //     // response.length.should.eql(2);
    //     sqlServers = response;
    //     done(err);
    //   });
    // });
    done();
  });


  it('should run tests', function (done) {
    var result;
    // hdInsightUtil.StubProcessRequestWithError(403, 'Unauthorized', 'You are not authorized');
    hdInsightUtil.StubProcessRequestWithSuccess("foo");
    hdInsight.listClusters(function (err, response) {
      console.log(err);
      console.log(response);
      should.not.exist(err);
      // response.bar.should.eql('foo');
      response.should.eql('');
      // response.length.should.eql(2);
      done(err);
    });
  });

  it('should list storage accounts', function (done) {
    var result;

    hdInsight.listClusters(function (err, response) {
      console.log(err);
      console.log(response);
      should.not.exist(err);
      // response.bar.should.eql('foo');
      response.should.eql('');
      // response.length.should.eql(2);
      done(err);
    });
  });

});