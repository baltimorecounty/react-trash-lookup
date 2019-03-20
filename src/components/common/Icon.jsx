import React from 'react';

const Icon = props => {
  return <i className={`fa fa-fw fa-${props.iconClass}`} aria-hidden="true" />;
};

export default Icon;
