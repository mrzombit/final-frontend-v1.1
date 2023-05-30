import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CashFlowDocument from "../../../components/statement/documents/cashFlowDocument";
import StatementHearder from "../../../components/statement/statementHearder";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import { BiPrinter } from 'react-icons/bi';


const cashFlowStatement = () => {
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // const pdf = new jsPDF();
      var pdf = new jsPDF("p", "mm", "a4");
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.output('dataurlnewwindow');
      pdf.save("cashflow_statement.pdf");

    });
  };

  return (
    <div className="d-flex">
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <StatementHearder
          title="CashFlow Statement"
          sensitivityPath="/Sensitivity/cashflow"
          listPath="/CashFlowStatements"
          chartPath="/Chart/cashflow"
        />
        <div>
          <div className="block-print">
            <button className="btn print-state" onClick={printDocument}><BiPrinter />&nbsp;พิมพ์ข้อมูล</button>
          </div>
          <div className="doc-center scrollable">
            <div id="divToPrint" className="page">
              <CashFlowDocument />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cashFlowStatement;
