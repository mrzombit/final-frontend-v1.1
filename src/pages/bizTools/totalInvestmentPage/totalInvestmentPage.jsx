import React, { useState, useEffect } from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import "../biztools.css";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import BiztoolBody from "../../../components/investmentProject/biztoolBody/biztoolBody";
import BIZTOOL_PAGE_CONFIG from "../pageConfig";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, projectUpdated, updateProject } from "../../../features/projectsSlice";

function TotalInvestmentPage() {

  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.projects.selectedProject);
  const [isLoaded, setIsLoaded] = useState({ user: false, projects: false });
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (isLoaded.projects) {
      dispatch(fetchProjectById(selectedProject._id));
      setIsLoaded({ user: true, project: true });
    }
    if (!reload) {
      dispatch(fetchProjectById(selectedProject._id))
      setReload(true)
    }
    setTableData(selectedProject.expense.investment_tables)
  }, [selectedProject]);

  const [tableData, setTableData] = useState(selectedProject.expense.investment_tables);
  const config = BIZTOOL_PAGE_CONFIG.totalInvestment

  const onCellChange = (tableType, tableId, rowId, columnIndex, value) => {
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    shallowTables = shallowTables.map((eachTable => {
      if (eachTable._id === tableId) {
        let shallowRows = eachTable.investments
        shallowRows = shallowRows.map(eachRow => {
          if (eachRow._id === rowId) {
            if (columnIndex === 0) {
              return { ...eachRow, name: value }
            }
            else if (columnIndex === 1) {
              return { ...eachRow, amount: Number(value) }
            }
            else if (columnIndex === 2) {
              return { ...eachRow, account_id: value }
            }
            else if (columnIndex === 3) {
              return { ...eachRow, start_date: value }
            }
          }
          return eachRow
        })
        eachTable.investments = shallowRows
      }
      return eachTable
    }))
    let shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: shallowTables
      }
    }
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const addRowHandle = (tableType, tableId) => {
    const initialRow = {
      name: "",
      amount: 0,
      account_id: "63de8eead63688ac8b7ed990",
      is_initial: true,
      start_date: new Date(),
    }
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    shallowTables = shallowTables.map(eachTable => {
      if (eachTable._id === tableId) eachTable.investments.push(initialRow)
      return eachTable
    })

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: shallowTables
      }
    }
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const tableHeaderOnChange = (tableType, tableId, value) => {

    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    shallowTables = shallowTables.map(eachTable => {
      if (eachTable._id === tableId) eachTable.name = value
      return eachTable
    })

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: shallowTables
      }
    }
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const addTableHandleFunction = (data) => {
    let shallowTable = {
      name: "ชื่อตาราง",
      description: "",
      color: "#FFFFFF",
      text_color: "#000000",
      investments: [],
    }

    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    // console.log(JSON.stringify(shallowTables));
    let newShallowTables = [...shallowTables, shallowTable]

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: newShallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleRowOptionFunction = (tableType, tableId, rowId) => {
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    shallowTables = shallowTables.map((eachTable) => {
      if (eachTable._id === tableId) {
        let shallowRows = []
        eachTable.investments.forEach(eachRow => {
          if (eachRow._id !== rowId) shallowRows.push(eachRow)
        })
        eachTable.investments = shallowRows
      }
      return eachTable
    })
    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: shallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleTableOptionFunction = (tableType, tableId) => {
    let shallowTables = []
    let tables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
    tables.forEach((eachTable) => {
      if (eachTable._id !== tableId) {
        shallowTables.push(eachTable)
      }
    })
    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        investment_tables: shallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  return (
    <div className="d-flex ">
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <BiztoolHeader
          type={config.type}
          title={config.title}
          handleFunction={addTableHandleFunction}
        />
        <BiztoolBody
          handleTableOptionFunction={handleTableOptionFunction}
          handleRowOptionFunction={handleRowOptionFunction}
          handleFunction={() => addTableHandleFunction}
          tableHeaderOnChange={tableHeaderOnChange}
          addRowHandle={addRowHandle}
          onCellChange={onCellChange}
          type={config.type}
          tableStyle={config.tableStyle}
          tableData={tableData}
        />
      </div>
    </div>
  );
}

export default TotalInvestmentPage;
