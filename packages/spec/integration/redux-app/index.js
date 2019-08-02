import React from 'react';
import { connect } from 'react-redux';
import { render } from 'hops';

const greeting = () => ({ subject: 'world' });

const mapStateToProps = state => ({ subject: state.greeting.subject });

const Hello = ({ subject }) => <h1>hello {subject}.</h1>;

export const App = connect(mapStateToProps)(({ subject }) => (
  <Hello subject={subject} />
));

export default render(<App />, {
  redux: {
    reducers: { greeting },
  },
});
