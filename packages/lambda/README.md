# Hops Lambda

[![npm](https://img.shields.io/npm/v/hops-lambda.svg)](https://www.npmjs.com/package/hops-lambda)

Hops Lambda allows you to quickly deploy your hops application to AWS Lambda.

## Quick Start

This is the minimal configuration required to get started with hops-lambda:

`package.json`

```diff
--- a/package.json
+++ b/package.json
   "hops": {
+    "assetPath": "prod",
+    "basePath": "prod",
     "browsers": "last 1 Chrome versions",
+    "node": "8.10"
   },
   "dependencies": {
     "hops-express": "^9.0.0",
+    "hops-lambda": "^9.0.0",
     "hops-react": "^9.0.0",
     "hops-redux": "^9.0.0",
```

And then you need to provide your AWS credentials and region config (for example by exporting them in your terminal):

```bash
export AWS_ACCESS_KEY_ID=key
export AWS_SECRET_ACCESS_KEY=geheim
export AWS_REGION=eu-central-1
```

After that you can deploy by executing:

```bash
hops lambda deploy
```

In your terminal.

# Installation

In order to use hops-lambda, you need to add it to your project dependencies.

```bash
npm install --save hops-lambda
```

or

```bash
yarn add hops-lambda
```

Also note, that hops-lambda has a peer dependency to [hops-express](https://github.com/xing/hops/tree/master/packages/express) which needs to be installed in your project too.

# Configuration

In order to use hops-lambda you need to define the Node.js target version for which babel should transpile your code. Because the most recent Node.js version on AWS Lambda is v8.10 you need to set your `node` target in [hops-config](https://github.com/xing/hops/blob/master/packages/config/README.md#available-options) to `8.10`.

```json
{
  "hops": {
    "node": "8.10"
  }
}
```

### Available options through Hops npm config

The following options are supported in a [hops-config](https://github.com/xing/hops/tree/master/packages/config) `_aws` object.

```json
{
  "name": "foo",
  "version": "1.0.0",
  "hops": {
    "_aws": {
      ...
    }
  }
}
```

| Field                        | Type     | Description                                                                                                                                         |
| ---------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `region`\*                   | `String` | The AWS Region in which the resources should be created. Defaults to `us-east-1`                                                                    |
| `uniqueName`                 | `String` | A unique name, used as CloudFormation stack name and S3 bucket name. Defaults to `hops-lambda-${packageJson.name}`                                  |
| `memorySize`                 | `Number` | The memory allocated to your Lambda function. Defaults to `128`. Valid values: (`128` - `1536`)                                                     |
| `stageName`                  | `String` | The name of your API Gateway stage. Defaults to `prod`                                                                                              |
| `domainName`                 | `String` | A custom domain name. Defaults to `''`                                                                                                              |
| `certificateArn`             | `String` | If you use a custom domain you need to specify the ARN of a SSL certificate in [ACM](https://aws.amazon.com/certificate-manager/). Defaults to `''` |
| `cloudformationTemplateFile` | `String` | Path to a custom CloudFormation template. Defaults to `node_modules/hops-lambda/cloudformation.yaml`                                                |

- If the region is not set via hops config, it will try `AWS_REGION` and `AWS_DEFAULT_REGION` in your environment first, before defaulting to `us-east-1`.

If you use hops-lambda without a custom domain, you need to set your [hops-config](https://github.com/xing/hops/blob/master/packages/config/README.md#available-options) `basePath` and `assetPath` to the same value as your `stageName` (see above).

### AWS Configuration

After you have configured your `package.json` (as described above), you also need to configure your AWS credentials.

To set-up your credentials in a `~/.aws/credentials` file, please [follow this article](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html).

To set-up your credentials via environment variables, you can define the following variables:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` (optional, only required for [MFA](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/))

# Usage

Hops Lambda allows you to quickly deploy (and remove) your hops applications on AWS Lambda.

## CLI

The hops-lambda package, when installed, adds a new `hops lambda` command, which contains two sub-commands:

- `hops lambda deploy`
- `hops lambda destroy [--yes] [--keep-files] [--keep-bucket]`

You can use the integrated help in the CLI to get more information on the available options.

## Simple deployment

To quickly deploy a Hops application to AWS Lambda you need to have your AWS credentials set up (see AWS Configuration above). And you also need to have `basePath` and `assetPath` set to `prod` (or your configured `stageName`, if you have a differently named stage).

Then execute:

```bash
hops lambda deploy
```

To update your application, simply do your code changes and execute `hops lambda deploy` again and it will only update the parts that have changed since your last deployment.

## Custom Domain

If you want your application to be available on a custom domain, you need to have your AWS credentials set up (see AWS Configuration above). And you also need to configure `domainName` and `certificateArn`. Optionally you can set a custom `basePath` and `assetPath` if you want your application to be available on a different path.

### Create / Upload Certificate in AWS Certificate Manager (ACM)

In order to use a custom domain name for your Hops application, you need to create or import an SSL certificate in the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/).

Check out the [documentation of ACM](http://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html), especially the sections about [importing](http://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html) or [requesting](http://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request.html) a certificate.

**Important:** Even if you deploy your application in a different region, you need to import or request the certificate in the region `us-east-1` (see the section about CloudFront and ACM [here](http://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html)).

### Set-up DNS records

Once you have imported or requested a certificate in ACM, you need to configure its [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) and your custom domain name in your `package.json` config (see the config section above).

Then, after you execute `hops lambda deploy` you will get an output with a CloudFront distribution address, which you need to configure with your DNS provider as an A-record or CNAME. Read more about it [here](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html#how-to-custom-domains-console).

## Advanced configuration

### Multi-Stage deployment

At the moment it is not possible to do a multi-stage deployment with a single CloudFormation stack.\
If you want to do it however, you need to create multiple stacks, for example by changing the `package.json`s `name` field or the AWS configs `uniqueName` value and then execute `hops lambda deploy` again.

### Custom CloudFormation template

In case you need additional resources in your CloudFormation template, you can specify the `cloudformationTemplateFile` value in your AWS config to overwrite the built-in CloudFormation template.

It will get executed with the default parameter values, but you can overwrite these or specify additional parameters by using the `deploy(options, parametersOverrides)` API (see next section).

# API

The hops-lambda package exports two methods: `deploy()` and `destroy()`:

## `deploy(options, parametersOverrides)`

`deploy(options, parametersOverrides)` can be called programmatically to deploy an Hops application to AWS Lambda.

It accepts two arguments `options` and `parametersOverrides` - right now `options` is unused, but reserved for future options coming through CLI arguments.

`parametersOverrides` is an object, where the key is the name of the Parameters defined in the CloudFormation template and the value is its corresponding value. These get merged with the default parameters and can be used to overwrite specific parameters or implement new ones in case you overwrite the entire CloudFormation template (see Advanced configuration above).

The `deploy()` method returns a Promise-chain that returns the Outputs of the CloudFormation stack and could be used to schedule further work, if needed.

## `destroy(options)`

`destroy(options)` can be called programmatically to delete the CloudFormation stack and the associated S3 bucket that has been created by `deploy()`.

Its `options` argument is an object with the parsed CLI parameters (currently `keepBucket: boolean`, `keepFiles: boolean` and `yes: boolean`. All of them default to `false`).

It returns a Promise-chain that can be used to schedule further work after successfully deleting the stack and/or S3 buckets.
