import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  uncontrolled: { username: string; email: string } | null;
  hookForm: { username: string; email: string } | null;
}

const initialState: FormData = {
  uncontrolled: null,
  hookForm: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUncontrolledData: (state, action: PayloadAction<{ username: string; email: string }>) => {
      state.uncontrolled = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<{ username: string; email: string }>) => {
      state.hookForm = action.payload;
    },
  },
});

export const { setUncontrolledData, setHookFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
