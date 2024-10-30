"use client";

import { useState } from "react";
import { Member, members } from "../data/members";
import Image from "next/image";
import { exportToExcel, exportToCSV } from "../components/ExportButtons"; 

// Custom type to restrict searchable fields
type SearchableFields = "nic" | "membershipNo" | "surName" | "areaJamat" | "name";

export default function Home() {
  const [query1, setQuery1] = useState<string>("");
  const [query2, setQuery2] = useState<string>("");
  const [searchBy1, setSearchBy1] = useState<SearchableFields>("nic");
  const [searchBy2, setSearchBy2] = useState<"" | SearchableFields>("");
  const [result, setResult] = useState<Member[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = () => {
    if (!query1.trim()) {
      setResult([]);
      setSearched(false);
      return;
    }

    const filteredMembers = searchMember(query1, searchBy1, members, query2, searchBy2 || undefined);
    setResult(filteredMembers);
    setSearched(true);
  };

  const searchMember = (
    query1: string,
    searchBy1: SearchableFields,
    members: Member[],
    query2?: string,
    searchBy2?: SearchableFields
  ): Member[] => {
    const lowerQuery1 = query1.trim().toLowerCase();
    const lowerQuery2 = query2?.trim().toLowerCase();

    return members.filter((member) => {
      const match1 =
        searchBy1 === "nic" || searchBy1 === "membershipNo"
          ? member[searchBy1] === query1.trim()
          : member[searchBy1]?.toLowerCase().includes(lowerQuery1);

      const match2 = searchBy2 && lowerQuery2
        ? member[searchBy2]?.toLowerCase().includes(lowerQuery2)
        : true;

      return match1 && match2;
    });
  };

  const handleExportToExcel = () => {
    exportToExcel(result, "members_data");
  };

  const handleExportToCSV = () => {
    exportToCSV(result, "members_data");
  };

  const handleSearchBy1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy1(e.target.value as SearchableFields);
    setQuery1("");
    setResult([]);
    setSearched(false);
  };

  const handleSearchBy2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy2(e.target.value as "" | SearchableFields);
    setQuery2("");
  };

  // Determine whether to show the Excel-like grid view
  const shouldRenderGridView = () => 
    (searchBy1 === "nic" || searchBy1 === "membershipNo") && !searchBy2;

 // Excel-like grid view in column layout without headers
const renderGridView = () => (
  <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
    <tbody>
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Membership No</td>
          <td className="border text-gray-950 px-4 py-2">{member.membershipNo}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">NIC</td>
          <td className="border text-gray-950 px-4 py-2">{member.nic}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Name</td>
          <td className="border text-gray-950 px-4 py-2">{member.name}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Father Name</td>
          <td className="border text-gray-950 px-4 py-2">{member.fatherName}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Sur Name</td>
          <td className="border text-gray-950 px-4 py-2">{member.surName}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Area Jamat:</td>
          <td className="border text-gray-950 px-4 py-2">{member.areaJamat}</td>
        </tr>
      ))}
      {result.map((member, index) => (
        <tr key={index + "-membershipNo"}>
          <td className="border text-gray-950 bg-gray-100 px-4 py-2 font-semibold">Mobile Number:</td>
          <td className="border text-gray-950 px-4 py-2">{member.mobileNo}</td>
        </tr>
      ))}
    </tbody>
  </table>
);


  // Detailed view for other searches
  const renderDetailedView = () => (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Member Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Sno</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Mem. No</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Name</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Father Name</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Sur Name</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Area Jamat</th>
            <th className="p-0.5 text-xs text-gray-950 bg-gray-100">Mobile No</th>
          </tr>
        </thead>
        <tbody>
        {result.map((member, index) => (
          <tr key={index} className="border text-gray-950 border-gray-300">
              <td className="p-0.5 text-gray-950 text-xs">{index + 1}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.membershipNo}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.name}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.fatherName}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.surName}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.areaJamat}</td>
              <td className="p-0.5 text-gray-950 text-xs">{member.mobileNo}</td>
              </tr>
        ))}
      </tbody>
    </table>
  </div>
);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-lg text-center w-full max-w-lg">
        <div className="mb-4">
          <Image width={100} height={200} src="/logo.png" alt="Community Logo" className="h-20 mx-auto" />
        </div>
        <h1 className="text-2xl text-gray-950 font-semibold mb-4">Cutchi Memon Markazi Jamat Pakistan</h1>
        <h2 className="text-1xl text-gray-950 font-semibold mb-4">Community Member Search</h2>

        <div className="mb-6 text-gray-900">
          <select value={searchBy1} onChange={handleSearchBy1Change} className="border p-2 mr-2">
            <option value="nic">Search by NIC</option>
            <option value="membershipNo">Search by Membership No</option>
            <option value="surName">Search by Surname</option>
            <option value="areaJamat">Search by Area Jamat</option>
            <option value="name">Search by Name</option>
          </select>
          <input
            type="text"
            placeholder={`Enter ${searchBy1}`}
            value={query1}
            onChange={(e) => setQuery1(e.target.value)}
            className="border px-4 py-2 mr-2 text-gray-950"
          />
          <br />

          <select value={searchBy2} onChange={handleSearchBy2Change} className="border p-2 mr-2 mt-2">
            <option value="">Select Second Criterion (Optional)</option>
            <option value="nic">NIC</option>
            <option value="membershipNo">Membership No</option>
            <option value="surName">Surname</option>
            <option value="areaJamat">Area Jamat</option>
            <option value="name">Name</option>
          </select>
          {searchBy2 && (
            <input
              type="text"
              placeholder={`Enter ${searchBy2}`}
              value={query2}
              onChange={(e) => setQuery2(e.target.value)}
              className="border px-4 py-2 mt-2 text-gray-950"
            />
          )}

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Search
          </button>
        </div>

        {searched && result.length === 0 && <p className="text-red-500 mt-4">No member found</p>}

        {/* {result.length > 0 && (shouldRenderGridView() ? renderGridView() : renderDetailedView())} */}

        {result.length > 0 && (
  <div>
    <h3 className="text-xl text-gray-900 font-semibold mb-4">Search Results:</h3>
    {/* Render only one of the views based on the condition */}
    {shouldRenderGridView() ? renderGridView() : renderDetailedView()} 
  </div>
)}

        {result.length > 0 && (
          <div className="mt-4 flex gap-4 justify-center">
            <button onClick={handleExportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Export to Excel
            </button>
            <button onClick={handleExportToCSV} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
