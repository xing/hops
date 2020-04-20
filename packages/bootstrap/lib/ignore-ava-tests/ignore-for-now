const { join } = require('path');
const test = require('ava');
const execa = require('execa');

async function spawnTest(fixture) {
  const dir = join(__dirname, 'fixtures', fixture);
  const result = await execa(process.argv[0], [join(dir, 'test.js')], {
    cwd: dir,
  });
  try {
    return JSON.parse(result.stdout);
  } catch (e) {
    console.log(result.stdout);
    throw e;
  }
}

test('Should return empty object if no config is given', async (t) => {
  const actual = await spawnTest('no-config');

  t.deepEqual({}, actual);
});

test('Should return a simple config without presets', async (t) => {
  const actual = await spawnTest('no-presets');

  t.deepEqual({ key: 'value' }, actual);
});

test('Should return a config with default presets', async (t) => {
  const actual = await spawnTest('default-presets');

  t.deepEqual(
    {
      key: 'value',
    },
    actual
  );
});

test('Should return a config with custom presets', async (t) => {
  const actual = await spawnTest('custom-presets');

  t.deepEqual(
    {
      key: 'value',
    },
    actual
  );
});
