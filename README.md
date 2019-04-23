# Welcome to the SAP HANA playground for Alexa

This repository is meant as guided walkthrough to create interactions between **Amazon Alexa** and **SAP HANA**.
It is currently divided into the following parts

0. **Getting Started**: Prepares dev environment and introduces the hello world template including testing, based on AWS Codestar and Cloud9
1. **Run SAP HANA Quick Start**: Example on how to trigger AWS Cloud Formation scripts from Alexa, in particular triggering the AWS Quick Start for SAP HANA, deploying a new SAP HANA sandbox on demand
2. **Fetch Data from SAP HANA**: Example on how to fetch data from an existing SAP HANA database
3. **Bonus**: Advanced tasks e.g. X-Ray :)

Tested in region **eu-west-1 (Ireland)**

## Covered Topics

- Being **Serverless** via AWS Lambda
- **Continous Integration / Deployment** (CI/CD) via AWS Codestar, CodeCommit, CodeBuild, CodeDeploy, CodePipeline
- Skill development for **Amazon Alexa**
- **SAP HANA** Deployment and Integration
- **Infrastructure as Code / Automation** via AWS Cloud Formation and AWS Quick Start for SAP HANA
- Bonus: AWS Simple Email Service (SES), X-Ray, ...

## Demo & Alexa Commands

@1  
*start hana playground*  
*Deploy a new HANA sandbox*  
*What's the status*  

<img src="assets/alexa_demo1.jpg" width="300" >

@2  
*start hana playground*  
*which flight destinations does lufthansa offer from frankfurt*  
*which flight destinations does singapore airlines offer from frankfurt*  

<img src="assets/alexa_demo2.jpg" width="300" >

## Architecture

Developer Perspective

![image](assets/Architecture1.jpg)

End User / Test Perspective

![image](assets/Architecture2.jpg)

## Useful Resources

[Automated Test and Deployment of Alexa Skills (BER SUMMIT 2019)](https://aws-de-marketing.s3-eu-central-1.amazonaws.com/Field%20Marketing/Summit-Berlin-2019/Presentations/AWS_Summit_Berlin_2019_Feb27_AutomatingTestandDeploymentofAlexaSkills.pdf))

## License

[![Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)](./LICENSE.txt)