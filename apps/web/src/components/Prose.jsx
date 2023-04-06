import cx from 'classnames'

export function Prose({ children, className }) {
  return (
    <div className={cx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
