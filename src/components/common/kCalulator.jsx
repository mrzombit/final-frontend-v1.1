
const KCalulateFunctions = {
    getEquityShare: function (allData, myInvest, isOwner) {
        const debts = allData.debt_issuance_tables[0].debt_issuances.map(each => {
            return each.amount
        }) //array
        let totalDebts = 0
        totalDebts = debts.reduce((partialSum, a) => partialSum + a, 0)
        const invests = allData.equity_contribution_tables[0].equity_contributions.map(each => {
            return each.amount
        }) //array

        let totalInvests = 0
        totalInvests = invests.reduce((partialSum, a) => partialSum + a, 0)
        const totalAmount = totalDebts + totalInvests
        const share = !isOwner ? (myInvest * 100) / totalAmount : ((myInvest + totalDebts) * 100) / totalAmount
        return totalAmount !== 0 ? parseFloat(share).toFixed(2) : 0
    },
    getRemainDebt: function (debtIssuances) {
        let totalDebts = debtIssuances.map(each => {
            return each.amount
        }).reduce((partialSum, a) => partialSum + a, 0)

        let totalPaid = debtIssuances.map(eachDebt => {
            let eachPaid = eachDebt.payments.map(each => {
                return each.amount
            }).reduce((partialSum, a) => partialSum + a, 0)
            return eachPaid
        }).reduce((partialSum, a) => partialSum + a, 0)
        console.log(totalDebts);
        console.log(totalPaid);
        let remainDebts = totalDebts - totalPaid
        return remainDebts
    },
    getRemainDebtYearly: function (debtIssuances, year) {
        let totalDebts = debtIssuances.map(each => {
            return each.amount
        }).reduce((partialSum, a) => partialSum + a, 0)
        let totalYearPaid = debtIssuances.map(eachDebt => {
            let eachDebtYearPaid = 0 
            for (let i = 0; i < year; i++) {
                eachDebtYearPaid = eachDebtYearPaid + eachDebt.payments[i].amount
            }
            return eachDebtYearPaid
        }).reduce((partialSum, a) => partialSum + a, 0)
        let remainDebts = totalDebts- totalYearPaid
        return remainDebts
    },
}

export default KCalulateFunctions