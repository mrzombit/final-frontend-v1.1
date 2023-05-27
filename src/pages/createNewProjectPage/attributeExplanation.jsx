import React from 'react'
import CPT0Industry from './cpt0Industry'
import CPT1NameDescription from './cpt1NameDescription'
import CPT2StartDateProjectionPeriod from './cpt2StartDateProjectionPeriod'
import CPT3CurrencyTaxDiscount from './cpt3CurrencyTaxDiscount'
import CPT4SaleTrends from './cpt4SaleTrends'
import CPT5Picture from './cpt5Picture'

const AttributeExplaination = (props) => {
    return (
        <div className='create-project-descriptions-style'>
            {props.industry == true &&
               <CPT0Industry/>
            }
            {props.nameDescription === true &&
                <CPT1NameDescription/>
            }
            {props.startDateProjectionPeriod === true &&
                <CPT2StartDateProjectionPeriod/>
            }
            {props.currencyTaxDiscount === true &&
                <CPT3CurrencyTaxDiscount/>
            }
            {props.saleTrend === true &&
                <CPT4SaleTrends/>
            }
            {props.picture === true &&
                <CPT5Picture/>
            }
        </div>
    )
}

export default AttributeExplaination