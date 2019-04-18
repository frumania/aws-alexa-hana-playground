var hanaClient = require("@sap/hana-client");

var connection = hanaClient.createConnection();

var connectionParams = {
  host : "<Hostname/IP-Address>",
  port : "<Port = typically 5 digits 3<InstanceID>15",
  uid  : "<HDBUser>",
  pwd  : "<HDBPassword>",
  databaseName : "<DBName e.g. HDB>",
  CONNECTTIMEOUT : "2500" //Should be smaller than the lambda execution time (default 3s, can be changed) and the Alexa timeout (10s, cannot be changed)
}

var connected = false;

module.exports = {
    
    connect: function(){
        
        return new Promise(function(resolve, reject) 
        {
            if(connected){
                resolve();
            }
            else{
                connection.connect(connectionParams, (err) => {
                    
                    if (err) {
                        reject("Connection to HANA instance failed! "+err.message);
                        console.error("Connection error", err);
                    }
                    else {
                        connected = true;
                        console.log("Connection established successfully!")
                        resolve();
                    }
                });
            }
        });
          
    },
    
    //EXAMPLE1
    test: function() {
        
        var that = this;
    
        return new Promise(function(resolve, reject) 
        {
            that.connect().then(function() {
                //connection established
                
                const schema = "SFLIGHT";
                const table = "SFLIGHT";
                var sql = `SELECT COUNT(*) AS ROWS FROM "`+schema+`"."`+table+`"`;
    
                connection.exec(sql, (err, rows) => {
                    if (err) {
                        resolve("An error occured, could not fetch data! "+err);
                        console.error('[ERROR] SQL execute error:', err);
                    }
                    else {
                        console.log(rows);
                        console.log("[INFO] # Rows in table "+table+" -> "+rows[0].ROWS);
                        resolve("Fetched "+rows[0].ROWS+" rows from table "+table);
                    }
                });
               
              }, function(error) {
                // connection failed
                resolve(error);
            });
        });
    },
    
    //EXAMPLE2
    fetchFlights: function(handlerInput) {
        
        var that = this;
        
        var slots = handlerInput.requestEnvelope.request.intent.slots;
    
        return new Promise(function(resolve, reject) 
        {
            that.connect().then(function() {
                //connection established
                
                const schema = "SFLIGHT";
                
                var city = slots.City.value;
                var carrier = slots.Carrier.value;
                
                console.log(city);
                console.log(carrier);
                
                var sql = `SELECT DISTINCT CITYTO FROM "`+schema+`"."SPFLI" WHERE CARRID = (SELECT DISTINCT CARRID FROM "`+schema+`"."SCARR" WHERE LCASE(CARRNAME) = LCASE('`+carrier+`') AND LCASE(CITYFROM) = LCASE('`+city+`'))`
                console.log(sql);
                
                connection.exec(sql, (err, rows) => {
                    if (err) {
                        resolve("An error occured, could not fetch data! "+err);
                        console.error('[ERROR] SQL execute error:', err);
                    }
                    else {
                        console.log(rows);
                        
                        var cities = "";
                        
                        rows.forEach(function(element) {
                          cities += element.CITYTO+",";
                        });
                        
                        if(rows.length == 0)
                        resolve(carrier+" is offering no flights out of "+city);
                         
                        if(rows.length == 1)
                        resolve(carrier+" is offering "+rows.length+" flight out of "+city+" with destination "+cities);
                        
                        if(rows.length > 1)
                        resolve(carrier+" is offering "+rows.length+" flights out of "+city+" with destinations "+cities);
                    }
                });
               
              }, function(error) {
                // connection failed
                resolve(error);
            });
        });
    }
}