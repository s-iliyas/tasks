import boto3

# Initialize the AWS clients for Lambda and API Gateway
lambda_client = boto3.client('lambda')
apigateway_client = boto3.client('apigateway')

# Define your Lambda function parameters
function_name = 'MyLambdaFunction'
runtime = 'python3.8'
handler = 'lambda_function.handler'  # Change this to your Lambda handler function
role = 'arn:aws:iam::your-account-id:role/lambda-role'  # Change this to your Lambda execution role ARN
function_code = {
    'S3Bucket': 'your-s3-bucket',
    'S3Key': 'lambda-function.zip'
}

# Create Lambda function (same as before)

# Define your API Gateway parameters
api_name = 'MyApi'
domain_name = 'iliyas.com'  # Your Namecheap domain
base_path = 'v1'
stage_name = 'prod'

# Create API Gateway REST API (same as before)

# Create custom domain name
domain_response = apigateway_client.create_domain_name(
    domainName=domain_name,
    certificateName='my-certificate',
    certificateBody='-----BEGIN CERTIFICATE-----\nYourCertificateBody\n-----END CERTIFICATE-----',
    certificatePrivateKey='-----BEGIN PRIVATE KEY-----\nYourPrivateKey\n-----END PRIVATE KEY-----',
    endpointConfiguration={
        'types': ['REGIONAL']
    }
)

domain_name = domain_response['distributionDomainName']

# Create base path mapping
base_path_mapping_response = apigateway_client.create_base_path_mapping(
    domainName=domain_name,
    restApiId=api_id,
    basePath=base_path,  # Add the base path here
    stage=stage_name
)

print(f'Lambda function created: {lambda_response["FunctionArn"]}')
print(f'API Gateway endpoint: https://{domain_name}/{base_path}')
