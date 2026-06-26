import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

function TableModal({
  isOpen,
  onClose,
  onSuccess,
  table,
}) {
  const [tableName, setTableName] = useState("");
  const [tableType, setTableType] = useState("Green");
  const [hourlyRate, setHourlyRate] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    if (table) {
      setTableName(table.table_name);
      setTableType(table.table_type);
      setHourlyRate(table.hourly_rate);
      setStatus(table.status);
    } else {
      setTableName("");
      setTableType("Green");
      setHourlyRate("");
      setStatus("Available");
    }
  }, [table]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tableName || !hourlyRate) {
      toast.error("Please complete all fields.");
      return;
    }

    if (table) {
      const { error } = await supabase
        .from("tables")
        .update({
          table_name: tableName,
          table_type: tableType,
          hourly_rate: hourlyRate,
          status,
        })
        .eq("id", table.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Table updated successfully.");
    } else {
      const { error } = await supabase
        .from("tables")
        .insert({
          table_name: tableName,
          table_type: tableType,
          hourly_rate: hourlyRate,
          status,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Table added successfully.");
    }

    onSuccess();
    onClose();
  };

    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-lg border border-slate-700 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-8">
          {table ? "Edit Table" : "Add New Table"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-white mb-2">
              Table Name
            </label>

            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Table Type
            </label>

            <select
              value={tableType}
              onChange={(e) => setTableType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            >
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">
              Hourly Rate
            </label>

            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            >
              <option value="Available">
                Available
              </option>

              <option value="Maintenance">
                Maintenance
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {table ? "Update Table" : "Add Table"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TableModal;