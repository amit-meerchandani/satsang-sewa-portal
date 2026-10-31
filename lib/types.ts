export type SewaRole = 'SK' | 'Pathi' | 'SR' | 'BSK';

export interface HistoryRecord {
  id: string;
  date: string;       // YYYY-MM-DD
  approvedId: string; // Approver ID / Badge
  status: 'Approved' | 'Pending' | 'Completed' | 'Under Review';
  remarks: string;
}

export interface Sewadar {
  srNo: number;
  iNo: string;        // e.g. SK-101, PT-104, BSK-201
  name: string;
  centre: string;
  area: string;
  sewa: SewaRole;
  dateOfJoining: string;
  category: 'Regular' | 'Baal Satsang';
  history: HistoryRecord[];
}