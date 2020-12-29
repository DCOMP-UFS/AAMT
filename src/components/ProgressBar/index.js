import React from 'react'

import { Container } from './styles';

export default function ProgressBar({ className, percentage, total, ...props }) {
  return (
    <Container>
      <div { ...props } className={ className + " progress-bar" } style={{ "width": `${ percentage * 100 / total }%` }}>
        <span className="progress-label">{`${ percentage }/${ total }`}</span>
      </div>
    </Container>
  )
}
