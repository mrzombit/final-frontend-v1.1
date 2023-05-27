import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssetAccounts,
    assetAccounts,
  } from "../../../features/assetAccountsSlice";
  import URL from './../URL'
  
const bizDropdown = (props) => {
    const dispatch = useDispatch();
  const assetAccounts = useSelector(
    (state) => state.assetAccounts.assetAccounts
  );
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });

  useEffect(() => {
    if (isLoaded.assetAccounts) {
      dispatch(fetchAssetAccounts(assetAccounts));
      setIsLoaded({ assetAccount: true });
    }
  }, []);
  const [assetAccountseData, setAssetAccountseData] = useState(assetAccounts);
  const [selectDropdown, setSelectDropdown] = useState();

  const ASSET_ACOUNT_FETCH_URL =
    `${URL}/assetAccount/assetAccounts`;
  // const assetAccounts = useSelector(state => state.assetAccounts.assetAccounts)

  const onChangeHandle = (tableId, valueKey) => {
    // props.onChangeHandle(eachTable._id, row, val);
    setSelectDropdown(valueKey);
  };

  return (
    <div className="row" style={{
        // width: `${columnStyles[2].width}px`,
        width: '200px',
        textAlign: `start`,
      }}>
      <DropdownButton
        className="row"
        id="dropdown-basic-button"
        title={selectDropdown}
        onSelect={(valueKey) =>
          onChangeHandle(props.tableId, valueKey)
        }
      >
        <Dropdown.Item eventKey={assetAccountseData[0].name.th}>
          {assetAccountseData[0].name.th}
        </Dropdown.Item>
        <Dropdown.Item eventKey={assetAccountseData[1].name.th}>
          {assetAccountseData[1].name.th}
        </Dropdown.Item>
        <Dropdown.Item eventKey={assetAccountseData[2].name.th}>
          {assetAccountseData[2].name.th}
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default bizDropdown;
