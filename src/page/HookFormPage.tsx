import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../slice/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
}

const schema = yup.object().shape({
  name: yup.string().matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter').required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, 'Password must be at least 8 characters long, and include a number, an uppercase letter, a lowercase letter, and a special character').required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  gender: yup.string().required(),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  picture: yup.mixed().test('fileType', 'Only PNG and JPEG formats are allowed', (value) => {
    if (!value.length) return true;
    return ['image/jpeg', 'image/png'].includes(value[0].type);
  }).test('fileSize', 'Image size should be less than 2MB', (value) => {
    if (!value.length) return true;
    return value[0].size <= 2 * 1024 * 1024;
  }),
  country: yup.string().required(),
});

function HookFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.formData.countries);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setHookFormData({
        ...data,
        picture: reader.result as string,
      }));
      navigate('/');
    };

    const pictureFile = data.picture[0];
    if (pictureFile) {
      reader.readAsDataURL(pictureFile);
    } else {
      reader.onloadend();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div id="hook-from-page">
        <label htmlFor="name">Name:</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" {...register('age')} />
        <p>{errors.age?.message}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <p>{errors.gender?.message}</p>
      </div>
      <div>
        <label htmlFor="acceptTerms">Accept Terms and Conditions:</label>
        <input type="checkbox" {...register('acceptTerms')} />
        <p>{errors.acceptTerms?.message}</p>
      </div>
      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" {...register('picture')} />
        <p>{errors.picture?.message}</p>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select {...register('country')}>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
        <p>{errors.country?.message}</p>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default HookFormPage;
