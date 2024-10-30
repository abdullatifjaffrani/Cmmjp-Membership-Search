// /components/ExportButtons.tsx

import ExcelJS from 'exceljs';
import { unparse } from 'papaparse';
import { Member } from '../data/members';

export const exportToExcel = (data: Member[], filename: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Members');

  worksheet.columns = [
    { header: 'Membership No', key: 'membershipNo', width: 15 },
    { header: 'NIC', key: 'nic', width: 20 },
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Father Name', key: 'fatherName', width: 20 },
    { header: 'Surname', key: 'surName', width: 15 },
    { header: 'Area Jamat', key: 'areaJamat', width: 20 },
    { header: 'Mobile No', key: 'mobileNo', width: 15 },
  ];

  data.forEach((member) => worksheet.addRow(member));

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  });
};

export const exportToCSV = (data: Member[], filename: string) => {
  const csv = unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
