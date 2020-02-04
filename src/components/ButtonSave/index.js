import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';

// import { Container } from './styles';

const ButtonSave = (props) => (
  <Tooltip
    title={ props.title }
    data-toggle={ props["data-toggle"] }
    data-target={ props["data-target"] }
    onClick={ props.onClick }
    className={ props.className }
    data-dismiss={ props["data-dismiss"] }
    aria-label={ props["data-label"] }
    type={ props.type } >

    <IconButton className={ props.classIcon } aria-label="more">
      <Save />
    </IconButton>
  </Tooltip>
);

export default ButtonSave;
