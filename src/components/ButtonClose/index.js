import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

// import { Container } from './styles';

const ButtonClose = props => (
  <Tooltip
    title={ props.title }
    data-toggle={ props["data-toggle"] }
    data-target={ props["data-target"] }
    onClick={ props.onClick }
    className={ props.className }
    data-dismiss={ props["data-dismiss"] }
    aria-label={ props["data-label"] }
    { ...props }
  >

    <IconButton className={ props.classIcon } aria-label="more">
      <Close />
    </IconButton>
  </Tooltip>
);

export default ButtonClose;
