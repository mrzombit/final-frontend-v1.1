const BIZTOOL_PAGE_MOCKDATA = {
    pageConfig: {
        data: {
        },
    },
    totalInvestment: {
        data: [
            {
                tableId: 1,
                title: "ร้านตัดผม",
                rowData: [
                    {
                        rowId: 1,
                        data:
                            [
                                { colId: 1, val: "ค่าที่ดิน" },
                                { colId: 2, val: 1200000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "ค่าก่อสร้าง" },
                                { colId: 2, val: 1000000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ค่าเฟอร์นิเจอร์​" },
                                { colId: 2, val: 75000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ค่าเครื่องมือช่าง​" },
                                { colId: 2, val: 70000 },
                                { colId: 3, val: "สินทรัพย์ถาวรที่มีตัวตน" },
                                { colId: 4, val: new Date() },
                            ]
                    },
                ]
            },
            {
                tableId: 2,
                title: "รายการสินค้า ชุดที่ 2",
                rowData: [
                    {
                        rowId: 1,
                        data:
                            [
                                { colId: 1, val: "สินค้า D" },
                                { colId: 2, val: "2 ปี" },
                                { colId: 3, val: [60, 70, 80] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "สินค้า E" },
                                { colId: 2, val: "3 ปี" },
                                { colId: 3, val: [60, 80, 90] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "สินค้า F" },
                                { colId: 2, val: "4 ปี" },
                                { colId: 3, val: [50, 60, 70] },
                                { colId: 4, val: new Date() },
                            ]
                    },
                ]
            },
        ]
    },
    operationCost: {
        data: [
            {
                tableId: 1,
                title: "เงินเดือน",
                rowData: [
                    {
                        rowId: 1,
                        data:
                            [
                                { colId: 1, val: "ผู้จัดการ" },
                                { colId: 2, val: 35000 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },
                                { colId: 5, val: 1 },

                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "พนักงานต้อนรับ" },
                                { colId: 2, val: 20000 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },

                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ช่างตัดผมชาย" },
                                { colId: 2, val: 22000 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },

                            ]
                    },
                    {
                        rowId: 4,
                        data:
                            [
                                { colId: 1, val: "ช่างตัดผมหญิง" },
                                { colId: 2, val: 22000 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },

                            ]
                    },
                ]
            },
            {
                tableId: 2,
                title: "เงินเดือน",
                rowData: [
                    {
                        rowId: 1,
                        data:
                            [
                                { colId: 1, val: "ค่าบริการเครือข่ายอินเทอร์เน็ต" },
                                { colId: 2, val: 2 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },

                            ]
                    },
                    {
                        rowId: 2,
                        data:
                            [
                                { colId: 1, val: "ค่าลิขสิทธิแฟรนไซส์" },
                                { colId: 2, val: 2 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },

                            ]
                    },
                    {
                        rowId: 3,
                        data:
                            [
                                { colId: 1, val: "ค่าไฟไฟ้า" },
                                { colId: 2, val: 3 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },
                            ]
                    },
                    {
                        rowId: 4,
                        data:
                            [
                                { colId: 1, val: "ค่าน้ำ" },
                                { colId: 2, val: 3 },
                                { colId: 3, val: 2 },
                                { colId: 4, val: 1 },
                            ]
                    },

                ]
            },
        ],
    },
    revenue: {
        data: {
            serviceData: [
                {
                    tableId: 1,
                    title: "ค่าบริการ",
                    rowData: [
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "บริการทำสีผมหญิง" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 2,
                            data:
                                [
                                    { colId: 1, val: "บริการทำสีผมชาย" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 3,
                            data:
                                [
                                    { colId: 1, val: "บริการตัดผมชาย" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 4,
                            data:
                                [
                                    { colId: 1, val: "บริการตัดผมหญิง" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                    ]
                },
            ],
            productData: [
                {
                    tableId: 2,
                    title: "การขายสินค้า",
                    rowData: [
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "มาร์คหน้า" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 2,
                            data:
                                [
                                    { colId: 1, val: "ลิปสติก" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                        {
                            rowId: 3,
                            data:
                                [
                                    { colId: 1, val: "ครีมนวดมือ" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: "ที่นั่ง" },
                                    { colId: 4, val: 10 },
                                    { colId: 5, val: 1500 },
                                    { colId: 6, val: 60 },
                                    { colId: 7, val: "ปี" },
                                    { colId: 8, val: "ปี" },
                                    { colId: 9, val: new Date() },
                                ]
                        },

                    ]
                },
            ],
        }
    },
    miscellaneous: {
        data: {
            shareholderData: [
                {
                    tableId: 1,
                    title: "รายชื่อผู้ถือหุ้น",
                    rowData: [
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "อนัญญา รัตนกิจสกุล" },
                                    { colId: 2, val: 2000000 },
                                    { colId: 3, val: new Date() },                                   
                                ]
                        },
                        {
                            rowId: 2,
                            data:
                                [
                                    { colId: 1, val: "ฐิตา สิริวาณิชย์" },
                                    { colId: 2, val: 2 },
                                    { colId: 3, val: new Date() },
                                  
                                ]
                        },
                        {
                            rowId: 3,
                            data:
                                [
                                    { colId: 1, val: "ฉัตร ภัชรปรีดา" },
                                    { colId: 2, val: 3 },
                                    { colId: 3, val: new Date() },
                                 
                                ]
                        },
                    
                    ]
                },
            ],
            dividendRecipientData: [
                {
                    tableId: 2,
                    title: "รายชื่อผู้รับปันผล",
                    rowData: [
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "" },
                                    { colId: 2, val: 0 },
                                    { colId: 9, val: new Date() },
                                ]
                        },
                       

                    ]
                },
            ],
            loanData: [
                {
                    tableId: 3,
                    title: "รายการเงินกู้และการชำระเงินกู้",
                    rowData: [
                        {
                            rowId: 1,
                            data:
                                [
                                    { colId: 1, val: "เงินกู้ธนาคาร" },
                                    { colId: 2, val: 1000000 },
                                    { colId: 3, val: new Date() },
                                    { colId: 4, val: 5 },
                                    { colId: 5, val: "3 เดือน" },
                                    { colId: 6, val: "แสดงปฎิทินการชำระเงินต้น" },
                                ]
                        },

                    ]
                },
            ],
        }
    },
}

export default BIZTOOL_PAGE_MOCKDATA