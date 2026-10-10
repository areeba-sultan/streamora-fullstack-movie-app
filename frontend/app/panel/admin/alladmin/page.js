"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sidebar";
import {
  FaUserShield,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEnvelope,
} from "react-icons/fa";

export default function AllAdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editAdmin, setEditAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
  try {
    const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/admin/all", {
      headers: {
        "admin-key": localStorage.getItem("adminKey") || "",
      },
    });

    const data = await res.json();

    setAdmins(data);
    setFilteredAdmins(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
 async function deleteAdmin(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this admin?"
  );

  if (!confirmDelete) return;

  const res = await fetch(
  `https://streamora-fullstack-movie-app.onrender.com/admin/${id}`,
  {
    method: "DELETE",
    headers: {
      "admin-key": localStorage.getItem("adminKey") || "",
    },
  }
);
  const data = await res.json();
    alert(data.message);
    fetchAdmins();
    try{
  } catch (err) {
    console.log(err);
  }
}

async function updateAdmin() {

  try {

    const res = await fetch(
      `https://streamora-fullstack-movie-app.onrender.com/admin/${editAdmin.id}`,
      {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          "admin-key": localStorage.getItem("adminKey") || "",
        },
        body:JSON.stringify(editAdmin)
      }
    );


    const data = await res.json();

    setShowEditModal(false);
    setMessage("Admin updated successfully ✅");
      setTimeout(() => {
      setMessage("");
     }, 2500);
    fetchAdmins();

  } catch(err){
    console.log(err);
  }

}

  useEffect(() => {
    const result = admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.role.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredAdmins(result);
  }, [search, admins]);

  return (
    <div className="min-h-screen flex bg-[#070707] text-white">

      <Sidebar />
      {message && (
      <div
      className="fixed top-6 right-6  z-[999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-pulse">
      {message}
    </div>
   )}

      <div className="flex-1 p-10">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              All Admins
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all administrators.
            </p>

          </div>

          <div className="bg-red-600 px-5 py-3 rounded-xl shadow-lg">

            <p className="text-sm text-red-100">
              Total Admins
            </p>

            <h2 className="text-2xl font-bold">
              {admins.length}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            bg-white/5
            border
            border-white/10
            rounded-xl
            pl-11
            pr-4
            py-3
            outline-none
            focus:border-red-500
            backdrop-blur-xl
            "
          />
          </div>

        {/* Table */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
          <table className="w-full">
            <thead className="bg-red-600/20 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4">
                  Admin
                </th>
                <th className="text-left px-6 py-4">
                  Email
                </th>
                <th className="text-left px-6 py-4">
                  Role
                </th>
                <th className="text-center px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-12 text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
                ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-12 text-gray-500"
                  >
                    No Admin Found
                  </td>
                </tr>
              ) : (

                filteredAdmins.map((admin) => (

                  <tr
                    key={admin.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    {/* Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                          <FaUserShield className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {admin.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            ID : {admin.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope className="text-red-500" />
                        {admin.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">
                      <span
                        className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ${
                          admin.role === "SUPERADMIN"
                            ? "bg-red-600 text-white"
                            : "bg-white/10 text-gray-300"
                        }
                        `}
                      >
                        {admin.role}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                    <button
                       onClick={()=>{
                      setEditAdmin(admin);
                      setShowEditModal(true);
                     }}
                       className="
                       w-10
                       h-10
                       rounded-lg
                     bg-blue-600/20
                    hover:bg-blue-600
                      transition
                      flex
                      items-center
                      justify-center
                       "
                    >
                   <FaEdit />
                </button>

                <button
                   onClick={() => deleteAdmin(admin.id)}
                   className="w-10 h-10 rounded-lg bg-red-600/20 hover:bg-red-600 transition flex items-center justify-center">
                 <FaTrash />
                 </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
            </div>
             {showEditModal && editAdmin && (
               <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
         <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-7 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">
            Edit Admin
        </h2>
            <input 
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 outline-nonefocus:border-red-500"
             value={editAdmin.name}
             onChange={(e)=>
             setEditAdmin({
             ...editAdmin,
             name:e.target.value
            })
           }
           placeholder="Name"
           />
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 outline-nonefocus:border-red-500"
          value={editAdmin.email}
           onChange={(e)=>
           setEditAdmin({
           ...editAdmin,
          email:e.target.value
           })
          }
            placeholder="Email"
        />
             <input
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 outline-none focus:border-red-500 " 
             value={editAdmin.password}
             onChange={(e)=>
             setEditAdmin({
            ...editAdmin,
             password:e.target.value
            })
           }
           placeholder="Password"
           />
           <select
           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 outline-none"
           value={editAdmin.role}
           onChange={(e)=>
           setEditAdmin({
            ...editAdmin,
            role:e.target.value
            })
            }
            >

            <option value="ADMIN">
            ADMIN
            </option>
            <option value="SUPERADMIN">
            SUPERADMIN
            </option>
            </select>
               <div className="flex gap-3">
               <button
               onClick={()=>setShowEditModal(false)}
               className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20">
               Cancel
               </button>
            <button
            onClick={updateAdmin}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold ">
              Save Changes
              </button>
            </div>
        </div>
    </div>
   )}
 </div>
  );
}