// Start Request Module
const request = require('request');
// Headers for the QnA Maker Request

module.exports.TelenorAPI = function(options) {
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
                                };
// End of Request to QnA Module
