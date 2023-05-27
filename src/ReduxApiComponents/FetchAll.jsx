import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from './Spinner'
import { useDispatch, useSelector } from 'react-redux'

import { selectAllAssetAccounts, fetchAssetAccounts } from '../features/assetAccountsSlice'

const AssetAccountExcerpt = ({ assetAccount }) => {
  return (
    <article className="assetAccount-excerpt">
      <h3>{assetAccount.name.en}</h3>
      <Link to={`/fetch/${assetAccount._id}`}
        className="button muted-button">
        View AssetAccount
      </Link>
    </article>
  )
}

const FetchAll = () => {

  const dispatch = useDispatch()
  const assetAccounts = useSelector(selectAllAssetAccounts)
  const assetAccountStatus = useSelector(state => state.assetAccounts.status)
  const error = useSelector(state => state.assetAccounts.error)

  useEffect(() => {
    if (assetAccountStatus === 'idle') {
      dispatch(fetchAssetAccounts())
    }
  }, [assetAccountStatus, dispatch])

  let content
  if (assetAccountStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (assetAccountStatus === 'succeeded') {
    const orderedAssetAccounts = assetAccounts
      .slice()
      .sort((a, b) => b.created_date.localeCompare(a.created_date))

    content = orderedAssetAccounts.map(assetAccount => (
      <AssetAccountExcerpt
        key={assetAccount.id}
        assetAccount={assetAccount} />
    ))
  } else if (assetAccountStatus === 'failed') {
    content = <div>{error}</div>
  }


  return (
    <div>
      <div>FetchAll</div>
      <div>{content}</div>
    </div>
  )
}

export default FetchAll