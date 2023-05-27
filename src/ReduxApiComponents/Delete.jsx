import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAllAssetAccounts, fetchAssetAccounts, deleteAssetAccountById, addNewAssetAccount } from '../features/assetAccountsSlice'
import Spinner from './Spinner'


const Delete = () => {

  const dispatch = useDispatch()
  const assetAccounts = useSelector(selectAllAssetAccounts)
  const assetAccountStatus = useSelector(state => state.assetAccounts.status)
  const error = useSelector(state => state.assetAccounts.error)

  const assetAccountTemplate = {
    name: {
      en: "testName",
      th: "ทดสอบ"
    },
    is_fixed_asset: true,
    is_tangible_asset: true,
    created_date: new Date(),
  }

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
      <div
        key={assetAccount.id}
      >
        <article className="assetAccount-excerpt">
          <h3>{assetAccount.name.th}</h3>
          <p>{assetAccount.created_date}</p>
          <button onClick={() => handleDeleteOnclick(assetAccount._id)}>Delete</button>
        </article>
      </div>
    ))
  } else if (assetAccountStatus === 'failed') {
    content = <div>{error}</div>
  }

  const handleDeleteOnclick = (id) => {
    dispatch(deleteAssetAccountById(id))
    // dispatch(fetchAssetAccounts())
  }

  const [name, setName] = useState("")

  const handleOnChange = (val) => {
    setName(val)
  }
  const handleCreateOnClick = () => {
    const shallowAssetAccount = assetAccountTemplate
    shallowAssetAccount.name.th = name
    dispatch(addNewAssetAccount(shallowAssetAccount))
    // dispatch(fetchAssetAccounts())
  }

  return (
    <div>
      <div>Create & Delete</div>
      <div>
        name:
        <input
          id="name-input"
          val={name}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button onClick={() => handleCreateOnClick()}>Create</button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default Delete