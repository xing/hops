/* @flow */
import * as React from 'react';

type Props = {
  text: string,
};

type State = {
  text: string,
};

export default class FlowText extends React.Component<Props, State> {
  static defaultProps: any;
  props: Props;

  // property initializers used to ensure issue is fixed: https://github.com/babel/babel/issues/8417
  state: State = {
    text: 'text:' + this.props.text,
  };

  render() {
    return <span>{this.state.text}</span>;
  }
}
