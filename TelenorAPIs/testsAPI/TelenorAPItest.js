// Start Request Module
const request = require('request');
// Headers for the QnA Maker Request

const headers = {
                  "Authorization": "Bearer mLlOWi5vjBpAEAM7h14LwiQSrA7h",
                  "X-API-Key": "TelenorAPIGW",
                  "X-Channel": "apollo",
                  "X-User-Credential-1":"MjgwNkA5MjM0NTg1NTk1NjE6NTQzMjE=",
                  "Content-Type":"application/json"
                };
// Doing Request to Microsoft QnA Maker
var data = {
              "currency": "PKR",
              "paidAmount": "111111.00",
              "supplementaryBillReferenceDetails": [
                {
                  "paymentReferenceType": "consumerno",
                  "paymentReferenceValue": "0113134"
                },
                {
                  "paymentReferenceType": "billcompany",
                  "paymentReferenceValue": "electricity_fesco.sp"
                }
              ]
            };

var options = {
                  url: 'https://api.telenor.com.pk/v0/mm/accounts/msisdn@03089299756/bills/0/payments',
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
