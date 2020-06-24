const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const createBundle = require('hops-lambda/lib/create-lambda-bundle');
const { createTmpDirectory } = require('hops-lambda/lib/fs-utils');

async function zipFunctionCode(root) {
  process.chdir(root);
  const hopsConfig = require('hops-config');
  const awsConfig = require('hops-lambda/lib/aws-config')(hopsConfig);

  const tmpDir = await createTmpDirectory();
  const lambdaZipFile = path.join(tmpDir, 'lambda.zip');

  return createBundle(
    root,
    lambdaZipFile,
    awsConfig.include,
    awsConfig.exclude
  );
}

function invokeFunction(root, path) {
  process.chdir(root);
  const { handler } = require('hops-lambda/lambda');
  return handler({ requestContext: { path }, path }, {}).then((response) => {
    if (response.isBase64Encoded) {
      response.body = Buffer.from(response.body, 'base64').toString('utf-8');
    }
    return response;
  });
}

describe('lambda production build', () => {
  beforeAll(async () => {
    await HopsCLI.build('-p', '--parallel-build');
  });

  it('renders something', async () => {
    const lambdaZipFile = await zipFunctionCode(cwd);
    const unzipDir = await createTmpDirectory();
    await exec(`unzip -q ${lambdaZipFile} -d ${unzipDir}`, { cwd });

    const response = await invokeFunction(unzipDir, '/prod');

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('<h1>hello <!-- -->lambda</h1>');
  });
});
