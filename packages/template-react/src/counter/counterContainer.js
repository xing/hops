import { connect } from 'react-redux';

import { increment, decrement } from './actions';

import Counter from './counter';

export const mapStateToProps = ({ counter }) => ({
  count: counter,
});

export const actionCreators = {
  increment,
  decrement,
};

export default connect(mapStateToProps, actionCreators)(Counter);
