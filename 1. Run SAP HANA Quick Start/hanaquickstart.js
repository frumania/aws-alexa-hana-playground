var AWS = require('aws-sdk');
var cloudformation = new AWS.CloudFormation();

var stackname = 'SAP-HANA-on-AWS-demo';

module.exports = {
    
    createInstance: function() {
    
        return new Promise(function(resolve, reject) 
        {
            //See https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html
            var params = {
            StackName: stackname,
            /*ClientRequestToken: 'hana1',*/
            Capabilities: [
            "CAPABILITY_IAM", "CAPABILITY_AUTO_EXPAND"
            ],
            Parameters: [
            {
              ParameterKey: 'AvailabilityZone',
              ParameterValue: 'eu-west-1a'
            },
            {
              ParameterKey: 'KeyName',
              ParameterValue: 'HANA_DEFAULT'
            },
            {
              ParameterKey: 'HANAMasterPass',
              ParameterValue: 'Aws12345'
            },
            {
              ParameterKey: 'HANAInstallMedia',
              ParameterValue: 's3://sap-sources/HANA_SOFTWARE/'
            },
            {
              ParameterKey: 'InstallHANA',
              ParameterValue: 'Yes'
            },
            {
              ParameterKey: 'InstallRDPInstance',
              ParameterValue: 'No'
            }
            ],
            TemplateURL: 'https://aws-quickstart.s3.amazonaws.com/quickstart-sap-hana/templates/SAP-HANA-NewVPC.template'
            };

            cloudformation.createStack(params, function(err, data) {
                if (err)
                {
                  resolve("Deployment cannot be started! "+err.message);
                  console.error(err, err.stack); //DEBUG
                }
                else
                {
                  resolve('Deployment of SAP HANA sandbox started! Logon information will be mailed to you when system is ready!');
                  console.log(data); //DEBUG
                  //TODO SENT MAIL
                }
            })
        });
    },
    
    getStatus: function() {
        
        return new Promise(function(resolve, reject) 
        {
            var params = {
                StackName: stackname
            };
        
            cloudformation.describeStacks(params, function(err, data) {
                if (err)
                {
                    resolve("Could not find any active SAP HANA deployment! "+err.message);
                    console.error(err, err.stack); //DEBUG
                }
                else
                {
                    switch (data.Stacks[0].StackStatus) {
                      case 'CREATE_IN_PROGRESS':
                        resolve('SAP HANA Deployment in progress, please check again later!');
                        break;
                      case 'CREATE_FAILED':
                        resolve('SAP HANA Deployment failed. Please check the cloud formation and instance system logs!');
                        break;
                      case 'ROLLBACK_IN_PROGRESS':
                        resolve('SAP HANA Deployment failed. Please check the cloud formation and instance system logs!');
                        break;
                      case 'ROLLBACK_COMPLETE':
                        resolve('SAP HANA Deployment failed. Please check the cloud formation and instance system logs!');
                        break;
                      case 'CREATE_COMPLETE':
                        resolve('SAP HANA Deployment finished successfully. Check your inbox for more details!');
                        break;
                      default:
                        resolve('SAP HANA Deployment has the following status: '+data.Stacks[0].StackStatus);
                    }
                
                console.log(data); //DEBUG
                }
            })
        }); 
    }
}