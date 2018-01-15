const config = require('./Config');
const CallAPI = require('./TelenorAPICall');

module.exports.EasyPaisaAccount =
                              async function( ReceiverNumber,ReceiverName,AmountToTransfer, SenderNumber, SenderName)
                              {
                                    var headers =
                                                  {
                                                    "Authorization": config.AUTHORIZATION,
                                                    "X-API-Key":"TelenorAPIGW",
                                                    "X-Channel":"tezfin",
                                                    "X-User-Credential-1": config.MONEY_TRANSFER_X_User_Credential_1,
                                                    "Content-Type":config.Content_Type
                                                  };
                                    try {
                                      var floatAmount = parseFloat(AmountToTransfer);

                                    } catch (e) {
                                      floatAmount = 1.00;
                                    }
                                    var data =
                                    {
                                          "amount": floatAmount,
                                          "currency": "PKR",
                                          "type": "transfer",
                                          "subType": "MA",
                                          "requestDate": "2017-08-16T11:32:03.449Z/",
                                          "debitParty": [
                                                          {
                                                          "key": "msisdn",
                                                          "value": SenderNumber.toString()
                                                          }
                                                        ],
                                          "creditParty": [
                                                            {
                                                            "key": "msisdn",
                                                            "value": ReceiverNumber.toString()
                                                            }
                                                          ],
                                          "senderKyc": {
                                                        "Name": SenderName.toString()
                                                        },
                                          "recipientKyc": {
                                                            "Name": ReceiverName.toString()
                                                            }
                                    }
                                var options = {
                                                  url: 'https://api.telenor.com.pk/transferMA/v1/mm/transactions',
                                                  method: 'POST',
                                                  headers: headers,
                                                  body: JSON.stringify(data)
                                               };

                                 var transactionResult = await CallAPI.TelenorAPI(options);
                                 console.log(transactionResult);

                                };


module.exports.SendMoneyToMA =
                              async function( ReceiverNumber,AmountToTransfer, SenderNumber, SenderCNIC)
                                {
                                      var headers =
                                                    {
                                                      "Authorization": config.AUTHORIZATION,
                                                      "X-API-Key":"TelenorAPIGW",
                                                      "X-Channel":"tezfin",
                                                      "X-User-Credential-1": config.Send_Money_To_MA_X_User_Credential_1,
                                                      "Content-Type":config.Content_Type
                                                    };
                                      try {
                                        var floatAmount = parseFloat(AmountToTransfer);

                                      } catch (e) {
                                        floatAmount = 1.00;
                                      }
                                      var data =
                                                {
                                                    "amount": floatAmount,
                                                    "currency": "PKR",
                                                    "type": "transfer",
                                                    "subType": "otcToMa",
                                                    "requestDate": "2017-08-16T11:32:03.449Z",
                                                    "debitParty":
                                                            [
                                                              {
                                                              "key": "msisdn",
                                                              "value": SenderNumber
                                                              }
                                                            ],
                                                    "creditParty":
                                                            [
                                                              {
                                                              "key": "msisdn",
                                                              "value": ReceiverNumber
                                                              }
                                                            ],
                                                    "senderKyc":
                                                         {
                                                            "idDocument":
                                                              [
                                                                {
                                                                "idType": "nationalidcard",
                                                                "idNumber": SenderCNIC
                                                                }
                                                              ]
                                                        }
                                                };

                                  var options = {
                                                    url: 'https://api.telenor.com.pk/otctoma/v1/mm/transactions',
                                                    method: 'POST',
                                                    headers: headers,
                                                    body: JSON.stringify(data)
                                                 };

                                   var transactionResult = await CallAPI.TelenorAPI(options);
                                   console.log(transactionResult);

                             };

module.exports.MoneyTransferToBankAccount =
                                          async function( ReceiverNumber,AccountNo,ReceiverName,AmountToTransfer, SenderNumber, SenderName,BankName)
                                            {
                                                  var headers =
                                                                {
                                                                  "Authorization": config.AUTHORIZATION,
                                                                  "X-API-Key":"TelenorAPIGW",
                                                                  "X-Channel":"gsma2",
                                                                  "X-User-Credential-1": config.Money_Transfer_To_Bank_X_User_Credential_1,
                                                                  "Content-Type":config.Content_Type
                                                                };
                                                  try {
                                                    var floatAmount = parseFloat(AmountToTransfer);

                                                  } catch (e) {
                                                    floatAmount = 1.00;
                                                  }
                                                  var data =
                                                            {
                                                                "amount": floatAmount,
                                                                "currency": "PKR",
                                                                "type": "transfer",
                                                                "subType": "Bank",
                                                                "requestDate": "2017-08-16T11:32:03.449Z",
                                                                "debitParty": [
                                                                                 {
                                                                                   "key": "msisdn",
                                                                                   "value": SenderNumber
                                                                                 }
                                                                              ],
                                                                "creditParty": [
                                                                                   {
                                                                                     "key": "bankaccountno",
                                                                                     "value": AccountNo
                                                                                   },

                                                                                   {
                                                                                     "key": "bankaccounttitle",
                                                                                     "value": ReceiverName
                                                                                   },

                                                                                   {
                                                                                     "key": "bankname",
                                                                                     "value": "bankaccount_"+BankName+".sp"
                                                                                   },


                                                                                   {
                                                                                     "key": "msisdn",
                                                                                     "value": ReceiverNumber
                                                                                   }
                                                                                ],

                                                                "senderKyc": {
                                                                               "Name": SenderName
                                                                              }
                                                            };

                                              var options = {
                                                                url: 'https://api.telenor.com.pk/transferBank/v1/mm/transactions',
                                                                method: 'POST',
                                                                headers: headers,
                                                                body: JSON.stringify(data)
                                                             };

                                               var transactionResult = await CallAPI.TelenorAPI(options);
                                               console.log(transactionResult);

                                          };
