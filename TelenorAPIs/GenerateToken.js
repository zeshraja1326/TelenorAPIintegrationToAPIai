// Start Request Module
const request = require('request');
// Headers for the QnA Maker Request

const headers = {
                  "Authorization": "Basic ZWZqV1d2SzFsbDlsMmxIZUxjQkRmTFdtN1BJZFF5Tk46MDQ4VUFYdXZhZnlRUWs4dQ=="
                };
var options = {
                  url: 'https://api.telenor.com.pk/oauthtoken/v1/generate?grant_type=client_credentials',
                  method: 'POST',
                  headers: headers
               };

module.exports.TelenorAPI =  function TelenorAPICall() {
                                  return new Promise(function (resolve, reject) {
                                    request(options, function (error, res, body) {
                                      if (res != undefined)
                                      {
                                      if (!error)
                                          {
                                              console.log('IN Promise No Error Resolving the Promise');
                                              resolve(body);
                                          }
                                      else
                                          {
                                              console.log('IN Promise there is Error');
                                              reject(error);
                                          }
                                       }
                                       else
                                       {
                                         console.log('There is network Problem');
                                         body = null;
                                         resolve(body);

                                       }
                                    });
                                  });
                                }


// (async function(){
//   var result = await TelenorAPICall();
//   console.log(result);
// });
