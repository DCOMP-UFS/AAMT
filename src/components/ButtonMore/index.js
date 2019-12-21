import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import More from '@material-ui/icons/More';

// import { Container } from './styles';

const ButtonMore = (props) => (
  <Tooltip
    title={ props.title }
    data-toggle={ props["data-toggle"] }
    data-target={ props["data-target"] }
    onClick={ props.onClick }
    className={ props.className }
    data-dismiss={ props["data-dismiss"] }
    aria-label={ props["data-label"] } >
    <IconButton aria-label="more" className="text-muted">
      <More />
    </IconButton>
  </Tooltip>
);

export default ButtonMore;
