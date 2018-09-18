const { getOptions } = require('loader-utils');
const generateFragmentTypes = require('./generate-fragments');

module.exports = async function() {
  const { graphqlUri, graphqlSchemaFile } = getOptions(this);
  const callback = this.async();
  try {
    const fragmentTypes = await generateFragmentTypes({
      graphqlUri,
      schemaFile: graphqlSchemaFile,
    });
    callback(null, JSON.stringify(fragmentTypes));
  } catch (error) {
    callback(null, 'null');
  }
};
