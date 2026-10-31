export type SewaRole = 'SK' | 'Pathi' | 'SR' | 'BSK';

export interface HistoryRecord {
  id: string;
  centre: string;
  area: string;
  designation: SewaRole;
  status: 'Appointed' | 'Extension' | 'Completed' | 'Under Review';
  letterId: string;
  fromDate: string;
  tillDate: string;
  remarks: string;
}

export interface Sewadar {
  srNo: number;
  iNo: string;
  beasId: string;
  name: string;
  photoUrl?: string; // Optional image URL / file path
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  age: number;
  fatherName: string;
  motherName: string;
  marriageStatus: 'Married' | 'Unmarried' | 'Widowed' | 'Divorced';
  spouseName?: string;
  aadharNumber: string;
  address: string;
  phone: string;
  email: string;

  // Overview / Status details (Right Card)
  initiationDate: string;
  status: 'Active' | 'Inactive' | 'On Leave' | 'Transferred';
  qualification: string;
  profession: string;
  professionDetail?: string;
  dateOfJoining: string;
  exitDate?: string;
  remarks: string;

  // Table summary fields
  centre: string;
  area: string;
  sewa: SewaRole;
  category: 'Regular' | 'Baal Satsang';

  history: HistoryRecord[];
}