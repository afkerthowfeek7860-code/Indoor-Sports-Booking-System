import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setUsers(data);
    setLoading(false);
  };

  const changeRole = async (user) => {
    const newRole =
      user.role === "admin"
        ? "customer"
        : "admin";

    const { error } = await supabase
      .from("profiles")
      .update({
        role: newRole,
      })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Role updated.");
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading users...
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-3xl font-bold text-white mb-8">
        Manage Users
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-700">

        <table className="min-w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left text-white">
                Name
              </th>

              <th className="px-6 py-4 text-left text-white">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-white">
                Role
              </th>

              <th className="px-6 py-4 text-left text-white">
                Joined
              </th>

              <th className="px-6 py-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-slate-700 bg-slate-900"
              >

                <td className="px-6 py-4 text-white">
                  {user.full_name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {user.phone || "-"}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="px-6 py-4 text-slate-300">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() => changeRole(user)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                  >
                    Change Role
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminUsers;