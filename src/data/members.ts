export interface Member {
  membershipNo: string;
  nic: string;
  name: string;
  fatherName: string;
  surName: string;
  areaJamat: string;
  address: string;
  mobileNo: string;
}

export const members: Member[] = [
{
  membershipNo: "1",
  nic: "42000-0000000-1",
  name: "Abdul Latif",
  fatherName: "Muhammad Ishaq",
  surName: "Jaffrani",
  areaJamat: "Society",
  address: "Flat #1, Area #, Karachi, Pakistan",
  mobileNo: "0300-0000001",
},
{
  membershipNo: "2",
  nic: "42000-0000000-2",
  name: "Test 2",
  fatherName: "Fn 2",
  surName: "Cast 2",
  areaJamat: "Saddar",
  address: "Flat #2, Area #, Karachi, Pakistan",
  mobileNo: "0300-0000002",
},
{
  membershipNo: "3",
  nic: "42000-0000000-3",
  name: "Test 3",
  fatherName: "Fn 3",
  surName: "Cast 3",
  areaJamat: "Saddar",
  address: "Flat #3, Area #, Karachi, Pakistan",
  mobileNo: "0300-0000002",
},
{
  membershipNo: "4",
  nic: "42000-0000000-4",
  name: "Test 4",
  fatherName: "Fn 4",
  surName: "Cast 4",
  areaJamat: "Saddar",
  address: "Flat #4, Area #, Karachi, Pakistan",
  mobileNo: "0300-0000002",
},
{
  membershipNo: "5",
  nic: "42000-0000000-5",
  name: "Test 5",
  fatherName: "Fn 5",
  surName: "Cast 5",
  areaJamat: "Saddar",
  address: "Flat #5, Area #, Karachi, Pakistan",
  mobileNo: "0300-0000002",
},
// Add your new member data here
{
  membershipNo: "6",
  nic: "42000-0000000-6",
  name: "New Member Name",
  fatherName: "New Member Father Name",
  surName: "New Member Surname",
  areaJamat: "New Member Area Jamat",
  address: "New Member Address",
  mobileNo: "0300-0000003",
}
];