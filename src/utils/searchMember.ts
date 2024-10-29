import { Member } from "../data/members"; // Adjust path if needed

export const searchMember = (
  query1: string,
  searchBy1: keyof Member,
  members: Member[],
  query2?: string,
  searchBy2?: keyof Member
): Member[] => {
  const lowerCaseQuery1 = query1.trim().toLowerCase();
  const lowerCaseQuery2 = query2?.trim().toLowerCase(); // Optional second query

  return members.filter((member) => {
    const match1 = member[searchBy1]?.toLowerCase().includes(lowerCaseQuery1) || false;
    const match2 = searchBy2 && lowerCaseQuery2
      ? member[searchBy2]?.toLowerCase().includes(lowerCaseQuery2) || false
      : true; // If no second query, treat as true (don't filter out)

    return match1 && match2;
  });
};
