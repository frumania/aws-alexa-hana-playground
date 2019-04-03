# aws-alexa-hana-playground

https://docs.aws.amazon.com/quickstart/latest/sap-hana/welcome.html

## Prerequisites

- For ease of use - adjusted Codestar Role: arn:aws:iam::<ID>:role/CodeStar-<projectID>-Execution
- - Permission Boundary: Select AdministratorAccess
- - Permission: Select AdministratorAccess
- An existing EC2 Key Pair e.g. HANA_DEFAULT
- HANA Software Bundle in S3 Bucket -> s3://..., see [AWS SAP HANA Quick Start](https://docs.aws.amazon.com/quickstart/latest/sap-hana/step-3.html))

## Step 1 - Add Intent & Utterances

Add Intent “DeployHANAIntent” in Skillbuilder
Adjust utterances add confirm
Copy json to Cloud9

## Step 2 - Add Handler 

index.js + register

GIT push

test Lambda

## Step 3 - Add Dependency

"aws-sdk": "^2.433.0"
cd..
cd..

## Step 4 - Provide Code

Add CF Scrip
Async Promise
Test