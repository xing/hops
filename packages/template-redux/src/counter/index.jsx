import { connect } from 'react-redux';
import Counter from './counter';
import { increment, decrement } from './actions';

export const mapStateToProps = ({ counter }) => ({
  count: counter,
});

export const actionCreators = {
  increment,
  decrement,
};

export default connect(mapStateToProps, actionCreators)(Counter);
