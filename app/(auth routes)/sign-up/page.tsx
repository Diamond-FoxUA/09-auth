'use client';

import css from './SignUpPage.module.css';
import { register, RegisterRequest } from '@/lib/api/clientApi';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';

function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.error ??
            error.message ??
            'Oops.. something went wrong'
        );
      } else {
        setError('Oops.. something went wrong');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign Up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUp;