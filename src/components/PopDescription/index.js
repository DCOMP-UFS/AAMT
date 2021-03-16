import React from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import { Popover, PopoverTitle, PopoverContent, OverlayTrigger } from 'react-bootstrap';

import { Container } from './styles';

export default function PopDescription({ trigger, id, title, placement, content, ...props }) {
  const popover = (
    <Popover id={ id } { ...props }>
      { title ? ( <PopoverTitle className="bg-info text-white" as="h3">{ title }</PopoverTitle> ) : <></> }
      <PopoverContent>{ content }</PopoverContent>
    </Popover>
  );

  return (
    <Container>
      <OverlayTrigger trigger={ trigger ? trigger : ['hover', 'focus'] } placement={ placement } overlay={ popover }>
        <span className="pop-description">
          <FaInfoCircle className="icon icon-sm" />
        </span>
      </OverlayTrigger>
    </Container>
  )
}
