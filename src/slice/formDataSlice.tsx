import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}

interface FormState {
  uncontrolledForm: FormData | null;
  hookForm: FormData | null;
  countries: string[];
}

const initialState: FormState = {
  uncontrolledForm: null,
  hookForm: null,
  countries: ["United States", "Canada", "Mexico", "Germany", "France", "Spain", "Italy"], // example countries
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledForm = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookForm = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
