// Start Request Module
const request = require('request');
// Headers for the QnA Maker Request

const headers = {
                  "Authorization": "Bearer DfNOt9AGnlRdYKAGrixamrjjFw2l",
                  "X-API-Key": "TelenorAPIGW",
                  "X-Channel": "apollo",
                  "X-User-Credential-1":"YUNrREVXYW5SdEhMZDNMNlNnekFzMHlCOCt3bmI1WS96YVp4TjVHNUpKZFZhT1I2VE9US3BrRXZZWnd2YWszeA==",
                  "Content-Type":"application/json"
                };
// Doing Request to Microsoft QnA Maker
var data = {
              "currency": "PKR",
              "paidAmount": "1.00",
              "supplementaryBillReferenceDetails": [
                {
                  "paymentReferenceType": "consumerno",
                  "paymentReferenceValue": "28885"
                },
                {
                  "paymentReferenceType": "billcompany",
                  "paymentReferenceValue": "internet_nayatel.sp"
                }
              ]
            };

var options = {
                  url: 'https://api.telenor.com.pk/v1/mm/accounts/msisdn@923458559561/bills/0/payments',
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(data)
               };

function RequestToQnA(options) {
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
// End of Request to QnA Module

(async function(){
  var result = await RequestToQnA(options);
  console.log(result);
})();
