// @flow

import { connect } from 'react-redux';

import { increment, decrement } from './actions';
import type { ApplicationState } from '../reducers';

import Counter from './counter';

export const mapStateToProps = ({ counter }: ApplicationState) => ({
  count: counter,
});

export const actionCreators = {
  increment,
  decrement,
};

export default connect(mapStateToProps, actionCreators)(Counter);