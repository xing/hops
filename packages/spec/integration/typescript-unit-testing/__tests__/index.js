const { createElement } = require('react');
const { render, screen } = require('@testing-library/react');

const { Component } = require('../index');

describe('unit testing with typescript', () => {
  it('should support code-splitting', () => {
    render(createElement(Component));
    expect(screen.getByText('test')).toBeDefined();
  });
});
