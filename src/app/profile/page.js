"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthReady, selectToken } from "@/store/authSlice";

// The Fake Store token is a JWT whose "sub" claim is the user id.
function getUserId(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(payload)).sub ?? null;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const token = useSelector(selectToken);
  const isAuthReady = useSelector(selectIsAuthReady);
  const [profile, setProfile] = useState({ userId: null, user: null, error: false });

  const userId = token ? getUserId(token) : null;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function loadUser() {
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
        if (!response.ok) throw new Error("Profile could not be loaded.");
        const user = await response.json();
        if (!user) throw new Error("Profile could not be found.");
        if (!cancelled) setProfile({ userId, user, error: false });
      } catch (error) {
        console.error(error);
        if (!cancelled) setProfile({ userId, user: null, error: true });
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!isAuthReady) {
    return (
      <section className="page-shell profile-page">
        <p className="muted" role="status">Loading...</p>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="page-shell profile-page">
        <div className="profile-hero">
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Please log on</h1>
        </div>
      </section>
    );
  }

  const isCurrent = profile.userId === userId;

  if (!userId || (isCurrent && profile.error)) {
    return (
      <section className="page-shell profile-page">
        <div className="error-box">
          We could not load your profile. Please log out and log in again.
        </div>
      </section>
    );
  }

  const user = isCurrent ? profile.user : null;

  if (!user) {
    return (
      <section className="page-shell profile-page">
        <p className="muted" role="status">Loading your profile...</p>
      </section>
    );
  }

  const fullName = `${user.name.firstname} ${user.name.lastname}`;

  return (
    <section className="page-shell profile-page">
      <div className="profile-hero"><p className="eyebrow">YOUR ACCOUNT</p><h1>Welcome back,<br /><em>{user.name.firstname}.</em></h1></div>
      <div className="profile-card">
        <div className="avatar">{user.name.firstname[0]}{user.name.lastname[0]}</div>
        <div><p className="eyebrow">PROFILE DETAILS</p><h2>{fullName}</h2><p className="muted">@{user.username}</p></div>
        <div className="profile-details"><p><span>Email</span>{user.email}</p><p><span>Phone</span>{user.phone}</p><p><span>Address</span>{user.address.number} {user.address.street}, {user.address.city}</p></div>
      </div>
    </section>
  );
}
