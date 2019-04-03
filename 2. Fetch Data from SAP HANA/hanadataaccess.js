var hanaClient = require("@sap/hana-client");

const connection = hanaClient.createConnection();

const connectionParams = {
  host : "3.122.200.232",
  port : "30215",
  uid  : "SYSTEM",
  pwd  : "Aws12345",
  databaseName : "HDB",
  CONNECTTIMEOUT : "2500"
}

module.exports = {
    
    connect: function() {
    
        return new Promise(function(resolve, reject) 
        {
            connection.connect(connectionParams, (err) => {
            
                if (err) {
                    resolve("Connection to HANA instance failed! "+err.message);
                    console.error("[ERROR] Connection error", err);
                }
                else {
                    resolve("Connection successful");
                }
            
            });
        });
    },
    
    load: function() {
        
        return new Promise(function(resolve, reject) 
        {
            const schema = "test";
            const table = "test";
            var sql = `SELECT COUNT(*) AS ROWS FROM "`+schema+`"."`+table+`"`;
            
            connection.exec(sql, (err, rows) => {
                if (err) {
                    resolve("An error occured, could not fetch data! "+err);
                    console.error('[ERROR] SQL execute error:', err);
                }
                else {
                    console.log(rows);
                    console.log("[INFO] # Rows in table "+table+" -> "+rows[0].ROWS);
                    resolve("Data fetched!");
                }
            });
        });    
    }
}