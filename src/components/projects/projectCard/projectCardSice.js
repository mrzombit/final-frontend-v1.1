import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const projectCardSice = createSlice({
  name: "projectCard",
  initialState,
  reducers: {
    addproject: (state) => {},
    currentproject: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  projectCardSice.actions;

export default projectCardSice.reducer;
