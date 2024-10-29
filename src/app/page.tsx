"use client";

import { useState } from "react";
import { Member, members } from '../data/members'; // Importing Member data
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"nic" | "membershipNo" | "surName" | "areaJamat" | "name">("nic");
  const [result, setResult] = useState<Member[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = () => {
    // Reset results if query is empty
    if (!query.trim()) {
      setResult([]);
      setSearched(false);
      return;
    }

    // Perform the search
    const membersFiltered = searchMember(query, searchBy, members);
    setResult(membersFiltered);
    setSearched(true);
  };

  // Function to filter members based on search criteria
  const searchMember = (query: string, searchBy: keyof Member, members: Member[]): Member[] => {
    const lowerCaseQuery = query.trim().toLowerCase();

    if (searchBy === "nic" || searchBy === "membershipNo") {
      // Exact match for NIC or Membership No
      return members.filter((member) => member[searchBy] === query.trim());
    } else {
      // For other fields, use includes for partial matching
      return members.filter((member) =>
        member[searchBy]?.toLowerCase().includes(lowerCaseQuery)
      );
    }
  };

  const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value as "nic" | "membershipNo" | "surName" | "areaJamat" | "name");
    setQuery(""); // Clear the input query
    setResult([]); // Clear the previous results
    setSearched(false); // Reset the searched state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-0.5 bg-white rounded shadow-lg text-center w-full max-w-lg">
        {/* Logo Display */}
        <div className="mb-4">
          <Image width={100} height={200} src="/logo.png" alt="Community Logo" className="h-20 mx-auto" />
        </div>
        <h1 className="text-2xl text-gray-950 font-semibold mb-4">Cutchi Memon Markazi Jamat Pakistan</h1>
        <h2 className="text-1xl text-gray-950 font-semibold mb-4">Community Member Search</h2>

        <div className="mb-6 text-gray-900">
          <select
            value={searchBy}
            onChange={handleSearchByChange} // Updated to new handler
            className="border p-2 mr-2"
          >
            <option className="text-gray-950" value="nic">Search by NIC</option>
            <option className="text-gray-950" value="membershipNo">Search by Membership No</option>
            <option className="text-gray-950" value="surName">Search by Surname</option>
            <option className="text-gray-950" value="areaJamat">Search by Area Jamat</option>
            <option className="text-gray-950" value="name">Search by Name</option>
          </select>
          <br/>
          <input
            type="text"
            placeholder={`Enter ${searchBy === "nic" ? "NIC" : searchBy === "membershipNo" ? "Membership No" : searchBy === "surName" ? "Surname" : searchBy === "areaJamat" ? "Area Jamat" : "Name"}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2 text-gray-950"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {searched && result.length === 0 && (
          <p className="text-red-500 mt-4">No member found</p>
        )}

        {result.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Member Details</h2>
            {searchBy === "nic" || searchBy === "membershipNo" ? (
              // Display results in a column view for NIC and Membership No
              <div className="overflow-x-auto">
                {result.map((member, index) => (
                  <div key={index} className="border-b border-gray-300 py-2 text-gray-950">
                  <div className="grid grid-cols-2 gap-x-0 gap-0">
                    <div className="font-bold py-2 border-l border-t border-b border-gray-300 bg-gray-100">Membership No:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.membershipNo}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">NIC:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.nic}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">Name:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.name}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">Father Name:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.fatherName}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">Sur Name:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.surName}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">Area Jamat:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.areaJamat}</div>
                    <div className="font-bold py-2  border-l border-t border-b border-gray-300 bg-gray-100">Mobile Number:</div>
                    <div className=" border-r py-2  border-t border-b border-gray-300">{member.mobileNo}</div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              // Display results in rows for other search criteria
              <table className="table-auto w-full border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="p-1 text-xs text-gray-950 bg-gray-100 ">Sno</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100 ">Mem. No</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100">Name</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100">Father Name</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100">Sur Name</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100">Area Jamat</th>
      <th className="p-1 text-xs text-gray-950 bg-gray-100">Mobile Number</th>
    </tr>
  </thead>
  <tbody>
    {result.map((member, index) => (
      <tr key={index} className="border text-gray-950 border-gray-300">
        <td className="p-1 text-xs">{index + 1}</td>
        <td className="p-1 text-xs">{member.membershipNo}</td>
        <td className="p-1 text-xs">{member.name}</td>
        <td className="p-1 text-xs">{member.fatherName}</td>
        <td className="p-1 text-xs">{member.surName}</td>
        <td className="p-1 text-xs">{member.areaJamat}</td>
        <td className="p-1 text-xs">{member.mobileNo}</td>
      </tr>
    ))}
  </tbody>
</table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
