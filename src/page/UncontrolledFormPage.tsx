import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledData } from '../slice/formDataSlice';

function UncontrolledFormPage() {
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && emailRef.current) {
      dispatch(setUncontrolledData({
        username: usernameRef.current.value,
        email: emailRef.current.value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" ref={usernameRef} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" ref={emailRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledFormPage;
