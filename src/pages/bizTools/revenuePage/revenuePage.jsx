import React, { useState, useEffect } from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import BiztoolBody from "../../../components/investmentProject/biztoolBody/biztoolBody";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import '../biztools.css'
import BIZTOOL_PAGE_CONFIG from "../pageConfig";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, projectUpdated, updateProject } from "../../../features/projectsSlice";

function RevenuePage() {
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
    setTableData(selectedProject.revenue)
  }, [selectedProject]);

  const [tableData, setTableData] = useState(selectedProject.revenue)
  const config = BIZTOOL_PAGE_CONFIG.revenue

  const onCellChange = (tableType, tableId, rowId, columnIndex, value) => {
    let shallowServiceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let shallowProductTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))
    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.service) {
      shallowServiceTables = shallowServiceTables.map((eachTable => {
        if (eachTable._id === tableId) {
          let shallowRows = eachTable.services
          shallowRows = shallowRows.map(eachRow => {
            if (eachRow._id === rowId) {
              if (columnIndex === 0) {
                return { ...eachRow, name: value }
              }
              else if (columnIndex === 1) {
                return { ...eachRow, unit: Number(value.unit),unit_name: value.unitName}
              }
              else if (columnIndex === 2) {
                return { ...eachRow, serve_per_unit: Number(value) }
              }
              else if (columnIndex === 3) {
                return { ...eachRow, revenue_per_service: Number(value) }
              }
              else if (columnIndex === 4) {
                return { ...eachRow, cost_per_service: parseFloat(value) }
              }
              else if (columnIndex === 5) {
                return { ...eachRow, start_date: value }
              }
            }
            return eachRow
          })
          eachTable.services = shallowRows
        }
        return eachTable
      }))
    }
    else if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.product) {
      shallowProductTables = shallowProductTables.map((eachTable => {
        if (eachTable._id === tableId) {
          let shallowRows = eachTable.products
          shallowRows = shallowRows.map(eachRow => {
            if (eachRow._id === rowId) {
              if (columnIndex === 0) {
                return { ...eachRow, name: value }
              }
              else if (columnIndex === 1) {
                return { ...eachRow, revenue_per_unit: Number(value) }
              }
              else if (columnIndex === 2) {
                return { ...eachRow, cost_per_unit: parseFloat(value) }
              }
              else if (columnIndex === 3) {
                return { ...eachRow, start_date: value }
              }
              else if (columnIndex === 4) {
                const shallowSeasonalTrends = eachRow.seasonal_trends
                shallowSeasonalTrends[value.index] = Number(value.value)
                return { ...eachRow, seasonal_trends: shallowSeasonalTrends }
              }
            }
            return eachRow
          })
          eachTable.products = shallowRows
        }
        return eachTable
      }))
    }
    let shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables,
      }
    }
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const addRowHandle = (tableType, tableId) => {
    const initialRow = {
      service: {
        name: "บริการ",
        unit: 1,
        unit_name: "หน่วย",
        serve_per_unit: 1,
        revenue_per_service: 0,
        cost_per_service: 30,
        price_increase: 0,
        price_increase_period_id: "63de92ebd63688ac8b7ed999",
        cost_increase: 0,
        cost_increase_period_id: "63de92ebd63688ac8b7ed999",
        start_date: new Date(),
        seasonal_trends: [],
      },
      product: {
        name: "",
        days_of_inventory: {
          days: 0,
          months: 0,
        },
        revenue_per_unit: 0,
        cost_per_unit: 0,
        price_increase: 0,
        price_increase_period_id: "63de92ebd63688ac8b7ed999",
        cost_increase: 0,
        cost_increase_period_id: "63de92ebd63688ac8b7ed999",
        start_date: new Date(),
        seasonal_trends: [
          100,100,100,100,
          100,100,100,100,
          100,100,100,100
        ],
      }
    }

    let shallowServiceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let shallowProductTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))

    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.service) {
      shallowServiceTables = shallowServiceTables.map(eachTable => {
        if (eachTable._id === tableId) eachTable.services.push(initialRow.service)
        return eachTable
      })
    }
    else if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.product) {
      shallowProductTables = shallowProductTables.map(eachTable => {
        if (eachTable._id === tableId) eachTable.products.push(initialRow.product)
        return eachTable
      })
    }

    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables
      }
    }

    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const tableHeaderOnChange = (tableType, tableId, value) => {
    let shallowServiceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let shallowProductTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))

    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.service) {
      shallowServiceTables = shallowServiceTables.map(eachTable => {
        if (eachTable._id === tableId) eachTable.name = value
        return eachTable
      })
    }
    else if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.product) {
      shallowProductTables = shallowProductTables.map(eachTable => {
        if (eachTable._id === tableId) eachTable.name = value
        return eachTable
      })
    }

    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables
      }
    }

    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const addServiceTableHandleFunction = () => {
    let shallowServiceTable = {
      name: "ชื่อตาราง",
      description: "",
      color: "#FFFFFF",
      text_color: "#000000",
      services: [],
    }

    let shallowServiceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let newShallowServiceTables = [...shallowServiceTables, shallowServiceTable]

    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        ...selectedProject.revenue,
        service_tables: newShallowServiceTables,
      }
    }

    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const addProductTableHandleFunction = () => {
    let shallowProductTable = {
      name: "ชื่อตาราง",
      description: "",
      color: "#FFFFFF",
      text_color: "#000000",
      products: [],
    }

    let shallowProductTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))
    let newShallowProducrTables = [...shallowProductTables, shallowProductTable]

    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        ...selectedProject.revenue,
        product_tables: newShallowProducrTables
      }
    }

    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleRowOptionFunction = (tableType, tableId, rowId) => {
    let shallowServiceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let shallowProductTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))
    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.service) {
      shallowServiceTables = shallowServiceTables.map((eachTable) => {
        if (eachTable._id === tableId) {
          let shallowRows = []
          eachTable.services.forEach(eachRow => {
            if (eachRow._id !== rowId) shallowRows.push(eachRow)
          })
          eachTable.services = shallowRows
        }
        return eachTable
      })
    }
    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.product) {
      shallowProductTables = shallowProductTables.map((eachTable) => {
        if (eachTable._id === tableId) {
          let shallowRows = []
          eachTable.products.forEach(eachRow => {
            if (eachRow._id !== rowId) shallowRows.push(eachRow)
          })
          eachTable.products = shallowRows
        }
        return eachTable
      })
    }
    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables,
      }
    }
    setReload(false)
    dispatch(projectUpdated(shallowSelectedProject))
    dispatch(updateProject({ id: selectedProject._id, data: shallowSelectedProject }))
  }

  const handleTableOptionFunction = (tableType, tableId) => {
    let shallowServiceTables = []
    let shallowProductTables = []
    let serviceTables = JSON.parse(JSON.stringify(selectedProject.revenue.service_tables))
    let productTables = JSON.parse(JSON.stringify(selectedProject.revenue.product_tables))
    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.service) {
      serviceTables.forEach((eachTable) => {
        if (eachTable._id !== tableId) {
          shallowServiceTables.push(eachTable)
        }
      })
      shallowProductTables = productTables
    }
    if (tableType === BIZTOOL_PAGE_CONFIG.revenue.type.product) {
      productTables.forEach((eachTable) => {
        if (eachTable._id !== tableId) {
          shallowProductTables.push(eachTable)
        }
      })
      shallowServiceTables = serviceTables
    }
    const shallowSelectedProject = {
      ...selectedProject,
      revenue: {
        service_tables: shallowServiceTables,
        product_tables: shallowProductTables,
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
        />
        <BiztoolBody
          handleTableOptionFunction={handleTableOptionFunction}
          handleRowOptionFunction={handleRowOptionFunction}
          tableHeaderOnChange={tableHeaderOnChange}
          addRowHandle={addRowHandle}
          onCellChange={onCellChange}
          type={config.type}
          tableStyle={config.tableStyle}
          tableData={tableData}
          handleServiceFunction={addServiceTableHandleFunction}
          handleProductFunction={addProductTableHandleFunction}
        />
      </div>
    </div>
  );
}

export default RevenuePage;