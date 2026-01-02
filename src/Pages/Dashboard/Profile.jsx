import React, { use, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = use(AuthContext);
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    try {
      await updateProfile(user, { displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      // Optionally send to backend to persist
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            name="photoURL"
            defaultValue={user?.photoURL}
            className="input input-bordered w-full"
          />
        </div>
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
