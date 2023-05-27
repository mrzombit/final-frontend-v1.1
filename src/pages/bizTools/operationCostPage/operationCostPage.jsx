import React, { useState, useEffect } from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import "../biztools.css";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import BiztoolBody from "../../../components/investmentProject/biztoolBody/biztoolBody";
import BIZTOOL_PAGE_CONFIG from "../pageConfig";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, projectUpdated, updateProject } from "../../../features/projectsSlice";
// import InitialPeriodMonths from "../../../components/investmentProject/initialPeriodMonths";


function OperationCostPage() {
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
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
    setTableData(selectedProject.expense.fixed_cost_tables)
  }, [selectedProject]);

  const [tableData, setTableData] = useState(selectedProject.expense.fixed_cost_tables)
  const config  = BIZTOOL_PAGE_CONFIG.operationCost

  const onCellChange = (tableType, tableId, rowId, columnIndex, value) => {
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
    shallowTables = shallowTables.map((eachTable => {
      if (eachTable._id === tableId) {
        let shallowRows = eachTable.fixed_costs
        shallowRows = shallowRows.map(eachRow => {
          if (eachRow._id === rowId) {
            if (columnIndex === 0) {
              return { ...eachRow, name: value }
            }
            else if (columnIndex === 1) {
              return { ...eachRow, unit: Number(value) }
            }
            else if (columnIndex === 2) {
              return { ...eachRow, amount: Number(value) }
            }
            else if (columnIndex === 3) {
              return { ...eachRow, period_id: value }
            }
            else if (columnIndex === 4) {
              return value.type === 'cost-increase-dropdown' ? {
                ...eachRow,
                cost_increase: value.cost_increase,
              } : {
                ...eachRow,
                cost_increase_period_id: value.cost_increase_period_id
              }
            }
            else if (columnIndex === 5) {
              return { ...eachRow, start_date: value }
            }
          }
          return eachRow
        })
        eachTable.fixed_costs = shallowRows
      }
      return eachTable
    }))
    let shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: shallowTables
      }
    }
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  // const addRowHandleOld = (tableType, tableId) => {
  //   const shallowNumber = []
  //   for(let i = 0; i<InitialPeriodMonths([
  //     "มกราคม",
  //     "กุมภาพันธ์",
  //     "มีนาคม",
  //     "เมษายน",
  //     "พฤษภาคม",
  //     "มิถุนายน",
  //     "กรกฏาคม",
  //     "สิงหาคม",
  //     "กันยายน",
  //     "ตุลาคม",
  //     "พฤศจิกายน",
  //     "ธันวาคม",
  //   ],
  //     selectedProject.model_config.start_date,
  //     selectedProject.model_config.projection_period).length; i++){
  //       shallowNumber.push(1)
  //     }
  //   const initialRow = {
  //     name: "",
  //     amount: 0,
  //     period_id: "63de92ebd63688ac8b7ed999",
  //     number: shallowNumber,
  //     start_date: new Date(),
  //     cost_increase: 0,
  //     cost_increase_period_id: "63de932fd63688ac8b7ed99f",
  //   }
  //   let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
  //   shallowTables = shallowTables.map(eachTable => {
  //     if (eachTable._id === tableId) eachTable.fixed_costs.push(initialRow)
  //     return eachTable
  //   })

  //   const shallowSelectedProject = {
  //     ...selectedProject,
  //     expense: {
  //       ...selectedProject.expense,
  //       fixed_cost_tables: shallowTables
  //     }
  //   }

  //   dispatch(projectUpdated(shallowSelectedProject))
  //   dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  // }
  const addRowHandle = (tableType, tableId) => {
    const initialRow = {
      name: "",
      unit: 0,
      amount: 0,
      period_id: "63de92ebd63688ac8b7ed999",
      number: [],
      start_date: selectedProject.model_config.start_date,
      cost_increase: 0,
      cost_increase_period_id: "63de932fd63688ac8b7ed99f",
    }
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
    shallowTables = shallowTables.map(eachTable => {
      if (eachTable._id === tableId) eachTable.fixed_costs.push(initialRow)
      return eachTable
    })

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: shallowTables
      }
    }

    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }
  const tableHeaderOnChange = (tableType, tableId, value) => {

    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))

    shallowTables = shallowTables.map(eachTable => {
      if (eachTable._id === tableId) eachTable.name = value
      return eachTable
    })

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: shallowTables
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
      fixed_costs: [],
    }

    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
    let newShallowTables = [...shallowTables, shallowTable]

    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: newShallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleRowOptionFunction = (tableType, tableId, rowId) => {
    let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
    shallowTables = shallowTables.map((eachTable) => {
      if (eachTable._id === tableId) {
        let shallowRows = []
        eachTable.fixed_costs.forEach(eachRow => {
          if (eachRow._id !== rowId) 
          {
            shallowRows.push(eachRow)
          }
        })
        eachTable.fixed_costs = shallowRows
      }
      return eachTable
    })
    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: shallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleTableOptionFunction = (tableType, tableId) => {
    let shallowTables = []
    let tables = JSON.parse(JSON.stringify(selectedProject.expense.fixed_cost_tables))
    tables.forEach((eachTable) => {
      if (eachTable._id !== tableId) {
        shallowTables.push(eachTable)
      }
    })
    const shallowSelectedProject = {
      ...selectedProject,
      expense: {
        ...selectedProject.expense,
        fixed_cost_tables: shallowTables
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  return (
    <div className="d-flex">
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

export default OperationCostPage;