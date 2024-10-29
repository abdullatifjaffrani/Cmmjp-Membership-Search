import { Member } from "../data/members";

// Define a union type for valid search keys
type SearchKey = "nic" | "membershipNo" | "surName" | "areaJamat" | "name";

export const searchMember = (query: string, searchBy: SearchKey, members: Member[]): Member[] => {
  const lowerCaseQuery = query.trim().toLowerCase();

  if (searchBy === "nic" || searchBy === "membershipNo") {
    // Exact match for NIC or Membership No
    return members.filter((member) => member[searchBy]?.toLowerCase() === lowerCaseQuery);
  }

  // For partial match searches
  return members.filter((member) =>
    member[searchBy]?.toLowerCase().includes(lowerCaseQuery)
  );
};
