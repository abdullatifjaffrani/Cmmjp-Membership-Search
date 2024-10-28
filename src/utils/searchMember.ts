import { members } from "../data/members";

// The search function accepts both the query and the search type
export function searchMember(query: string, searchBy: "nic" | "membership") {
  if (searchBy === "nic") {
    return members.find((member) => member.nic === query);
  } else {
    return members.find((member) => member.membershipNo === query);
  }
}