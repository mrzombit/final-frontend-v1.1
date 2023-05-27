const BIZTOOL_PAGE_FUNCTION_CONFIG = {
    totalInvestment: {
        onCellChange: (tableType, tableId, rowId, columnIndex, value) => {
            let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
            shallowTables = shallowTables.map((eachTable => {
                if (eachTable._id == tableId) {
                    let shallowRows = eachTable.investments
                    shallowRows = shallowRows.map(eachRow => {
                        if (eachRow._id == rowId) {
                            if (columnIndex == 0) {
                                return { ...eachRow, name: value }
                            }
                            else if (columnIndex == 1) {
                                return { ...eachRow, amount: Number(value) }
                            }
                            else if (columnIndex == 2) {
                                return { ...eachRow, account_id: value }
                            }
                            else if (columnIndex == 3) {
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
        },
        addRowHandle: (tableType, tableId) => {
            const initialRow = {
                name: "",
                amount: 0,
                account_id: "63de8eead63688ac8b7ed990",
                is_initial: true,
                start_date: new Date(),
            }
            let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
            shallowTables = shallowTables.map(eachTable => {
                if (eachTable._id == tableId) eachTable.investments.push(initialRow)
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
        },
        tableHeaderOnChange: (tableType, tableId, value) => {

            let shallowTables = JSON.parse(JSON.stringify(selectedProject.expense.investment_tables))
            shallowTables = shallowTables.map(eachTable => {
                if (eachTable._id == tableId) eachTable.name = value
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
    },
    operationCost: {

    },
    revenue: {

    },
    miscellaneous: {

    },
}

export default BIZTOOL_PAGE_FUNCTION_CONFIG;