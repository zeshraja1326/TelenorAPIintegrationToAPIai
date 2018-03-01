//  Setting up the server with express
const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');

// Configuration of the Access Token Generated from TelenorAPI
const ConfigAccessToken = require('./TelenorAPIs/Config.js');
// Generate Token for the first time
ConfigAccessToken.GenerateAccessToken();
// Refresh the token after expiration
ConfigAccessToken.RefreshAccessToken();

const PayBill = require('./TelenorAPIs/TelenorBillPayments.js');
const MoneyTransfer = require('./TelenorAPIs/TelenorMoneyTransfer.js');

app.use(bodyParser.json());

// Telenor APIs Features
//const telenor = require('./TelenorAPIs/telenorApis.js');

app.post('/webhook',function(req, res){
    //console.log(req.body);
    var result = req.body.result;
    var action = result.action;
    let parameters = result.parameters;
    var transactionResult;


   if (action == "BillPayment") {
      console.log('ConsumerID:');
      console.log(parameters.ConsumerId);
      console.log('Response:');
      var BillCategory = parameters.BillCategory.toString().toLowerCase();
      var electricComp = parameters.ElectricityCompanyName.toString().toLowerCase();
      console.log(electricComp);
      PayBill.billpayment(res,parameters.ConsumerId,electricComp,parameters.SenderMobileNumber,parameters.Amount);

    }
    else if (action == "MoneyTransferToMA") {
      console.log(result.parameters);
      MoneyTransfer.EasyPaisaAccount(res,parameters.ReceiverName,parameters.ReceiverMobileNumber,parameters.Amount,parameters.SenderMobileNumber,parameters.SenderName);

    }
    else if (action == "SendMoneyToMA") {
      console.log(result.parameters);
      MoneyTransfer.SendMoneyToMA(res,parameters.ReceiverMobileAccountNumber.toString(),parameters.Amount, parameters.SenderMobileNumber.toString(),parameters.SenderCNIC);

    }
    else if (action == "MoneyTransferToBank") {
      console.log(result.parameters);
      var bank_name = ChooseBankValue(parameters.Bank_Name);
      console.log(bank_name);
      MoneyTransfer.MoneyTransferToBankAccount(res,parameters.ReceiverMobileNumber,parameters.AccountNo, parameters.RceiverName,parameters.Amount,parameters.SenderMobileNumber,parameters.SenderName, bank_name);

    }

    else if(action == "loginAction")  {
      console.log("No Action");
      MoneyTransfer.TestReturnResponse(res,parameters)
      // res.status(200).json({
      //          source: 'webhook',
      //          speech: "Yor Are Done with transaction",
      //         displayText: "Yor Are Done with transaction"
      //       });
    }
    else {
      console.log('Testing the Access Token');
      console.log(ConfigAccessToken.AUTHORIZATION);
    }

});

 app.listen(port, function(){
     console.log('Express app listening on port ' + port);
 });

 function BillCompany() {

 }


 function ChooseBankValue(bank) {
   if (bank == "AlBaraka Islamic Bank Limited") {
      return "bankaccount_bab.sp"
   }
   else if (bank == "Allied Bank Limited") {
      return "bankaccount_abl.sp"
   }
   else if (bank == "Apna Microfinance Bank") {
      return "bankaccount_apna.sp"
   }
   else if (bank == "Askari Commercial Bank Limited") {
      return "bankaccount_acbl.sp"
   }
   else if (bank == "Bank AlFalah Limited") {
      return "bankaccount_baf.sp"
   }
   else if (bank == "Bank AlHabib Limited") {
      return "bankaccount_bah.sp"
   }
   else if (bank == "Bank Islami Pakistan Limited") {
      return "bankaccount_bipl.sp"
   }
   else if (bank == "Bank of Punjab") {
      return "bankaccount_bop.sp"
   }
   else if (bank == "Burj Bank Limited") {
      return "bankaccount_bbl.sp"
   }
   else if (bank == "Standard Chartered Bank") {
     return "bankaccount_scb.sp"
   }
   else if (bank == "Habib Bank Limited Pakistan") {
     return "bankaccount_hbl.sp"
   }
   else if (bank == "United Bank Limited") {
     return "bankaccount_ubl.sp"
   }
   else if (bank == "Muslim Commercial Bank") {
     return "bankaccount_mcb.sp"
   }
   else if (bank == "Faysal Bank Limited") {
     return "bankaccount_fbl.sp"
   }
   else if (bank == "NIBBank") {
     return "bankaccount_nib.sp"
   }
   else if (bank == "SilkBank") {
     return "bankaccount_silk.sp"
   }
   else if (bank == "Citi Bank") {
     return "bankaccount_citi.sp"
   }
   else if (bank == "Meezan Bank") {
     return "bankaccount_mez.sp"
   }
   else if (bank == "Summit Bank") {
     return "bankaccount_sum.sp"
   }
   else if (bank == "Dubai Islamic Bank") {
     return "bankaccount_dib.sp"
   }
   else if (bank == "Soneri Bank Limited") {
     return "bankaccount_sbl.sp"
   }
   else if (bank == "Habib Metropolitan Bank") {
     return "bankaccount_hmb.sp"
   }
   else if (bank == "JS Bank") {
     return "bankaccount_jsb.sp"
   }
   else if (bank == "KASB Bank") {
      return "bankaccount_kasb.sp"
    }
    else if (bank == "Samba Bank") {
       return "bankaccount_samba.sp"
     }
     else if (bank == "Sindh Bank") {
        return "bankaccount_sindhbank.sp"
    }
    else if (bank == "UBank") {
       return "bankaccount_ubank.sp"
     }
     else if (bank == "Waseela") {
        return "bankaccount_waseela.sp"
      }
      else if (bank == "FINCA Bank") {
         return "bankaccount_finca.sp"
       }

 }
