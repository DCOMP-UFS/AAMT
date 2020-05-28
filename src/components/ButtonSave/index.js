import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import LoadginGif from '../../assets/loading.gif';

import { btnLoading } from '../../styles/util';

const ButtonSave = (props) => (
  <Tooltip
    title={ props.title }
    data-toggle={ props["data-toggle"] }
    data-target={ props["data-target"] }
    onClick={ props.onClick }
    className={ props.className }
    data-dismiss={ props["data-dismiss"] }
    aria-label={ props["data-label"] }
    type={ props.type }
    disabled={ props.disabled }
    style={{
      ...props.style,
      ...(props.loading ? btnLoading : {})
    }}
  >
    <IconButton className={ props.classIcon } aria-label="more">
      {
        props.loading ?
        (
          <>
            <img
              src={ LoadginGif }
              width="25"
              style={{ marginRight: 10 }}
              alt="Carregando"
            />
            {"Carregando..."}
          </>
        ) :
        (
          <Save />
        )
      }
    </IconButton>
  </Tooltip>
);

export default ButtonSave;
