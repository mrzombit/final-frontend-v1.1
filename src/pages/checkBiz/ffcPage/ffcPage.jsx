/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import BizSidebar from "../../../components/bizTools/bizSidebar/bizSidebar";
import MultiStepProgressBar from "../../../components/multiStepProgressBar/multiStepProgressBar";
import "./ffcPage.css";
import FFCOne from "../../../components/ffc/ffcOne/ffcOne";
import FFCTwo from "../../../components/ffc/ffcTwo/ffctwo";
import FFCTree from "../../../components/ffc/ffcThree/ffcTree";
import FFCFour from "../../../components/ffc/ffcFour/ffcFour";
import FFCFive from "../../../components/ffc/ffcFive/ffcFive";
import FFCSix from "../../../components/ffc/ffcSix/ffcSix";
import BiztoolHeader from "../../../components/investmentProject/biztoolHeader/biztoolHeader";
import BIZTOOL_PAGE_CONFIG from "../../bizTools/pageConfig";

function FFCPage() {
  const [page, setPage] = useState("pageone");

  const config = BIZTOOL_PAGE_CONFIG.ffc

  const nextPage = (page) => {
    setPage(page);
  };
  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
      case "5":
        setPage("pagefive");
        break;
      case "6":
        setPage("pagesix");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div className="d-flex ">
      <BizSidebar />
      <div className="p-4 biztool-body-width">
        <BiztoolHeader type={config.type} title={config.title} />
        <div className="ffc scoll-able-ffc">
          <p className="ffc-head-text my-5">
            Answer the following Questions to Assess Your Financial Feasibility
            Canvas
          </p>
          <div className="">
            <MultiStepProgressBar
              page={page}
              onPageNumberClick={nextPageNumber}
            />
            <div className="">
              {
                {
                  pageone: <FFCOne onButtonClick={nextPage} />,
                  pagetwo: <FFCTwo onButtonClick={nextPage} />,
                  pagethree: <FFCTree onButtonClick={nextPage} />,
                  pagefour: <FFCFour onButtonClick={nextPage} />,
                  pagefive: <FFCFive onButtonClick={nextPage} />,
                  pagesix: <FFCSix />,
                }[page]
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FFCPage;
