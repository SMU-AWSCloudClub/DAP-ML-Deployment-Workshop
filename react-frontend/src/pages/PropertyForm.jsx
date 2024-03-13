import React, { useState } from "react";
import apiClient from "../api/apiClient";

const PropertyForm = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    floor_area_sqm: 90.0,
    mid_storey: 11,
    full_flat_type: "4 ROOM Model A",
    planning_area: "Kallang",
    mall_nearest_distance: 1094.090418,
    hawker_nearest_distance: 154.7533573,
    mrt_nearest_distance: 330.0830689707568,
    pri_sch_nearest_distance: 1138.6334215866475,
    pri_sch_name: "Geylang Methodist School",
    sec_sch_nearest_dist: 1138.6334215866475,
    sec_sch_name: "Geylang Methodist School",
    age_when_sold: 10,
  });

  const staticFields = {
    commercial: 0,
    mrt_interchange: 0,
    pri_sch_affiliation: 1,
  }

  const dropdownOptions = {
    full_flat_type: [
      "4 ROOM Model A",
      "5 ROOM Improved",
      "EXECUTIVE Apartment",
      "4 ROOM Simplified",
      "3 ROOM Improved",
      "3 ROOM New Generation",
      "4 ROOM Premium Apartment",
      "3 ROOM Model A",
      "5 ROOM Premium Apartment",
      "4 ROOM Model A2",
    ],
    planning_area: [
      "Kallang",
      "Bishan",
      "Bukit Batok",
      "Yishun",
      "Geylang",
      "Hougang",
      "Bedok",
      "Sengkang",
      "Tampines",
      "Serangoon",
    ],
    pri_sch_name: [
      "Geylang Methodist School",
      "Kuo Chuan Presbyterian Primary School",
      "Keming Primary School",
      "Catholic High School",
      "Naval Base Primary School",
      "Saint Margaret's Primary School",
      "Xinmin Primary School",
      "Damai Primary School",
      "Ai Tong School",
      "Anchor Green Primary School",
    ],
    sec_sch_name: [
      "Ahmad Ibrahim Secondary School",
      "Ang Mo Kio Secondary School",
      "Anglican High School",
      "Assumption English School",
      "Bedok Green Secondary School",
      "Boon Lay Secondary School",
      "Broadrick Secondary School",
      "Bukit Merah Secondary School",
      "Bukit View Secondary School",
      "Canberra Secondary School",
    ]
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    // let payload = JSON.parse(formData);
    const fullFormData = { ...formData, ...staticFields };
    try {
      const response = await apiClient.postCalculator({
        body: JSON.stringify(fullFormData),
        // JSON.parse(formData),
      });
      console.log("Response:", response.data);
      setValue(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderInputField = (key) => {
    return (
      <input
        type="text"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    );
  };

  const renderDropdownField = (key) => {
    return (
      <select
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {Object.entries(dropdownOptions[key]).map(([value, label]) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-[66px]">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
        {Object.keys(formData).map((key, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {key.replace(/_/g, " ")}
            </label>
            {dropdownOptions[key]
              ? renderDropdownField(key)
              : renderInputField(key)}
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
