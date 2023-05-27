const CHECKBIZ_CONFIG = {
    cashflow: {
        list: [
            {
                name: "Starting cash balance",
                total: [1, 2, 3, 4],
                data: [],
            },
            {
                name: "Net cashflow from operting",
                total: [1, 2, 3, 42],
                data: [
                    {
                        name: "Payment of Products",
                        val: [1, 2, 3, 4],
                    },
                    {
                        name: "Payment of Operations",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "Interest Payment",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "Taxes",
                        val: [5, 6, 7, 8],
                    },
                ],
            },
            {
                name: "Net cashflow from investing",
                total: [1, 2, 3, 43],
                data: [],
            },
            {
                name: "Net cashflow from financing",
                total: [1, 2, 3, 44],
                data: [],
            },
            {
                name: "Net cashflow this year",
                total: [1, 2, 3, 45],
                data: [],
            },
        ],
    },
    income: {
        list: [
            {
                name: "รายได้",
                total: [],
                data: [
                    
                ],
            },
            {
                name: "รายได้สุทธิ",
                total: [1, 2, 3, 43],
                data: [],
            },
            {
                name: "ค่าใช้จ่าย",
                total: [1, 2, 3, 43],
                data: [],
            },
            {
                name: "ค่าใช้จ่ายในการขาย",
                total: [],
                data: [
                    {
                        name: "ต้นทุนขายสินค้าเพื่อขาย",
                        val: [1, 2, 3, 4],
                    },
                    {
                        name: "ต้นทุนการให้บริการ",
                        val: [5, 6, 7, 8],
                    },
                ],
            },
            {
                name: "รวมค่าใช้จ่ายในการขาย",
                total: [1, 2, 3, 43],
                data: [],
            },
            {
                name: "ค่าใช้จ่ายในการบริหาร",
                total: [1, 2, 3, 44],
                data: [
                    {
                        name: "ค่าใช้จ่ายเกี่ยวกับพนักงาน",
                        val: [1, 2, 3, 4],
                    },
                    {
                        name: "ค่าใช้จ่ายด้านโฆษณาและการตลาด",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "ค่าสาธารนูปโภคและค่าใช้จ่ายสำนักงาน",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "ค่าเข่า",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "ค่าบริการด้านวิชาชีพ",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "ค่าบริการทั่วไป",
                        val: [5, 6, 7, 8],
                    },
                    {
                        name: "ค่าธรรมเนียมต่างๆ",
                        val: [5, 6, 7, 8],
                    },
                ],
            },
            {
                name: "รวมค่าใช้จ่ายในการบริหาร",
                total: [],
                data: [],
            },
            {
                name: "ค่าใช้จ่ายสุทธิ",
                total: [1, 2, 3, 45],
                data: [],
            },
            {
                name: "",
                total: [],
                data: [],
            },
            {
                name: "กำไร(ขาดทุน)ก่อนต้นทุนทางการเงินและค่าใช้จ่ายภาษีเงินได้",
                total: [1, 2, 3, 45],
                data: [],
            },
            {
                name: "ต้นทุนทางการเงิน",
                total: [1, 2, 3, 45],
                data: [],
            },
            {
                name: "กำไร(ขาดทุน)ก่อนค่าใช้จ่ายภาษีเงินได้",
                total: [1, 2, 3, 45],
                data: [],
            },
            {
                name: "ค่าใช้จ่ายภาษีเงินได้",
                total: [1, 2, 3, 45],
                data: [],
            },
            {
                name: "กำไร(ขาดทุน)สุทธิ",
                total: [1, 2, 3, 45],
                data: [],
            },
        ],
    }
}

export default CHECKBIZ_CONFIG;