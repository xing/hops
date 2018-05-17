/* eslint-env jest */

const { join } = require('path');
const { execSync } = require('child_process');
const fetch = require('isomorphic-fetch');
const urlJoin = require('url-join');
const { startServer } = require('./test-helpers');

describe('hops-template-react', () => {
  const cwd = join(__dirname, '..', 'template-react');

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
        fetch(url)
          .then(res => res.text())
          .then(body => {
            expect(body).toContain('Hello World!');
          })
      );
    });

    it('should deliver main js file', () => {
      return develop.then(({ url }) =>
        fetch(urlJoin(url, 'hops-template-react.js'))
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
            const match = body.match(/<script src="([^"]*)"/) || [];
            const scriptUrl = match[1];
            return fetch(urlJoin(url, scriptUrl))
              .then(res => res.text())
              .then(script => {
                expect(script).toContain('__webpack_require__');
              });
          })
      );
    });
  });
});
