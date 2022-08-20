import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import LoadginGif from '../../assets/loading.gif';
import { Button } from '../../styles/global';

const ButtonSaveModal = (props) => (
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
      }}
  >
    <Button>
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
                Salvando...
            </>
            ) :
            "Salvar"
        }
    </Button>
  </Tooltip>
);

export default ButtonSaveModal;
