# `hops-lambda`

[![npm](https://img.shields.io/npm/v/hops-lambda.svg)](https://www.npmjs.com/package/hops-lambda)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that takes care of deploying your application to [AWS Lambda](https://aws.amazon.com/lambda/).

### Installation

Add this preset to your existing Hops project:

```bash
npm install --save hops-lambda
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### CLI

When installed, this preset will add a new CLI command: `$ hops lambda` with the following sub-commands:

#### `lambda deploy`

Executing this command will bundle all your dependencies and build artifacts into a single `.zip` file and deploy them to your Lambda function (or create a new Lambda function, if no previous stack was found).

#### `lambda destroy`

This command will destroy your CloudFormation stack and remove all resources that had been previously created.

##### Arguments

###### `--yes`

Specify this argument to skip the interactive prompts.

###### `--keep-files`

You can choose to keep the files that have been uploaded to your S3 bucket.

###### `--keep-bucket`

Choose this, if you don't want to delete the S3 bucket but instead empty it.

### Usage

#### AWS Configuration

In order to use this preset, you need to configure your AWS credentials.

To set-up your credentials in a `~/.aws/credentials` file, please [follow this article](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html).

To set-up your credentials via environment variables, you can define the following variables:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` (optional, only required for [MFA](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/))

#### Simple deployment

To quickly deploy a Hops application to AWS Lambda you need to have `basePath` and `assetPath` set to `prod` (or your configured `stageName`, if you have a differently named stage) and execute a build `$ hops build -p`.

Then execute:

```bash
$ hops build -p
$ hops lambda deploy
```

To update your application, simply do your code changes, build again and execute `hops lambda deploy` again and it will only update the parts that have changed since your last deployment.

#### NodeJS Runtime

The Lambda runtime supports two Node versions, that intersects Hops's supported version range: `nodejs10.x` and `nodejs12.x`. To explicitly set a Node version, use the [`"node"`-property](https://github.com/untool/untool/tree/v2.x/packages/webpack#node) of the Hops config. If the property is not set, Hops will detect and use the Node version of the development environment.

[Learn more about the available Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html).

#### Custom Domain

If you want your application to be available on a custom domain, you need to configure `domainName` and `certificateArn`. Optionally you can set a custom `basePath` and `assetPath` if you want your application to be available on a different path.

##### Create / Upload Certificate in AWS Certificate Manager (ACM)

In order to use a custom domain name for your Hops application, you need to create or import an SSL certificate in the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/).

Check out the [documentation of ACM](http://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html), especially the sections about [importing](http://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html) or [requesting](http://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request.html) a certificate.

**Important:** Even if you deploy your application in a different region, you need to import or request the certificate in the region `us-east-1` (see the section about CloudFront and ACM [here](http://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html)).

##### Set-up DNS records

Once you have imported or requested a certificate in ACM, you need to configure its [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) and your custom domain name in your [preset config](#preset-options).

Then, after you execute `hops lambda deploy` you will get an output with a CloudFront distribution address, which you need to configure with your DNS provider as an A-record or CNAME. Read more about it [here](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html#how-to-custom-domains-console).

#### Multi-Stage deployment

At the moment it is not possible to do a multi-stage deployment with a single CloudFormation stack.\
If you want to do it however, you will have to create multiple stacks, for example by changing the `package.json`s `name` field or the AWS configs `uniqueName` value and then execute `hops lambda deploy` again.

### Configuration

#### Preset Options

This preset can be configured through the `"aws"` key in your preset config.

```json
"hops": {
  "aws": {
    "region": "eu-central-1"
  }
}
```

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `aws.region`\* | `String` | `us-east-1` | _no_ | The AWS Region in which the resources should be created |
| `aws.uniqueName` | `String` | `hops-lambda-$name` | _no_ | A unique name that is used to identify the AWS CloudFormation Stack and S3 bucket. |
| `aws.memorySize` | `Number` | `128` | _no_ | The memory allocated to your Lambda function |
| `aws.stageName` | `String` | `prod` | _no_ | The name of your API Gateway stage |
| `aws.domainName` | `String` | `''` | _no_ | A custom domain name |
| `aws.certificateArn` | `String` | `''` | _no_ | If a custom domain is used, this option needs to specify the ARN of a valid SSL certificate in ACM |
| `aws.cloudformationTemplateFile` | `String` | `node_modules/hops-lambda/cloudformation.yaml` | _no_ | Path to a custom CloudFormation template |

- \* If no region is configured via the preset config, `hops-lambda` will try to read `AWS_REGION` and `AWS_DEFAULT_REGION` from your environment first before defaulting to `us-east-1`.

##### `region`

The [AWS Region](https://docs.aws.amazon.com/general/latest/gr/rande.html#apigateway_region) in which your resources will be created. You can configure this either through this config key or you can set one of the following environment variables: `AWS_REGION`, `AWS_DEFAULT_REGION`.

##### `uniqueName`

This is a unique identifier that is being used to identify your CloudFormation stack. Changing this option only makes sense, if you want to do a [multi-stage deployment](#multi-stage-deployment).

##### `memorySize`

By changing this value you can increase the memory size _and_ the compute power that is available to your Lambda function. AWS allocates CPU power proportional to your memory size, so increasing this value will increase the performance of your application.

Read more about [memory and CPU power](https://docs.aws.amazon.com/lambda/latest/dg/resource-model.html) and [limits of Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)

##### `stageName`

The stage name is a concept of the AWS API Gateway and is usually used to separate API versions. Since you can not create an API Gateway without a stage this property defaults to `prod`.

When you use a custom domain, you won't have to worry about the stage name, but in the case of a simple deployment to the API Gateway, the stageName will become your `basePath`: `https://{random-id}.execute-api.{region}.amazonaws.com/{stageName}` and therefore you need to set your `basePath` _and_ `assetPath` to include the `stageName`.

```json
"hops": {
  "basePath": "/my-stage",
  "assetPath": "/my-stage/assets",
  "aws": {
    "stageName": "my-stage"
  }
}
```

##### `domainName`

If you want your application to be available on a custom domain you can configure that domain name with this option. **Also note**: When using a custom domain the `certificateArn` option _must_ be configured.

```json
"hops": {
  "aws": {
    "domainName": "my-domain.com",
    "certificateArn": "arn:aws:acm:..."
  }
}
```

##### `certificateArn`

The ARN of your SSL certificate that you have imported or generated through the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/).

```json
"hops": {
  "aws": {
    "certificateArn": "arn:aws:acm:..."
  }
}
```

##### `cloudformationTemplateFile`

In case you need additional resources in your CloudFormation template, you can overwrite the default CloudFormation template using this option.

In order to pass additional parameters to your CloudFormation stack you need to call the [`deployLambda(parameterOverrides)`](#deploylambdaparameteroverrides-promiseoutputs) mixin method yourself. These parameters will get merged with the default parameters that Hops sends to the stack.

```json
"hops": {
  "aws": {
    "cloudformationTemplateFile": "./path/to/my/template.yaml"
  }
}
```

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `deployLambda(parameterOverrides): Promise<Outputs>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

Call this method from a mixin to programmatically execute a Lambda deployment.

You can overwrite or pass additional parameters to the CloudFormation stack by using `parameterOverrides`, which should be an object whose entries correspond to the names/values of the parameters.

#### `destroyLambda(): Promise<void>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

Use this mixin method to programmatically destroy the CloudFormation stack and all its associated resources.
