import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";
import TableModal from "./TableModal";

function AdminTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .order("id");

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setTables(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setSelectedTable(null);
    setShowModal(true);
  };

  const openEditModal = (table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const deleteTable = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this table?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tables")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Table deleted");
    fetchTables();
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading tables...
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-white">
          Manage Tables
        </h2>

        <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold"
            >
            + Add Table
        </button>

      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700">

        <table className="min-w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left text-white">
                Name
              </th>

              <th className="px-6 py-4 text-left text-white">
                Type
              </th>

              <th className="px-6 py-4 text-left text-white">
                Hourly Rate
              </th>

              <th className="px-6 py-4 text-left text-white">
                Status
              </th>

              <th className="px-6 py-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tables.map((table) => (

              <tr
                key={table.id}
                className="border-t border-slate-700 bg-slate-900"
              >

                <td className="px-6 py-4 text-white">
                  {table.table_name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {table.table_type}
                </td>

                <td className="px-6 py-4 text-green-400 font-semibold">
                  Rs.{table.hourly_rate}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      table.status === "Available"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {table.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-2 justify-center">

                    <button
                        onClick={() => openEditModal(table)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        >
                        Edit
                    </button>

                    <button
                      onClick={() => deleteTable(table.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <TableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchTables}
        table={selectedTable}
      />

    </div>
  );
}

export default AdminTables;