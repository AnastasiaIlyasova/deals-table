import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  deals: [],
}

const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    createDeal(state, action) {
      state.deals = [...state.deals, action.payload];
    },
    updateDeal(state, action) {
      const { id, fullName, tel, budget, progress, createdDate } = action.payload;
      const dealIndex = state.deals.findIndex((deal) => deal.id === Number(id));

      if (dealIndex !== -1) {
        state.deals[dealIndex] = {
          ...state.deals[dealIndex],
          fullName,
          tel,
          budget,
          status: progress,
          createdDate: createdDate,
        };
      }
    },
    addComment(state, action) {
      const { id, comment } = action.payload;
      const dealIndex = state.deals.findIndex((deal) => deal.id === Number(id));

      if (dealIndex !== -1) {
        state.deals[dealIndex].comments.push(comment);
      }
    },
  },
})

export const {createDeal, updateDeal, addComment} =  dealSlice.actions
export default dealSlice.reducer