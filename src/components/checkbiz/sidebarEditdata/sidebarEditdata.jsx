import React, { useEffect, useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import BIZTOOL_PAGE_CONFIG from "../../../pages/bizTools/pageConfig";
import cashflowChartPage from "../../../pages/checkBiz/statementsPage/chartPages/cashflowChartPage";
import "./sidebarEditdata.css"

function sidebarEditdata(props) {
    const [config, setConfig] = useState(BIZTOOL_PAGE_CONFIG.revenue)
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    props.isSidebar(sidebar);

    return (
        <div>
            {/*//////////////////// sidebar ///////////////////*/}
            <div className="d-flex justify-content-end">
                {sidebar ? (
                    //SHOW SIDEBAR (EDIT TAB)
                    <div className="sen-sidebar">
                        {/* <ul className='nav-menu-items' onClick={showSidebar}></ul> */}
                        <div className="sen-sidebar-show" onClick={showSidebar}>
                            <AiOutlineDoubleLeft />
                        </div>

                        {/* ------------------DATA----------------- */}

                        รายได้การบริการ/วัน
                        <hr></hr>

                        {/* {alert(JSON.stringify(tableData.service_tables))} */}
                        {/* {alert(JSON.stringify(tableData.service_tables))} */}


                        {/* {tableData.service_tables.map((pd) => (
                            <div>

                                {pd.services.map((service) => (
                                    <div>
                                        <div>
                                            {service.name}
                                            {(service.name !== "" && service.revenue_per_service !== 0) &&
                                                <input value={service.revenue_per_service} width="100px" />}
                                            {sum_service_revenue(service.revenue_per_service)}

                                        </div>
                                    </div>
                                )
                                )}
                            </div>

                        ))}
                        ====={total_service_revenue} */}


                        {/* ----------------------------------- */}
                    </div>
                ) : (
                    <div className="sen-sidebar2">
                        {/* <ul className='nav-menu-items' onClick={showSidebar}></ul> */}
                        <div className="sen-sidebar-show2" onClick={showSidebar}>
                            <AiOutlineDoubleLeft />

                        </div>
                    </div>
                )}
            </div>
            {/* //////////////////////////// */}

        </div>
    )
}

export default sidebarEditdata
