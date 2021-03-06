import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

// import { Container } from './styles';

const ButtonNewObject = (props) => (
  <Tooltip
    title={ props.title }
    data-toggle={ props["data-toggle"] }
    data-target={ props["data-target"] }
    onClick={ props.onClick }>
    <IconButton aria-label="more" className="text-success">
      <AddBoxIcon />
    </IconButton>
  </Tooltip>
);

export default ButtonNewObject;
