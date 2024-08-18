import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../slice/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

function UncontrolledFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.formData.countries);

  const [errors, setErrors] = useState<string[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    const nameValue = nameRef.current?.value || '';
    const ageValue = ageRef.current?.value || '';
    const emailValue = emailRef.current?.value || '';
    const passwordValue = passwordRef.current?.value || '';
    const confirmPasswordValue = confirmPasswordRef.current?.value || '';
    const genderValue = genderRef.current?.value || '';
    const termsValue = termsRef.current?.checked;
    const pictureValue = pictureRef.current?.files?.[0];
    const countryValue = countryRef.current?.value || '';

    if (!/^[A-Z][a-z]*$/.test(nameValue)) {
      newErrors.push('Name must start with an uppercase letter.');
    }

    if (!/^\d+$/.test(ageValue) || parseInt(ageValue) <= 0) {
      newErrors.push('Age must be a positive number.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      newErrors.push('Invalid email format.');
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      newErrors.push('Password must be at least 8 characters long, and include a number, an uppercase letter, a lowercase letter, and a special character.');
    }

    if (passwordValue !== confirmPasswordValue) {
      newErrors.push('Passwords do not match.');
    }

    if (pictureValue) {
      const validExtensions = ['image/jpeg', 'image/png'];
      if (!validExtensions.includes(pictureValue.type)) {
        newErrors.push('Only PNG and JPEG formats are allowed.');
      }
      if (pictureValue.size > 2 * 1024 * 1024) {
        newErrors.push('Image size should be less than 2MB.');
      }
    }

    if (!termsValue) {
      newErrors.push('You must accept the Terms and Conditions.');
    }

    if (!countryValue) {
      newErrors.push('Please select a country.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setUncontrolledFormData({
        name: nameRef.current?.value || '',
        age: parseInt(ageRef.current?.value || '0'),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        acceptTerms: termsRef.current?.checked || false,
        picture: reader.result as string,
        country: countryRef.current?.value || '',
      }));

      navigate('/');
    };

    const pictureFile = pictureRef.current?.files?.[0];
    if (pictureFile) {
      reader.readAsDataURL(pictureFile);
    } else {
      reader.onloadend();
    }
  };

  return (
    <form onSubmit={handleSubmit} id="uncontrolled-from-page">
      <h1>Uncontrolled From</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" id="terms" ref={termsRef} />
      </div>
      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" id="picture" ref={pictureRef} />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" ref={countryRef}>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {errors.length > 0 && (
        <div id="errors" style={{ color: 'red' }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default UncontrolledFormPage;
