import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Unit {
  unitNumber: string;
  rentAmount: number;
  tenant: {
    name: string;
    email: string;
    phone: string;
  };
}

interface Property {
  _id: string;
  name: string;
  address: string;
  units: Unit[];
}

const ManageProperties: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Fields for editing
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editUnits, setEditUnits] = useState<Unit[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API_BASE_URL}/api/properties`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Error fetching properties:", data.message || "Unknown error");
          return;
        }
        setProperties(data);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, [navigate, API_BASE_URL]);

  // ─────────────────────────────────────────────────────
  // ADD NEW PROPERTY
  // ─────────────────────────────────────────────────────
  const handleAddUnit = () => {
    setUnits([...units, { unitNumber: "", rentAmount: 0, tenant: { name: "", email: "", phone: "" } }]);
  };

  const updateUnit = (index: number, field: string, value: string | number) => {
    const updatedUnits = [...units];
    if (field in updatedUnits[index]) {
      // @ts-ignore
      updatedUnits[index][field] = value;
    } else {
      updatedUnits[index].tenant = { ...updatedUnits[index].tenant, [field]: value };
    }
    setUnits(updatedUnits);
  };

  const removeUnit = (index: number) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleAddProperty = async () => {
    if (!name || !address) {
      alert("Please fill in property name and address.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address, units }),
      });
      const data = await response.json();
      if (response.ok) {
        setProperties([...properties, data]);
        setName("");
        setAddress("");
        setUnits([]);
      } else {
        alert(`Error adding property: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // ─────────────────────────────────────────────────────
  // DELETE PROPERTY
  // ─────────────────────────────────────────────────────
  const handleDeleteProperty = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/properties/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      setProperties(properties.filter((property) => property._id !== id));
    } else {
      alert(`Error deleting property: ${data.message || "Unknown error"}`);
    }
  };

  // ─────────────────────────────────────────────────────
  // EDIT PROPERTY
  // ─────────────────────────────────────────────────────
  const handleEditClick = (property: Property) => {
    setEditingPropertyId(property._id);
    setEditName(property.name);
    setEditAddress(property.address);
    setEditUnits(JSON.parse(JSON.stringify(property.units))); // deep copy
  };

  const handleEditUnitChange = (index: number, field: string, value: string | number) => {
    const updated = [...editUnits];
    if (field in updated[index]) {
      // @ts-ignore
      updated[index][field] = value;
    } else {
      updated[index].tenant = { ...updated[index].tenant, [field]: value };
    }
    setEditUnits(updated);
  };

  const handleRemoveEditUnit = (index: number) => {
    setEditUnits(editUnits.filter((_, i) => i !== index));
  };

  const handleAddEditUnit = () => {
    setEditUnits([...editUnits, { unitNumber: "", rentAmount: 0, tenant: { name: "", email: "", phone: "" } }]);
  };

  const handleCancelEdit = () => {
    setEditingPropertyId(null);
    setEditName("");
    setEditAddress("");
    setEditUnits([]);
  };

  const handleUpdateProperty = async () => {
    if (!editName || !editAddress || !editingPropertyId) {
      alert("Please fill in property name and address.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/properties/${editingPropertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editName, address: editAddress, units: editUnits }),
      });
      const data = await response.json();
      if (response.ok) {
        setProperties(properties.map((prop) => (prop._id === editingPropertyId ? data : prop)));
        handleCancelEdit();
      } else {
        alert(`Error updating property: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Main Content Area (Sidebar is rendered separately) */}
      <div className="flex-1 overflow-auto py-10 px-4">
        {/* Header */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg w-full">
          <h1 className="text-3xl font-bold">Manage Properties</h1>
          <p className="mt-2">Add, edit, and manage your multi-unit properties with ease.</p>
        </div>

        {/* ADD PROPERTY FORM */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a Property</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Property Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <h3 className="mt-6 font-semibold text-lg">Units</h3>
          {units.map((unit, index) => (
            <div key={index} className="border p-4 mt-3 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Unit {index + 1}</p>
                <button onClick={() => removeUnit(index)} className="text-red-500 hover:text-red-700 transition">
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Unit Number"
                  value={unit.unitNumber}
                  onChange={(e) => updateUnit(index, "unitNumber", e.target.value)}
                />
                <input
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Rent Amount"
                  type="number"
                  value={unit.rentAmount}
                  onChange={(e) => updateUnit(index, "rentAmount", e.target.value)}
                />
                <input
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tenant Name"
                  value={unit.tenant.name}
                  onChange={(e) => updateUnit(index, "name", e.target.value)}
                />
                <input
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tenant Email"
                  value={unit.tenant.email}
                  onChange={(e) => updateUnit(index, "email", e.target.value)}
                />
                <input
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tenant Phone"
                  value={unit.tenant.phone}
                  onChange={(e) => updateUnit(index, "phone", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button onClick={handleAddUnit} className="mt-4 text-blue-500 hover:underline">
            + Add Unit
          </button>
          <button
            onClick={handleAddProperty}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Property
          </button>
        </div>

        {/* EDIT PROPERTY FORM (IF EDITING) */}
        {editingPropertyId && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Property</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Property Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Address"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
              />
            </div>
            <h3 className="mt-6 font-semibold text-lg">Units</h3>
            {editUnits.map((unit, index) => (
              <div key={index} className="border p-4 mt-3 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Unit {index + 1}</p>
                  <button onClick={() => handleRemoveEditUnit(index)} className="text-red-500 hover:text-red-700 transition">
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Unit Number"
                    value={unit.unitNumber}
                    onChange={(e) => handleEditUnitChange(index, "unitNumber", e.target.value)}
                  />
                  <input
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Rent Amount"
                    type="number"
                    value={unit.rentAmount}
                    onChange={(e) => handleEditUnitChange(index, "rentAmount", e.target.value)}
                  />
                  <input
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Tenant Name"
                    value={unit.tenant.name}
                    onChange={(e) => handleEditUnitChange(index, "name", e.target.value)}
                  />
                  <input
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Tenant Email"
                    value={unit.tenant.email}
                    onChange={(e) => handleEditUnitChange(index, "email", e.target.value)}
                  />
                  <input
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Tenant Phone"
                    value={unit.tenant.phone}
                    onChange={(e) => handleEditUnitChange(index, "phone", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button onClick={handleAddEditUnit} className="mt-4 text-blue-500 hover:underline">
              + Add Unit
            </button>
            <div className="flex mt-6 gap-4">
              <button
                onClick={handleUpdateProperty}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* PROPERTY LIST */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Properties</h2>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{property.name}</h3>
                      <p className="text-gray-600">{property.address}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(property)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition font-medium px-3 py-1 border border-blue-600 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="text-sm text-red-600 hover:text-red-800 transition font-medium px-3 py-1 border border-red-600 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {property.units.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Units:</p>
                      {property.units.map((unit, idx) => (
                        <div key={idx} className="ml-4 border-b py-1">
                          <p>
                            <span className="font-medium">Unit:</span> {unit.unitNumber}
                          </p>
                          <p>
                            <span className="font-medium">Rent:</span> ${unit.rentAmount}
                          </p>
                          {unit.tenant &&
                            (unit.tenant.name || unit.tenant.email || unit.tenant.phone) && (
                              <div className="ml-2">
                                <p>
                                  <span className="font-medium">Tenant:</span> {unit.tenant.name}
                                </p>
                                <p>
                                  <span className="font-medium">Email:</span> {unit.tenant.email}
                                </p>
                                <p>
                                  <span className="font-medium">Phone:</span> {unit.tenant.phone}
                                </p>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No properties added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
