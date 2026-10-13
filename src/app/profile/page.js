async function getProfile() {
  const response = await fetch("https://fakestoreapi.com/users/3");
  if (!response.ok) throw new Error("Profile could not be loaded.");
  return response.json();
}

export default async function ProfilePage() {
  const user = await getProfile();
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
