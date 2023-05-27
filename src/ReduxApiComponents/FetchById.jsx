import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from './Spinner'
import { Link, useParams } from 'react-router-dom'
import { fetchAssetAccountById } from '../features/assetAccountsSlice'

const FetchById = () => {
  const { assetAccountId } = useParams();

  const dispatch = useDispatch()
  const assetAccount = useSelector(state => state.assetAccounts.selectedAssetAccount)
  const assetAccountStatus = useSelector(state => state.assetAccounts.status)
  const error = useSelector(state => state.assetAccounts.error)

  useEffect(() => {
    if (assetAccountStatus === 'idle') {
      dispatch(fetchAssetAccountById(assetAccountId))
    }
  }, [assetAccountStatus, dispatch])

  let content
  if (assetAccountStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (assetAccountStatus === 'succeeded') {
    content = <h2>data: {assetAccount.name.th}</h2>
  } else if (assetAccountStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <article className="assetAccount">
        {content}
        <Link to={`/edit/${assetAccountId}`} className="button">
          Edit AssetAccount
        </Link>
      </article>
    </section>
  )
}

export default FetchById