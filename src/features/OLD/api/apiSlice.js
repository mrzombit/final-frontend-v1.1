import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import URL from './../URL'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
    tagTypes: ['Project', 'User'],
    endpoints: builder => ({})
})