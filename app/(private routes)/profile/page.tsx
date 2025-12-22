import css from './ProfilePage.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile page",
  description: "User profile page with personal information",
  metadataBase: "https://09-auth-five-nu.vercel.app/",
  openGraph: {
    title: "Profile page",
    description: "User profile page with personal information",
    url: "https://09-auth-five-nu.vercel.app/",
    images: [
      {
        url: "https://09-auth-five-nu.vercel.app/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub - Profile page"
      }
    ]
  }
};

const Profile = () => {

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            className={css.avatar}
            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: username</p>
          <p>Email: email</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
