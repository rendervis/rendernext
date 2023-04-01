import {Spinner} from '../Spinner'

 function PageSpinner() {
  return (
    <p className="page-loading" data-cy="page-spinner">
      <Spinner />
    </p>
  )
}

export {PageSpinner}
