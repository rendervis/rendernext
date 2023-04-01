import React from 'react'

function Spinner(
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLSpanElement> &
    React.HTMLAttributes<HTMLSpanElement>,
) {
  return (
    <span {...props}>
      <span className="icon-loading" data-cy="spinner" />
    </span>
  )
}

export {Spinner}
