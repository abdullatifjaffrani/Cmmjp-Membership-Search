"use client";

import { useState } from "react";
import { searchMember } from "../utils/searchMember";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"nic" | "membership">("nic"); // State for dropdown selection
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = () => {
    const member = searchMember(query, searchBy); // Pass searchBy type to the search function
    setResult(member);
    setSearched(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg text-center w-full max-w-lg">
        {/* Logo Display */}
        <div className="mb-4">
          <Image width={100} height={200} src="/logo.png" alt="Community Logo" className="h-20 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cutchi Memon Markazi Jamat Pakistan</h1>
        <h2 className="text-1xl font-semibold mb-4">Community Member Search</h2>

        <div className="mb-6">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as "nic" | "membership")}
            className="border p-2 mr-2"
          >
            <option value="nic">Search by NIC</option>
            <option value="membership">Search by Membership No</option>
          </select>

          <input
            type="text"
            placeholder={`Enter ${searchBy === "nic" ? "NIC" : "Membership No"}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {searched && !result && (
          <p className="text-red-500 mt-4">No member found</p>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Member Details</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Name</td>
                  <td className="p-2">{result.name}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Father Name</td>
                  <td className="p-2">{result.fatherName}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Cast</td>
                  <td className="p-2">{result.surName}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">NIC/CNIC No</td>
                  <td className="p-2">{result.nic}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Area Jamat</td>
                  <td className="p-2">{result.areaJamat}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Address</td>
                  <td className="p-2">{result.address}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-bold bg-gray-100">Mobile No</td>
                  <td className="p-2">{result.mobileNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}