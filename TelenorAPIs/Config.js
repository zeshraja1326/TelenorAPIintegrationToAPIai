const jsonfile = require('jsonfile');
const file = __dirname+'/configs.json';
const GenerateToken = require('./GenerateToken');


    async function GeneratingToken(){
      var result = await GenerateToken.TelenorAPI();
          result = JSON.parse(result);
      console.log(result.access_token);
      var obj = jsonfile.readFileSync(file);
      obj.AUTHORIZATION = 'Bearer '+result.access_token;
      jsonfile.writeFile(file, obj, {spaces: 3}, function(err) {
                                                console.error(err);
      })
    }

    function intervalFunc() {
      console.log('Generating Token now!');
      GeneratingToken();
    }

module.exports.GenerateAccessToken =
                                    function() {
                                                  intervalFunc();
                                                };

module.exports.RefreshAccessToken =
                                    function() {
                                                  setInterval(intervalFunc, 3300000);
                                                };

module.exports.configs = jsonfile.readFileSync(file);
