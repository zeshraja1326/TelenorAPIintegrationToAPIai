//  Setting up the server with express
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

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
      var electricComp = parameters.ElectricityCompanyName.toString().toLowerCase();
      console.log(electricComp);
      PayBill.billpayment(parameters.ConsumerId,electricComp,parameters.SenderMobileNumber,parameters.Amount);
      res.status(200).json({
               source: 'webhook',
               speech: "Consumer Reference with "+parameters.ConsumerId+" has paid "+parameters.Amount+" to "+parameters.ElectricityCompanyName,
              displayText: "Consumer Reference with "+parameters.ConsumerId+" has paid "+parameters.Amount+" to "+parameters.ElectricityCompanyName
            });


    }
    else if (action == "MoneyTransferToMA") {
      console.log(result.parameters);
      MoneyTransfer.EasyPaisaAccount(parameters.ReceiverName,parameters.ReceiverMobileNumber,parameters.Amount,parameters.SenderMobileNumber,parameters.SenderName);
      res.status(200).json({
        source: 'webhook',
        speech: parameters.SenderName+" you have send "+parameters.Amount+" from "+parameters.SenderMobileNumber.toString()+" to "+parameters.ReceiverName+ " on "+parameters.ReceiverMobileNumber.toString(),
       displayText:parameters.SenderName+" you have send "+parameters.Amount+" from "+parameters.SenderMobileNumber.toString()+" to "+parameters.ReceiverName+ " on "+parameters.ReceiverMobileNumber.toString()
      });
    }
    else if (action == "SendMoneyToMA") {
      console.log(result.parameters);
      MoneyTransfer.SendMoneyToMA(parameters.ReceiverMobileAccountNumber.toString(),parameters.Amount, parameters.SenderMobileNumber.toString(),parameters.SenderCNIC);
      res.status(200).json({
               source: 'webhook',
               speech: parameters.SenderMobileNumber+" with "+parameters.SenderCNIC+ " has sent "+parameters.Amount+" to "+parameters.ReceiverMobileAccountNumber,
              displayText: parameters.SenderMobileNumber+" with "+parameters.SenderCNIC+ " has sent "+parameters.Amount+" to "+parameters.ReceiverMobileAccountNumber
            });
    }
    else if (action == "MoneyTransferToBank") {
      console.log(result.parameters);
      var bank_name = ChoseBankValue(parameters.Bank_Name);
      console.log(bank_name);
      MoneyTransfer.MoneyTransferToBankAccount(parameters.ReceiverMobileNumber,parameters.AccountNo, parameters.RceiverName,parameters.Amount,parameters.SenderMobileNumber,parameters.SenderName, bank_name);
      res.status(200).json({
               source: 'webhook',
               speech: parameters.SenderName+" You have send "+parameters.Amount+" to "+parameters.RceiverName.toString(),
              displayText: parameters.SenderName+" You have send "+parameters.Amount+" to "+parameters.RceiverName.toString()
            });
    }

    else  {
      console.log("No Action");
      console.log(result.parameters);
      // res.status(200).json({
      //          source: 'webhook',
      //          speech: "Yor Are Done with transaction",
      //         displayText: "Yor Are Done with transaction"
      //       });
    }

});

 app.listen(port, function(){
     console.log('Express app listening on port ' + port);
 });


 function ChoseBankValue(bank) {
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
   else {
     return "bankaccount_scb.sp"
   }

 }
