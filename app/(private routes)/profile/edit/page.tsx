'use client';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EditProfilePage = () => {
  const router = useRouter();

  const user = useAuthStore(store => store.user);
  const setUser = useAuthStore(store => store.setUser);

  const [isPending, setIsPending] = useState(false);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as { username?: string };
    
    if (!values.username?.trim()) return;

    setIsPending(true);
    try {
      const updatedUser = await updateMe({
        username: values.username,
      });

      setUser(updatedUser);
      router.push('/profile');
    } finally {
      setIsPending(false);
    }
    
  };
      
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          className={css.avatar}
          width={120}
          height={120}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" className={css.input} />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.push('/profile')}
              type="button"
              className={css.cancelButton}
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
