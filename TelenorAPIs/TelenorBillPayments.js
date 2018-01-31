const config = require('./Config').configs;
const CallAPI = require('./TelenorAPICall');

module.exports.billpayment =
                          async function(response,ConsumerID,BillCompany,SenderNumber,Amount)
                          {
                            var headers =
                                          {
                                            "Authorization": config.AUTHORIZATION,
                                            "X-API-Key":"TelenorAPIGW",
                                            "X-Channel":"apollo",
                                            "X-User-Credential-1": config.Bill_Payment_X_User_Credential_1,
                                            "Content-Type":config.Content_Type
                                          };
                            try {
                              var floatAmount = parseFloat(Amount);

                            } catch (e) {
                              floatAmount = 1.00;
                            }

                            //""internet_nayatel.sp"
                            var data =
                                        {
                                            "currency": "PKR",
                                            "paidAmount": floatAmount,
                                            "supplementaryBillReferenceDetails": [
                                              {
                                                "paymentReferenceType": "consumerno",
                                                "paymentReferenceValue": ConsumerID.toString()
                                              },
                                              {
                                                "paymentReferenceType": "billcompany",
                                                "paymentReferenceValue": "electricity_"+BillCompany.toString()+".sp"
                                              }
                                            ]
                                          };
                                var options = {
                                                  url: 'https://api.telenor.com.pk/v1/mm/accounts/msisdn@'+SenderNumber+'/bills/0/payments',
                                                  method: 'POST',
                                                  headers: headers,
                                                  body: JSON.stringify(data)
                                               };

                               var transactionResult = await CallAPI.TelenorAPI(options);
                               console.log(transactionResult);
                               response.status(200).json({
                                        source: 'webhook',
                                        speech: "Consumer Reference with "+ConsumerID.toString()+" has paid "+Amount.toString()+" to "+BillCompany.toString(),
                                       displayText: "Consumer Reference with "+ConsumerID.toString()+" has paid "+Amount.toString()+" to "+BillCompany.toString()
                                     });


                                };
