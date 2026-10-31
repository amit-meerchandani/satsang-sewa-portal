import * as XLSX from 'xlsx';
import { Sewadar } from './types';

export function exportSewadarsToExcel(data: Sewadar[], filenamePrefix = 'Sewadar_Records') {
  if (!data || data.length === 0) {
    alert('No records available to export.');
    return;
  }

  // Sheet 1: Personal & Sewa Dossiers
  const dossierRows = data.map((item) => ({
    'SR No.': item.srNo,
    'I No.': item.iNo,
    'Beas ID': item.beasId || '-',
    'Full Name': item.name,
    'Gender': item.gender || '-',
    'DOB': item.dob || '-',
    'Age': item.age || '-',
    'Father Name': item.fatherName || '-',
    'Mother Name': item.motherName || '-',
    'Marital Status': item.marriageStatus || '-',
    'Spouse Name': item.spouseName || '-',
    'Aadhar Number': item.aadharNumber || '-',
    'Address': item.address || '-',
    'Phone Number': item.phone || '-',
    'Email': item.email || '-',
    'Centre': item.centre,
    'Area': item.area,
    'Sewa Role': item.sewa,
    'Category': item.category,
    'Initiation Date': item.initiationDate || '-',
    'Status': item.status || 'Active',
    'Qualification': item.qualification || '-',
    'Profession': item.profession || '-',
    'Joining Date': item.dateOfJoining,
    'Exit Date': item.exitDate || '-',
    'Remarks': item.remarks || '-',
  }));

  // Sheet 2: Appointment & Extension History Logs
  const historyRows: Array<Record<string, string | number>> = [];
  data.forEach((item) => {
    if (item.history && item.history.length > 0) {
      item.history.forEach((h) => {
        historyRows.push({
          'SR No.': item.srNo,
          'I No.': item.iNo,
          'Name': item.name,
          'Centre': h.centre,
          'Area': h.area,
          'Designation': h.designation,
          'Status': h.status,
          'Letter ID': h.letterId,
          'From Date': h.fromDate,
          'Till Date': h.tillDate,
          'Remarks': h.remarks,
        });
      });
    }
  });

  // Create workbook and worksheets
  const wb = XLSX.utils.book_new();

  const wsDossiers = XLSX.utils.json_to_sheet(dossierRows);
  XLSX.utils.book_append_sheet(wb, wsDossiers, 'Sewadar Dossiers');

  const wsHistory = XLSX.utils.json_to_sheet(
    historyRows.length > 0
      ? historyRows
      : [{ 'Note': 'No appointment logs recorded for selected sewadars' }]
  );
  XLSX.utils.book_append_sheet(wb, wsHistory, 'Appointment History');

  // Trigger browser download
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `${filenamePrefix}_${dateStr}.xlsx`);
}