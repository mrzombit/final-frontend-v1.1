import { configureStore } from '@reduxjs/toolkit'
import assetAccountReducer from '../features/assetAccountsSlice'
import businessGoalsReducer from '../features/businessGoalsSlice'
import currenciesReducer from '../features/currenciesSlice'
import industriesReducer from '../features/industriesSlice'
import periodsReducer from '../features/periodsSlice'
import projectsReducer from '../features/projectsSlice'
import projectTemplatesReducer from '../features/projectTemplatesSlice'
import subscriptionPlansReducer from '../features/substriptionPlansSlice'
import transactionsReducer from '../features/transactionsSlice'
import usersReducer from '../features/usersSlice'

export default configureStore({
  reducer: {
    assetAccounts: assetAccountReducer,
    businessGoals: businessGoalsReducer,
    currencies: currenciesReducer,
    industries: industriesReducer,
    periods: periodsReducer,
    projects: projectsReducer,
    projectTemplates: projectTemplatesReducer,
    subscriptionPlans: subscriptionPlansReducer,
    transactions: transactionsReducer,
    users: usersReducer,
  },
})
