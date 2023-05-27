import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from './Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAssetAccountById, updateAssetAccount, assetAccountUpdated } from '../features/assetAccountsSlice'

const Edit = () => {

    const { assetAccountId } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()
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


    const onInputChange = (val) => {
        const shallowAssetAccount = {
            ...assetAccount, name:
            {
                th: val,
                en: assetAccount.name.en
            }
        }
        dispatch(assetAccountUpdated(shallowAssetAccount))
    }

    const onClickHandle = () => {
        dispatch(updateAssetAccount({id: assetAccountId,data: assetAccount}))
        navigate(`/edit/${assetAccountId}`)
    }

    return (
        <div>
            <div>Edit</div>
            <input
                id="name-input-01"
                value={assetAccountStatus == "succeeded" ? assetAccount.name.th : "Loading.."}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button onClick={() => onClickHandle()} >
                Edit!
            </button>
        </div>
    )
}

export default Edit