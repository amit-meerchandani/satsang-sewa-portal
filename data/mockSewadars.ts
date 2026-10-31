import { Sewadar } from '@/lib/types';

export const mockSewadars: Sewadar[] = [
  // ==================== 1. SATSANG KARTA (SK) - 15 Records ====================
  {
    srNo: 1,
    iNo: 'SK-101',
    name: 'Rajesh Kumar Mehta',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'SK',
    dateOfJoining: '2018-05-12',
    category: 'Regular',
    history: [
      { id: 'h-101', date: '2024-02-15', approvedId: 'APP-09', status: 'Approved', remarks: 'Assigned to monthly regional discourse at Jhotwara.' },
      { id: 'h-102', date: '2022-08-10', approvedId: 'APP-04', status: 'Completed', remarks: 'Annual sewa review completed.' }
    ]
  },
  {
    srNo: 2,
    iNo: 'SK-102',
    name: 'Mohan Lal Verma',
    centre: 'Vaishali Nagar',
    area: 'Jaipur',
    sewa: 'SK',
    dateOfJoining: '2019-11-04',
    category: 'Regular',
    history: [
      { id: 'h-103', date: '2023-11-20', approvedId: 'APP-02', status: 'Approved', remarks: 'Rotational duty confirmed.' }
    ]
  },
  {
    srNo: 3,
    iNo: 'SK-103',
    name: 'Kuldeep Singh Ahluwalia',
    centre: 'Adarsh Nagar',
    area: 'Jaipur',
    sewa: 'SK',
    dateOfJoining: '2017-03-18',
    category: 'Regular',
    history: [
      { id: 'h-104', date: '2024-01-11', approvedId: 'APP-01', status: 'Approved', remarks: 'Main Sunday discourse certified.' }
    ]
  },
  {
    srNo: 4,
    iNo: 'SK-104',
    name: 'Harish Chander Arora',
    centre: 'Alwar City',
    area: 'Alwar',
    sewa: 'SK',
    dateOfJoining: '2016-09-22',
    category: 'Regular',
    history: [
      { id: 'h-105', date: '2023-09-14', approvedId: 'APP-05', status: 'Approved', remarks: 'Zonal speaker rotation completed.' }
    ]
  },
  {
    srNo: 5,
    iNo: 'SK-105',
    name: 'Satish Kumar Grover',
    centre: 'Kishangarh',
    area: 'Ajmer',
    sewa: 'SK',
    dateOfJoining: '2020-01-15',
    category: 'Regular',
    history: [
      { id: 'h-106', date: '2024-02-10', approvedId: 'APP-03', status: 'Approved', remarks: 'Quarterly review approved.' }
    ]
  },
  {
    srNo: 6,
    iNo: 'SK-106',
    name: 'Balwant Rai Malhotra',
    centre: 'Jodhpur Main',
    area: 'Jodhpur',
    sewa: 'SK',
    dateOfJoining: '2015-08-30',
    category: 'Regular',
    history: [
      { id: 'h-107', date: '2023-12-05', approvedId: 'APP-08', status: 'Completed', remarks: 'Senior sewa review cleared.' }
    ]
  },
  {
    srNo: 7,
    iNo: 'SK-107',
    name: 'Naresh Kumar Sehgal',
    centre: 'Bikaner City',
    area: 'Bikaner',
    sewa: 'SK',
    dateOfJoining: '2019-04-18',
    category: 'Regular',
    history: [
      { id: 'h-108', date: '2024-03-01', approvedId: 'APP-02', status: 'Approved', remarks: 'Roster updated for upcoming quarter.' }
    ]
  },
  {
    srNo: 8,
    iNo: 'SK-108',
    name: 'Jagmohan Singh Bedi',
    centre: 'Kota Junction',
    area: 'Kota',
    sewa: 'SK',
    dateOfJoining: '2021-02-14',
    category: 'Regular',
    history: [
      { id: 'h-109', date: '2023-10-12', approvedId: 'APP-06', status: 'Approved', remarks: 'Allocated to weekly evening sessions.' }
    ]
  },
  {
    srNo: 9,
    iNo: 'SK-109',
    name: 'Tilak Raj Kapoor',
    centre: 'Udaipur City',
    area: 'Udaipur',
    sewa: 'SK',
    dateOfJoining: '2018-11-29',
    category: 'Regular',
    history: [
      { id: 'h-110', date: '2024-01-19', approvedId: 'APP-07', status: 'Approved', remarks: 'Discourse schedule confirmed.' }
    ]
  },
  {
    srNo: 10,
    iNo: 'SK-110',
    name: 'Om Prakash Chhabra',
    centre: 'Sikar Main',
    area: 'Sikar',
    sewa: 'SK',
    dateOfJoining: '2017-07-08',
    category: 'Regular',
    history: [
      { id: 'h-111', date: '2023-11-15', approvedId: 'APP-04', status: 'Completed', remarks: 'Standard rotation completed.' }
    ]
  },
  {
    srNo: 11,
    iNo: 'SK-111',
    name: 'Davinder Nath Sharma',
    centre: 'Sri Ganganagar Main',
    area: 'Sri Ganganagar',
    sewa: 'SK',
    dateOfJoining: '2019-12-01',
    category: 'Regular',
    history: [
      { id: 'h-112', date: '2024-02-28', approvedId: 'APP-09', status: 'Approved', remarks: 'Assigned to central discourse.' }
    ]
  },
  {
    srNo: 12,
    iNo: 'SK-112',
    name: 'Pawan Kumar Sethi',
    centre: 'Suratgarh Mandi',
    area: 'Suratgarh',
    sewa: 'SK',
    dateOfJoining: '2020-08-16',
    category: 'Regular',
    history: [
      { id: 'h-113', date: '2024-03-08', approvedId: 'APP-01', status: 'Approved', remarks: 'Sunday schedule assigned.' }
    ]
  },
  {
    srNo: 13,
    iNo: 'SK-113',
    name: 'Subhash Chander Anand',
    centre: 'Hanumangarh Town',
    area: 'Hanumangarh',
    sewa: 'SK',
    dateOfJoining: '2016-04-10',
    category: 'Regular',
    history: [
      { id: 'h-114', date: '2023-08-14', approvedId: 'APP-05', status: 'Approved', remarks: 'Annual renewal complete.' }
    ]
  },
  {
    srNo: 14,
    iNo: 'SK-114',
    name: 'Ravi Kant Mehra',
    centre: 'Bharatpur City',
    area: 'Bharatpur',
    sewa: 'SK',
    dateOfJoining: '2022-01-20',
    category: 'Regular',
    history: [
      { id: 'h-115', date: '2023-12-22', approvedId: 'APP-03', status: 'Approved', remarks: 'Transferred from local centre.' }
    ]
  },
  {
    srNo: 15,
    iNo: 'SK-115',
    name: 'Jaswant Singh Sodhi',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'SK',
    dateOfJoining: '2015-10-05',
    category: 'Regular',
    history: [
      { id: 'h-116', date: '2024-01-05', approvedId: 'APP-08', status: 'Approved', remarks: 'Senior advisory member appointed at Jhotwara.' }
    ]
  },

  // ==================== 2. PATHI - 15 Records ====================
  {
    srNo: 16,
    iNo: 'PT-301',
    name: 'Harpreet Singh Bindra',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'Pathi',
    dateOfJoining: '2020-03-18',
    category: 'Regular',
    history: [
      { id: 'h-201', date: '2024-01-10', approvedId: 'APP-07', status: 'Approved', remarks: 'Bani path schedule verified at Jhotwara.' }
    ]
  },
  {
    srNo: 17,
    iNo: 'PT-302',
    name: 'Surinder Pal Bhatia',
    centre: 'Mansarovar',
    area: 'Jaipur',
    sewa: 'Pathi',
    dateOfJoining: '2021-09-22',
    category: 'Regular',
    history: [
      { id: 'h-202', date: '2023-12-05', approvedId: 'APP-05', status: 'Approved', remarks: 'Morning duty rotation verified.' }
    ]
  },
  {
    srNo: 18,
    iNo: 'PT-303',
    name: 'Gurvinder Singh Kohli',
    centre: 'Ajmer Main',
    area: 'Ajmer',
    sewa: 'Pathi',
    dateOfJoining: '2018-06-11',
    category: 'Regular',
    history: [
      { id: 'h-203', date: '2024-02-14', approvedId: 'APP-02', status: 'Approved', remarks: 'Sunday path duty confirmed.' }
    ]
  },
  {
    srNo: 19,
    iNo: 'PT-304',
    name: 'Rajinder Kumar Bajaj',
    centre: 'Alwar Gate',
    area: 'Alwar',
    sewa: 'Pathi',
    dateOfJoining: '2019-11-20',
    category: 'Regular',
    history: [
      { id: 'h-204', date: '2024-01-12', approvedId: 'APP-08', status: 'Approved', remarks: 'Special session assignment approved.' }
    ]
  },
  {
    srNo: 20,
    iNo: 'PT-305',
    name: 'Manmohan Singh Taneja',
    centre: 'Bharatpur Main',
    area: 'Bharatpur',
    sewa: 'Pathi',
    dateOfJoining: '2017-04-19',
    category: 'Regular',
    history: [
      { id: 'h-205', date: '2023-11-18', approvedId: 'APP-03', status: 'Completed', remarks: 'Cadence assessment passed.' }
    ]
  },
  {
    srNo: 21,
    iNo: 'PT-306',
    name: 'Davinder Pal Chopra',
    centre: 'Bikaner City',
    area: 'Bikaner',
    sewa: 'Pathi',
    dateOfJoining: '2022-02-10',
    category: 'Regular',
    history: [
      { id: 'h-206', date: '2023-10-04', approvedId: 'APP-04', status: 'Approved', remarks: 'Time slot change approved.' }
    ]
  },
  {
    srNo: 22,
    iNo: 'PT-307',
    name: 'Amarjeet Singh Saluja',
    centre: 'Gangapur City Main',
    area: 'Gangapur City',
    sewa: 'Pathi',
    dateOfJoining: '2016-08-14',
    category: 'Regular',
    history: [
      { id: 'h-207', date: '2024-03-02', approvedId: 'APP-01', status: 'Approved', remarks: 'Recertification successful.' }
    ]
  },
  {
    srNo: 23,
    iNo: 'PT-308',
    name: 'Trilochan Singh Sahni',
    centre: 'Hanumangarh Junction',
    area: 'Hanumangarh',
    sewa: 'Pathi',
    dateOfJoining: '2021-05-30',
    category: 'Regular',
    history: [
      { id: 'h-208', date: '2024-01-28', approvedId: 'APP-09', status: 'Approved', remarks: 'Sunday first batch verified.' }
    ]
  },
  {
    srNo: 24,
    iNo: 'PT-309',
    name: 'Kanwaljit Singh Lamba',
    centre: 'Jhalawar City',
    area: 'Jhalawar-I',
    sewa: 'Pathi',
    dateOfJoining: '2018-09-17',
    category: 'Regular',
    history: [
      { id: 'h-209', date: '2023-12-19', approvedId: 'APP-06', status: 'Approved', remarks: 'Quarterly review passed.' }
    ]
  },
  {
    srNo: 25,
    iNo: 'PT-310',
    name: 'Inderjit Singh Duggal',
    centre: 'Bhawani Mandi',
    area: 'Jhalawar-II',
    sewa: 'Pathi',
    dateOfJoining: '2020-07-25',
    category: 'Regular',
    history: [
      { id: 'h-210', date: '2024-02-20', approvedId: 'APP-05', status: 'Approved', remarks: 'Weekly allocation confirmed.' }
    ]
  },
  {
    srNo: 26,
    iNo: 'PT-311',
    name: 'Balkar Singh Rekhi',
    centre: 'Jhunjhunu Town',
    area: 'Jhunjhunu',
    sewa: 'Pathi',
    dateOfJoining: '2019-01-14',
    category: 'Regular',
    history: [
      { id: 'h-211', date: '2023-11-22', approvedId: 'APP-02', status: 'Completed', remarks: 'Attendance cleared.' }
    ]
  },
  {
    srNo: 27,
    iNo: 'PT-312',
    name: 'Gurcharan Singh Sabharwal',
    centre: 'Jodhpur Ratanada',
    area: 'Jodhpur',
    sewa: 'Pathi',
    dateOfJoining: '2017-11-09',
    category: 'Regular',
    history: [
      { id: 'h-212', date: '2024-01-15', approvedId: 'APP-07', status: 'Approved', remarks: 'Annual assessment verified.' }
    ]
  },
  {
    srNo: 28,
    iNo: 'PT-313',
    name: 'Satwant Singh Oberoi',
    centre: 'Kota Vigyan Nagar',
    area: 'Kota',
    sewa: 'Pathi',
    dateOfJoining: '2022-04-12',
    category: 'Regular',
    history: [
      { id: 'h-213', date: '2023-10-30', approvedId: 'APP-03', status: 'Approved', remarks: 'Assigned as reserve reader.' }
    ]
  },
  {
    srNo: 29,
    iNo: 'PT-314',
    name: 'Harbhajan Singh Sethi',
    centre: 'Fatehpur',
    area: 'Sikar',
    sewa: 'Pathi',
    dateOfJoining: '2015-12-03',
    category: 'Regular',
    history: [
      { id: 'h-214', date: '2024-02-05', approvedId: 'APP-08', status: 'Approved', remarks: 'Senior rotation verified.' }
    ]
  },
  {
    srNo: 30,
    iNo: 'PT-315',
    name: 'Paramjit Singh Narula',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'Pathi',
    dateOfJoining: '2021-10-18',
    category: 'Regular',
    history: [
      { id: 'h-215', date: '2024-03-05', approvedId: 'APP-01', status: 'Approved', remarks: 'Regular duty roster updated at Jhotwara.' }
    ]
  },

  // ==================== 3. SATSANG READERS (SR) - 15 Records ====================
  {
    srNo: 31,
    iNo: 'SR-501',
    name: 'Sunita Rani Sharma',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'SR',
    dateOfJoining: '2021-07-15',
    category: 'Regular',
    history: [
      { id: 'h-301', date: '2024-03-01', approvedId: 'APP-09', status: 'Approved', remarks: 'Allocated to primary reading section at Jhotwara.' }
    ]
  },
  {
    srNo: 32,
    iNo: 'SR-502',
    name: 'Kavita Anand',
    centre: 'Malviya Nagar',
    area: 'Jaipur',
    sewa: 'SR',
    dateOfJoining: '2022-04-10',
    category: 'Regular',
    history: [
      { id: 'h-302', date: '2023-10-18', approvedId: 'APP-03', status: 'Approved', remarks: 'Periodic reading assessment cleared.' }
    ]
  },
  {
    srNo: 33,
    iNo: 'SR-503',
    name: 'Manpreet Kaur Juneja',
    centre: 'Shastri Nagar',
    area: 'Jaipur',
    sewa: 'SR',
    dateOfJoining: '2020-09-05',
    category: 'Regular',
    history: [
      { id: 'h-303', date: '2024-01-20', approvedId: 'APP-04', status: 'Approved', remarks: 'Confirmed for weekly Hindi/Punjabi reading.' }
    ]
  },
  {
    srNo: 34,
    iNo: 'SR-504',
    name: 'Poonam Verma',
    centre: 'Beawar',
    area: 'Ajmer',
    sewa: 'SR',
    dateOfJoining: '2021-11-12',
    category: 'Regular',
    history: [
      { id: 'h-304', date: '2023-12-14', approvedId: 'APP-02', status: 'Approved', remarks: 'Assigned to rotational evening slot.' }
    ]
  },
  {
    srNo: 35,
    iNo: 'SR-505',
    name: 'Rashmi Kapoor',
    centre: 'Tijara',
    area: 'Alwar',
    sewa: 'SR',
    dateOfJoining: '2019-03-24',
    category: 'Regular',
    history: [
      { id: 'h-305', date: '2024-02-12', approvedId: 'APP-06', status: 'Approved', remarks: 'Annual evaluation successful.' }
    ]
  },
  {
    srNo: 36,
    iNo: 'SR-506',
    name: 'Geeta Rani Chhabra',
    centre: 'Deeg',
    area: 'Bharatpur',
    sewa: 'SR',
    dateOfJoining: '2018-08-19',
    category: 'Regular',
    history: [
      { id: 'h-306', date: '2023-11-05', approvedId: 'APP-01', status: 'Completed', remarks: 'Term renewal completed.' }
    ]
  },
  {
    srNo: 37,
    iNo: 'SR-507',
    name: 'Jasleen Kaur Bedi',
    centre: 'Nokha',
    area: 'Bikaner',
    sewa: 'SR',
    dateOfJoining: '2022-06-30',
    category: 'Regular',
    history: [
      { id: 'h-307', date: '2024-01-09', approvedId: 'APP-08', status: 'Approved', remarks: 'Orientation successfully finished.' }
    ]
  },
  {
    srNo: 38,
    iNo: 'SR-508',
    name: 'Anita Devi Sethi',
    centre: 'Hindaun',
    area: 'Gangapur City',
    sewa: 'SR',
    dateOfJoining: '2020-02-17',
    category: 'Regular',
    history: [
      { id: 'h-308', date: '2023-09-22', approvedId: 'APP-05', status: 'Approved', remarks: 'Weekly reading duty verified.' }
    ]
  },
  {
    srNo: 39,
    iNo: 'SR-509',
    name: 'Simran Kaur Ahluwalia',
    centre: 'Nohar',
    area: 'Hanumangarh',
    sewa: 'SR',
    dateOfJoining: '2023-01-11',
    category: 'Regular',
    history: [
      { id: 'h-309', date: '2024-02-25', approvedId: 'APP-07', status: 'Approved', remarks: 'Confirmed as regular reader.' }
    ]
  },
  {
    srNo: 40,
    iNo: 'SR-510',
    name: 'Suman Lata Arora',
    centre: 'Jhalrapatan',
    area: 'Jhalawar-I',
    sewa: 'SR',
    dateOfJoining: '2019-10-08',
    category: 'Regular',
    history: [
      { id: 'h-310', date: '2023-10-15', approvedId: 'APP-02', status: 'Approved', remarks: 'Schedule reallocation verified.' }
    ]
  },
  {
    srNo: 41,
    iNo: 'SR-511',
    name: 'Harpreet Kaur Sahni',
    centre: 'Pilani',
    area: 'Jhunjhunu',
    sewa: 'SR',
    dateOfJoining: '2021-04-20',
    category: 'Regular',
    history: [
      { id: 'h-311', date: '2024-01-18', approvedId: 'APP-04', status: 'Approved', remarks: 'Roster updated for spring.' }
    ]
  },
  {
    srNo: 42,
    iNo: 'SR-512',
    name: 'Meenakshi Batra',
    centre: 'Jodhpur Sardarpura',
    area: 'Jodhpur',
    sewa: 'SR',
    dateOfJoining: '2018-12-14',
    category: 'Regular',
    history: [
      { id: 'h-312', date: '2023-11-29', approvedId: 'APP-09', status: 'Completed', remarks: 'Performance review approved.' }
    ]
  },
  {
    srNo: 43,
    iNo: 'SR-513',
    name: 'Gurleen Kaur Sodhi',
    centre: 'Kota Talwandi',
    area: 'Kota',
    sewa: 'SR',
    dateOfJoining: '2022-09-02',
    category: 'Regular',
    history: [
      { id: 'h-313', date: '2024-03-04', approvedId: 'APP-03', status: 'Approved', remarks: 'Session reader confirmed.' }
    ]
  },
  {
    srNo: 44,
    iNo: 'SR-514',
    name: 'Neelam Rani Grover',
    centre: 'Udaipur Hiran Magri',
    area: 'Udaipur',
    sewa: 'SR',
    dateOfJoining: '2020-05-18',
    category: 'Regular',
    history: [
      { id: 'h-314', date: '2023-12-08', approvedId: 'APP-06', status: 'Approved', remarks: 'Rotational assignment passed.' }
    ]
  },
  {
    srNo: 45,
    iNo: 'SR-515',
    name: 'Ravinder Kaur Malhotra',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'SR',
    dateOfJoining: '2017-06-21',
    category: 'Regular',
    history: [
      { id: 'h-315', date: '2024-02-18', approvedId: 'APP-01', status: 'Approved', remarks: 'Senior reader mentor appointed at Jhotwara.' }
    ]
  },

  // ==================== 4. BAAL SATSANG KARTA (BSK) - 15 Records ====================
  {
    srNo: 46,
    iNo: 'BSK-201',
    name: 'Pooja Narang',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'BSK',
    dateOfJoining: '2023-01-14',
    category: 'Baal Satsang',
    history: [
      { id: 'h-401', date: '2024-01-20', approvedId: 'APP-06', status: 'Approved', remarks: 'Assigned as Baal Satsang Karta at Jhotwara.' }
    ]
  },
  {
    srNo: 47,
    iNo: 'BSK-202',
    name: 'Amanpreet Kaur Anand',
    centre: 'Mansarovar',
    area: 'Jaipur',
    sewa: 'BSK',
    dateOfJoining: '2023-06-11',
    category: 'Baal Satsang',
    history: [
      { id: 'h-402', date: '2023-06-11', approvedId: 'APP-02', status: 'Approved', remarks: 'Induction cleared.' }
    ]
  },
  {
    srNo: 48,
    iNo: 'BSK-203',
    name: 'Rohit Talwar',
    centre: 'Ajmer Main',
    area: 'Ajmer',
    sewa: 'BSK',
    dateOfJoining: '2022-08-15',
    category: 'Baal Satsang',
    history: [
      { id: 'h-403', date: '2023-11-12', approvedId: 'APP-04', status: 'Approved', remarks: 'Discourse module training complete.' }
    ]
  },
  {
    srNo: 49,
    iNo: 'BSK-204',
    name: 'Divya Manchanda',
    centre: 'Alwar City',
    area: 'Alwar',
    sewa: 'BSK',
    dateOfJoining: '2023-03-22',
    category: 'Baal Satsang',
    history: [
      { id: 'h-404', date: '2024-02-01', approvedId: 'APP-09', status: 'Approved', remarks: 'Sunday children session confirmed.' }
    ]
  },
  {
    srNo: 50,
    iNo: 'BSK-205',
    name: 'Harleen Kaur Gandhi',
    centre: 'Bharatpur Main',
    area: 'Bharatpur',
    sewa: 'BSK',
    dateOfJoining: '2021-11-05',
    category: 'Baal Satsang',
    history: [
      { id: 'h-405', date: '2023-10-18', approvedId: 'APP-01', status: 'Completed', remarks: 'Annual Baal sewa review.' }
    ]
  },
  {
    srNo: 51,
    iNo: 'BSK-206',
    name: 'Deepak Vohra',
    centre: 'Bikaner City',
    area: 'Bikaner',
    sewa: 'BSK',
    dateOfJoining: '2022-05-19',
    category: 'Baal Satsang',
    history: [
      { id: 'h-406', date: '2024-01-15', approvedId: 'APP-05', status: 'Approved', remarks: 'Zonal Baal coordinator appointed.' }
    ]
  },
  {
    srNo: 52,
    iNo: 'BSK-207',
    name: 'Simranjeet Kaur Lamba',
    centre: 'Gangapur City Main',
    area: 'Gangapur City',
    sewa: 'BSK',
    dateOfJoining: '2023-07-08',
    category: 'Baal Satsang',
    history: [
      { id: 'h-407', date: '2023-12-04', approvedId: 'APP-03', status: 'Approved', remarks: 'Storytelling format approved.' }
    ]
  },
  {
    srNo: 53,
    iNo: 'BSK-208',
    name: 'Gaurav Sachdeva',
    centre: 'Hanumangarh Town',
    area: 'Hanumangarh',
    sewa: 'BSK',
    dateOfJoining: '2022-09-14',
    category: 'Baal Satsang',
    history: [
      { id: 'h-408', date: '2024-02-19', approvedId: 'APP-07', status: 'Approved', remarks: 'Morning batch assigned.' }
    ]
  },
  {
    srNo: 54,
    iNo: 'BSK-209',
    name: 'Tanvi Madan',
    centre: 'Jhalawar City',
    area: 'Jhalawar-I',
    sewa: 'BSK',
    dateOfJoining: '2023-02-28',
    category: 'Baal Satsang',
    history: [
      { id: 'h-409', date: '2023-09-29', approvedId: 'APP-02', status: 'Approved', remarks: 'Co-speaker role assigned.' }
    ]
  },
  {
    srNo: 55,
    iNo: 'BSK-210',
    name: 'Navjot Singh Chawla',
    centre: 'Jhunjhunu Town',
    area: 'Jhunjhunu',
    sewa: 'BSK',
    dateOfJoining: '2021-12-10',
    category: 'Baal Satsang',
    history: [
      { id: 'h-410', date: '2024-01-08', approvedId: 'APP-08', status: 'Approved', remarks: 'Schedule verified.' }
    ]
  },
  {
    srNo: 56,
    iNo: 'BSK-211',
    name: 'Bhavna Kakar',
    centre: 'Jodhpur Main',
    area: 'Jodhpur',
    sewa: 'BSK',
    dateOfJoining: '2022-04-03',
    category: 'Baal Satsang',
    history: [
      { id: 'h-411', date: '2023-11-30', approvedId: 'APP-04', status: 'Approved', remarks: 'Quarterly review passed.' }
    ]
  },
  {
    srNo: 57,
    iNo: 'BSK-212',
    name: 'Tarun Preet Singh',
    centre: 'Kota Main',
    area: 'Kota',
    sewa: 'BSK',
    dateOfJoining: '2023-04-18',
    category: 'Baal Satsang',
    history: [
      { id: 'h-412', date: '2024-03-01', approvedId: 'APP-06', status: 'Approved', remarks: 'Children batch confirmed.' }
    ]
  },
  {
    srNo: 58,
    iNo: 'BSK-213',
    name: 'Megha Gulati',
    centre: 'Sikar Main',
    area: 'Sikar',
    sewa: 'BSK',
    dateOfJoining: '2022-10-25',
    category: 'Baal Satsang',
    history: [
      { id: 'h-413', date: '2024-02-11', approvedId: 'APP-01', status: 'Approved', remarks: 'Interactive storytelling duty assigned.' }
    ]
  },
  {
    srNo: 59,
    iNo: 'BSK-214',
    name: 'Sanjay Malik',
    centre: 'Suratgarh Main',
    area: 'Suratgarh',
    sewa: 'BSK',
    dateOfJoining: '2021-08-16',
    category: 'Baal Satsang',
    history: [
      { id: 'h-414', date: '2023-12-18', approvedId: 'APP-05', status: 'Completed', remarks: 'Annual assessment complete.' }
    ]
  },
  {
    srNo: 60,
    iNo: 'BSK-215',
    name: 'Anureet Kaur Sethi',
    centre: 'Jhotwara',
    area: 'Jaipur',
    sewa: 'BSK',
    dateOfJoining: '2023-05-20',
    category: 'Baal Satsang',
    history: [
      { id: 'h-415', date: '2024-01-25', approvedId: 'APP-09', status: 'Approved', remarks: 'Inducted as permanent Baal Satsang Karta at Jhotwara.' }
    ]
  }
];

export function addNewSewadar(newEntry: Omit<Sewadar, 'srNo'>): Sewadar {
  const nextSrNo = mockSewadars.length > 0 ? Math.max(...mockSewadars.map((s) => s.srNo)) + 1 : 1;
  const createdRecord: Sewadar = {
    srNo: nextSrNo,
    ...newEntry,
  };
  mockSewadars.unshift(createdRecord);
  return createdRecord;
}

// Update an existing Sewadar record in memory
export function updateSewadarRecord(updatedRecord: Sewadar): boolean {
  const index = mockSewadars.findIndex((s) => s.srNo === updatedRecord.srNo);
  if (index !== -1) {
    mockSewadars[index] = { ...updatedRecord };
    return true;
  }
  return false;
}