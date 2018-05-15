/* eslint-env jest */

const { join } = require('path');
const { execSync } = require('child_process');
const fetch = require('isomorphic-fetch');
const urlJoin = require('url-join');
const { startServer } = require('./test-helpers');

describe('hops-template-redux', () => {
  const cwd = join(__dirname, '..', 'template-redux');

  beforeAll(() => {
    jest.setTimeout(30000);
  });

  describe('develop', () => {
    let develop;

    beforeAll(() => {
      develop = startServer({ cwd, command: 'develop' });
      return develop;
    });

    afterAll(() => develop.then(({ kill }) => kill()));

    it('should render html', () => {
      return develop.then(({ url }) =>
        fetch(urlJoin(url, 'counter'))
          .then(res => res.text())
          .then(body => {
            expect(body).toContain('Clicked:');
            expect(body).toContain(
              '<script>REDUX_STATE={"counter":0};</script>'
            );
          })
      );
    });

    it('should deliver main js file', () => {
      return develop.then(({ url }) =>
        fetch(urlJoin(url, 'hops-template-redux.js'))
          .then(res => res.text())
          .then(body => {
            expect(body).toContain('__webpack_require__');
          })
      );
    });
  });

  describe('build & serve', () => {
    let serve;

    beforeAll(() => {
      execSync('hops build', { cwd });
      serve = startServer({ cwd, command: 'serve' });
      return serve;
    });

    afterAll(() => serve.then(({ kill }) => kill()));

    it.only('should deliver main js file', () => {
      return serve.then(({ url }) =>
        fetch(url)
          .then(res => res.text())
          .then(body => {
            expect(body).toContain(
              '<script>REDUX_STATE={"counter":0};</script>'
            );
            const [_, scriptUrl] = body.match(/<script src="([^"]*)"/);
            return fetch(urlJoin(url, scriptUrl))
              .then(res => res.text())
              .then(script => {
                expect(script).toContain('__webpack_require__');
                expect(script).toContain('INCREMENT_COUNTER');
              });
          })
      );
    });
  });
});
