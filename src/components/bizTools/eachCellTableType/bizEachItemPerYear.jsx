import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./eachCellTableType.css";

const bizEachItemPerYear = (props) => {
  return (
    <div>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table> */}

      <div className="beipy-container">
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[0].width}px`,
            width: "70px",
            textAlign: `start`,
          }}
          value={"ปีที่ 1"}
        />
        <input
          //   key={eachRow._id}
          type="money"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[1].width}px`,
            width: "150px",
            textAlign: `start`,
          }}
          value={"1 หน่วย แสดงเดือน"}
        />
        <input
          //   key={eachRow._id}
          type="money"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[2].width}px`,
            width: "70px",
            textAlign: `start`,
          }}
          value={"ปีที่ 2"}
        />
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[3].width}px`,
            width: "150px",
            textAlign: `start`,
          }}
          value={"1 หน่วย แสดงเดือน"}
        />
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[4].width}px`,
            width: "70px",
            textAlign: `start`,
          }}
          value={"ปีที่ 3"}
        />
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[3].width}px`,
            width: "150px",
            textAlign: `start`,
          }}
          value={"1 หน่วย แสดงเดือน"}
        />
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[4].width}px`,
            width: "70px",
            textAlign: `start`,
          }}
          value={"ปีที่ 4"}
        />
        <input
          //   key={eachRow._id}
          type="text"
          className="column border border-primary"
          style={{
            // width: `${columnStyles[3].width}px`,
            width: "150px",
            textAlign: `start`,
          }}
          value={"1 หน่วย แสดงเดือน"}
        />
      </div>
    </div>
  );
};

export default bizEachItemPerYear;
