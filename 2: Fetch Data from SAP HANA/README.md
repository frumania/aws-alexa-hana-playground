# aws-alexa-hana-playground

## Prerequisites

- HANA deployment either in same VPC like the lambda function or public IP / access
- HANA DB user & password
- HANA sample schema & table
- Codestar IAM Policy + Boundary (-> Policy Administrator)

## Step 1 - Add Intent & Utterances

Add Intent "HANARequestData" in Skillbuilder
Adjust utterances
Copy json to Cloud9

## Step 2 - Add Handler 

index.js + register

GIT push

test Lambda

## Step 3 - Add Dependency

package.json → "@sap/hana-client": "^2.3.134"

Run (local testing)
npm config set @sap:registry https://npm.sap.com
npm install @sap/hana-client

Test locally

Adjust buildspec.yml
npm config set @sap:registry https://npm.sap.com (https://npm.sap.com/)

## Step 4 - Provide Code

Add HANA Connection Code
Async Promise
Test