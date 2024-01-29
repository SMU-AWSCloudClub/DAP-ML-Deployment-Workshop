import React, { useState } from "react";
import apiClient from "../api/apiClient";

const PropertyForm = () => {
  const [value, setValue] = useState(null);
  const [formData, setFormData] = useState({
    floor_area_sqm: 90.0,
    mid_storey: 11,
    full_flat_type: "4 ROOM Model A",
    commercial: 0,
    planning_area: "Kallang",
    mall_nearest_distance: 1094.090418,
    hawker_nearest_distance: 154.7533573,
    mrt_nearest_distance: 330.0830689707568,
    mrt_interchange: 0,
    pri_sch_nearest_distance: 1138.6334215866475,
    pri_sch_name: "Geylang Methodist School",
    pri_sch_affiliation: 1,
    sec_sch_nearest_dist: 1138.6334215866475,
    sec_sch_name: "Geylang Methodist School",
    age_when_sold: 10,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    try {
      const response = await apiClient.postCalculator({
        body: JSON.stringify(formData),
      });
      console.log("Response:", response.data);
      setValue(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-[66px]">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
        {Object.keys(formData).map((key, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      {value && (
        <div className="mt-4 text-center">
          <p>{value.prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyForm;
