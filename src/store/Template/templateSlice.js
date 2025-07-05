import { saveTemplatesToStorage } from "@/utils/storeTemplate";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  selectedTemplateId: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addTemplate: (state, action) => {
      if (state.templates.length <= 5) {
        state.templates.push(action.payload);
        saveTemplatesToStorage(state.templates);
      }
    },
    updateTemplate: (state, action) => {
      const idx = state.templates.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.templates[idx] = action.payload;
        saveTemplatesToStorage(state.templates);
      }
    },
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
      saveTemplatesToStorage(state.templates);
    },
    selectTemplate: (state, action) => {
      state.selectedTemplateId = action.payload;
    },
    setTemplate: (state, action) => {
      state.templates = action.payload;
    },
  },
});

export const {
  addTemplate,
  updateTemplate,
  deleteTemplate,
  selectTemplate,
  setTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
