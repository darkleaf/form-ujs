import React from 'react';

import State from './state';

export default class Base extends React.Component {
  render() {
    return (
      <State {...this.props} />
    );
  }
}
