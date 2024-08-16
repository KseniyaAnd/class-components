import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../slice/formDataSlice';

interface IFormInput {
  username: string;
  email: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

function HookFormPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(setHookFormData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input {...register('username')} />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HookFormPage;
