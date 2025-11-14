import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from './icons';

// --- TYPES AND INTERFACES ---
type Grade = 'T' | 'H' | 'C' | ''; // Tốt, Hoàn thành, Chưa hoàn thành
type Level = 'T' | 'Đ' | 'C' | ''; // Tốt, Đạt, Cần cố gắng

// Comprehensive data for a single semester, matching the new detailed layout
interface DetailedSemesterData {
  id: number;
  studentId: string;
  name: string;
  dob: string;
  isFemale: boolean;
  subjects: {
    tiengViet: { level: Grade; score: string };
    toan: { level: Grade; score: string };
    ngoaiNgu1: { level: Grade };
    daoDuc: { level: Grade };
    tnxh: { level: Grade };
    gdtc: { level: Grade };
    amNhac: { level: Grade };
    miThuat: { level: Grade };
    hdtn: { level: Grade };
    tiengDanToc: { level: Grade };
  };
  qualities: {
    yeuNuoc: Level;
    nhanAi: Level;
    chamChi: Level;
    trungThuc: Level;
    trachNhiem: Level;
  };
  generalCompetencies: {
    tuChu: Level;
    giaoTiep: Level;
    gqvd: Level;
  };
  specificCompetencies: {
    ngonNgu: Level;
    tinhToan: Level;
    thamMi: Level;
    theChat: Level;
  };
  notes: string;
}

// Comprehensive data for the whole year view (remains for "Tổng kết cả năm")
interface StudentYearlyData {
  id: number;
  studentId: string;
  name: string;
  dob: string;
  isFemale: boolean;
  subjects: {
    tiengViet: { level: Grade; score: string };
    toan: { level: Grade; score: string };
    ngoaiNgu1: { level: Grade };
    daoDuc: { level: Grade };
    tnxh: { level: Grade };
    gdtc: { level: Grade };
    amNhac: { level: Grade };
    miThuat: { level: Grade };
    hdtn: { level: Grade };
    tinHoc: {level: Grade};
  };
  qualities: {
    yeuNuoc: Level;
    nhanAi: Level;
    chamChi: Level;
    trungThuc: Level;
    trachNhiem: Level;
  };
  generalCompetencies: {
    tuChu: Level;
    giaoTiep: Level;
    gqvd: Level;
  };
  specificCompetencies: {
    ngonNgu: Level;
    tinhToan: Level;
    thamMi: Level;
    theChat: Level;
  };
  assessment: string[]; // ['XS', 'T', 'H', 'C'] -> "x" in one of them
  rewards: { cuoiNam: string; dotXuat: string };
  promotionStatus: 'Lên lớp' | 'Chưa được lên lớp';
  notes: string;
}


// --- MOCK DATA ---
const levels: Level[] = ['T', 'Đ', 'C'];
const grades: Grade[] = ['T', 'H', 'C'];
const getRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const studentBaseInfo = [
  { id: 1, studentId: 'HS079700000001', name: 'Nguyễn Thị Mai Anh', dob: '2015-01-10', isFemale: true },
  { id: 2, studentId: 'HS079700000002', name: 'Trần Văn Bảo', dob: '2015-02-15', isFemale: false },
  { id: 3, studentId: 'HS079700000003', name: 'Lê Thị Diệu Hiền', dob: '2015-03-20', isFemale: true },
  { id: 4, studentId: 'HS079700000004', name: 'Phạm Minh Đức', dob: '2015-04-05', isFemale: false },
  { id: 5, studentId: 'HS079700000005', name: 'Huỳnh Thị Kim Ngân', dob: '2015-05-12', isFemale: true },
  { id: 6, studentId: 'HS079700000006', name: 'Nguyễn Văn Phú', dob: '2015-06-18', isFemale: false },
  { id: 7, studentId: 'HS079700000007', name: 'Đỗ Thị Thanh Tâm', dob: '2015-07-22', isFemale: true },
  { id: 8, studentId: 'HS079700000008', name: 'Võ Minh Quang', dob: '2015-08-30', isFemale: false },
  { id: 9, studentId: 'HS079700000009', name: 'Trần Ngọc Anh', dob: '2015-09-09', isFemale: true },
  { id: 10, studentId: 'HS079700000010', name: 'Lê Văn Luyện', dob: '2015-10-11', isFemale: false },
];

const createDetailedSemesterData = (): DetailedSemesterData[] => studentBaseInfo.map(s => ({
    ...s,
    subjects: {
        tiengViet: { level: getRandom(grades), score: (Math.random() * 5 + 5).toFixed(1) },
        toan: { level: getRandom(grades), score: (Math.random() * 5 + 5).toFixed(1) },
        ngoaiNgu1: { level: getRandom(grades) },
        daoDuc: { level: getRandom(grades) },
        tnxh: { level: getRandom(grades) },
        gdtc: { level: getRandom(grades) },
        amNhac: { level: getRandom(grades) },
        miThuat: { level: getRandom(grades) },
        hdtn: { level: getRandom(grades) },
        tiengDanToc: { level: getRandom(grades) },
    },
    qualities: {
        yeuNuoc: getRandom(levels), nhanAi: getRandom(levels), chamChi: getRandom(levels),
        trungThuc: getRandom(levels), trachNhiem: getRandom(levels),
    },
    generalCompetencies: { tuChu: getRandom(levels), giaoTiep: getRandom(levels), gqvd: getRandom(levels) },
    specificCompetencies: { ngonNgu: getRandom(levels), tinhToan: getRandom(levels), thamMi: getRandom(levels), theChat: getRandom(levels) },
    notes: ''
}));

const calculateYearlyData = (sem1: DetailedSemesterData[], sem2: DetailedSemesterData[]): StudentYearlyData[] => {
  return sem1.map(s1 => {
    const s2 = sem2.find(s => s.id === s1.id)!;
    
    const getYearlyGrade = (g1: Grade, g2: Grade): Grade => {
      if (g1 === 'C' || g2 === 'C') return 'C';
      if (g1 === 'T' || g2 === 'T') return 'T';
      return 'H';
    };
    
    const yearlyAssessmentRoll = Math.random();
    let assessment = ['', '', '', ''];
    if (yearlyAssessmentRoll > 0.9) assessment[0] = 'x'; // XS
    else if (yearlyAssessmentRoll > 0.7) assessment[1] = 'x'; // Tốt
    else if (yearlyAssessmentRoll > 0.1) assessment[2] = 'x'; // Hoàn thành
    else assessment[3] = 'x'; // Chưa HT

    return {
      id: s1.id,
      studentId: s1.studentId,
      name: s1.name,
      dob: s1.dob,
      isFemale: s1.isFemale,
      subjects: {
        tiengViet: { level: getYearlyGrade(s1.subjects.tiengViet.level, s2.subjects.tiengViet.level), score: ((parseFloat(s1.subjects.tiengViet.score) + parseFloat(s2.subjects.tiengViet.score)) / 2).toFixed(1) },
        toan: { level: getYearlyGrade(s1.subjects.toan.level, s2.subjects.toan.level), score: ((parseFloat(s1.subjects.toan.score) + parseFloat(s2.subjects.toan.score)) / 2).toFixed(1) },
        ngoaiNgu1: { level: getYearlyGrade(s1.subjects.ngoaiNgu1.level, s2.subjects.ngoaiNgu1.level) },
        daoDuc: { level: getYearlyGrade(s1.subjects.daoDuc.level, s2.subjects.daoDuc.level) },
        tnxh: { level: getYearlyGrade(s1.subjects.tnxh.level, s2.subjects.tnxh.level) },
        gdtc: { level: getYearlyGrade(s1.subjects.gdtc.level, s2.subjects.gdtc.level) },
        amNhac: { level: getYearlyGrade(s1.subjects.amNhac.level, s2.subjects.amNhac.level) },
        miThuat: { level: getYearlyGrade(s1.subjects.miThuat.level, s2.subjects.miThuat.level) },
        hdtn: { level: getYearlyGrade(s1.subjects.hdtn.level, s2.subjects.hdtn.level) },
        tinHoc: { level: 'H' }, // Placeholder as it's not in semester data
      },
      qualities: {
        yeuNuoc: getRandom(levels), nhanAi: getRandom(levels), chamChi: getRandom(levels),
        trungThuc: getRandom(levels), trachNhiem: getRandom(levels),
      },
      generalCompetencies: { tuChu: getRandom(levels), giaoTiep: getRandom(levels), gqvd: getRandom(levels) },
      specificCompetencies: { ngonNgu: getRandom(levels), tinhToan: getRandom(levels), thamMi: getRandom(levels), theChat: getRandom(levels) },
      assessment,
      rewards: { cuoiNam: Math.random() > 0.8 ? 'x' : '', dotXuat: Math.random() > 0.95 ? 'x' : '' },
      promotionStatus: assessment[3] === 'x' ? 'Chưa được lên lớp' : 'Lên lớp',
      notes: ''
    };
  });
};

const GradebookHomeroomView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [view, setView] = useState('Cuối học kỳ 1');
    const [schoolYear, setSchoolYear] = useState('2025-2026');
    const [className, setClassName] = useState('3A1');
    const [studentData, setStudentData] = useState<DetailedSemesterData[] | StudentYearlyData[]>([]);

    useEffect(() => {
      // Simulate refetching/regenerating data when any filter changes
      const semester1Data = createDetailedSemesterData();
      const semester2Data = createDetailedSemesterData();

      if (view === 'Cuối học kỳ 1') {
        setStudentData(semester1Data);
      } else if (view === 'Cuối học kỳ 2') {
        setStudentData(semester2Data);
      } else if (view === 'Tổng kết cả năm') {
        setStudentData(calculateYearlyData(semester1Data, semester2Data));
      }
    }, [view, schoolYear, className]);

    const renderDetailedSemesterView = () => {
        const data = studentData as DetailedSemesterData[];
        return (
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
                <table className="w-full text-sm border-collapse table-auto min-w-[3200px]">
                    <thead className="text-xs text-slate-800 bg-slate-100 font-sans">
                        <tr className="[&>th]:font-bold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                            <th rowSpan={3} className="w-10">STT</th>
                            <th rowSpan={3} className="w-48">HỌ VÀ TÊN HỌC SINH</th>
                            <th rowSpan={3} className="w-28">Ngày, tháng, năm sinh</th>
                            <th rowSpan={3} className="w-10">Nữ</th>
                            <th colSpan={12}>Môn học và hoạt động giáo dục</th>
                            <th colSpan={5}>Phẩm chất chủ yếu</th>
                            <th colSpan={7}>Năng lực cốt lõi</th>
                            <th rowSpan={3} className="w-40">Ghi chú</th>
                        </tr>
                        <tr className="[&>th]:font-semibold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                            <th colSpan={2}>Tiếng Việt</th>
                            <th colSpan={2}>Toán</th>
                            <th rowSpan={2}>Ngoại ngữ 1</th>
                            <th rowSpan={2}>Đạo đức</th>
                            <th rowSpan={2}>TN-XH</th>
                            <th rowSpan={2}>GDTC</th>
                            <th colSpan={2}>Nghệ thuật</th>
                            <th rowSpan={2}>HĐTN</th>
                            <th rowSpan={2}>Tiếng dân tộc</th>
                            <th rowSpan={2}>Yêu nước</th>
                            <th rowSpan={2}>Nhân ái</th>
                            <th rowSpan={2}>Chăm chỉ</th>
                            <th rowSpan={2}>Trung thực</th>
                            <th rowSpan={2}>Trách nhiệm</th>
                            <th colSpan={3}>Năng lực chung</th>
                            <th colSpan={4}>Năng lực đặc thù</th>
                        </tr>
                        <tr className="[&>th]:font-medium [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                            <th>Mức đạt được</th>
                            <th>Điểm KTĐK</th>
                            <th>Mức đạt được</th>
                            <th>Điểm KTĐK</th>
                            <th>Âm nhạc</th>
                            <th>Mĩ thuật</th>
                            <th>Tự chủ và tự học</th>
                            <th>Giao tiếp và hợp tác</th>
                            <th>GQVD và sáng tạo</th>
                            <th>Ngôn ngữ</th>
                            <th>Tính toán</th>
                            <th>Thẩm mĩ</th>
                            <th>Thể chất</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((s, index) => (
                            <tr key={s.id} className="bg-white hover:bg-slate-50 [&>td]:p-1 [&>td]:border [&>td]:border-slate-300 [&>td]:text-center [&>td]:align-middle">
                                <td className="font-medium">{index + 1}</td>
                                <td className="text-left pl-2 font-semibold">{s.name}</td>
                                <td>{s.dob}</td>
                                <td>{s.isFemale ? 'x' : ''}</td>
                                {/* Subjects */}
                                <td>{s.subjects.tiengViet.level}</td>
                                <td className="font-mono">{s.subjects.tiengViet.score}</td>
                                <td>{s.subjects.toan.level}</td>
                                <td className="font-mono">{s.subjects.toan.score}</td>
                                <td>{s.subjects.ngoaiNgu1.level}</td>
                                <td>{s.subjects.daoDuc.level}</td>
                                <td>{s.subjects.tnxh.level}</td>
                                <td>{s.subjects.gdtc.level}</td>
                                <td>{s.subjects.amNhac.level}</td>
                                <td>{s.subjects.miThuat.level}</td>
                                <td>{s.subjects.hdtn.level}</td>
                                <td>{s.subjects.tiengDanToc.level}</td>
                                {/* Qualities */}
                                <td>{s.qualities.yeuNuoc}</td>
                                <td>{s.qualities.nhanAi}</td>
                                <td>{s.qualities.chamChi}</td>
                                <td>{s.qualities.trungThuc}</td>
                                <td>{s.qualities.trachNhiem}</td>
                                {/* Competencies */}
                                <td>{s.generalCompetencies.tuChu}</td>
                                <td>{s.generalCompetencies.giaoTiep}</td>
                                <td>{s.generalCompetencies.gqvd}</td>
                                <td>{s.specificCompetencies.ngonNgu}</td>
                                <td>{s.specificCompetencies.tinhToan}</td>
                                <td>{s.specificCompetencies.thamMi}</td>
                                <td>{s.specificCompetencies.theChat}</td>
                                {/* Notes */}
                                <td className="p-0"><input type="text" defaultValue={s.notes} className="w-full h-full p-1 bg-transparent border-0 focus:bg-amber-100 focus:outline-none"/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    const renderYearlyView = () => {
      const data = studentData as StudentYearlyData[];
      return (
        <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
            <table className="w-full text-sm border-collapse table-fixed min-w-[3200px]">
                <thead className="text-xs text-slate-800 bg-slate-100 font-sans">
                    {/* Main Header Row */}
                    <tr className="[&>th]:font-bold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                        <th rowSpan={3} className="w-10">STT</th>
                        <th rowSpan={3} className="w-48">HỌ VÀ TÊN HỌC SINH</th>
                        <th rowSpan={3} className="w-36">Mã học sinh</th>
                        <th colSpan={11}>Môn học và hoạt động giáo dục</th>
                        <th colSpan={5}>Phẩm chất chủ yếu</th>
                        <th colSpan={7}>Năng lực cốt lõi</th>
                        <th colSpan={4}>Đánh giá KQGD</th>
                        <th colSpan={2}>Khen thưởng</th>
                        <th rowSpan={3} className="w-20">Chưa được lên lớp</th>
                        <th rowSpan={3} className="w-40">Ghi chú</th>
                    </tr>
                    {/* Subject/Competency Group Row */}
                    <tr className="[&>th]:font-semibold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                        <th colSpan={2}>Tiếng Việt</th>
                        <th colSpan={2}>Toán</th>
                        <th rowSpan={2}>Ngoại ngữ 1</th>
                        <th rowSpan={2}>Đạo đức</th>
                        <th rowSpan={2}>TN-XH</th>
                        <th rowSpan={2}>GDTC</th>
                        <th colSpan={2}>Nghệ thuật</th>
                        <th rowSpan={2}>HĐTN</th>
                        <th rowSpan={2}>Yêu nước</th>
                        <th rowSpan={2}>Nhân ái</th>
                        <th rowSpan={2}>Chăm chỉ</th>
                        <th rowSpan={2}>Trung thực</th>
                        <th rowSpan={2}>Trách nhiệm</th>
                        <th colSpan={3}>Năng lực chung</th>
                        <th colSpan={4}>Năng lực đặc thù</th>
                        <th rowSpan={2}>Hoàn thành xuất sắc</th>
                        <th rowSpan={2}>Hoàn thành tốt</th>
                        <th rowSpan={2}>Hoàn thành</th>
                        <th rowSpan={2}>Chưa hoàn thành</th>
                        <th rowSpan={2}>Cuối năm</th>
                        <th rowSpan={2}>Đột xuất</th>
                    </tr>
                    {/* Sub-Column Row */}
                    <tr className="[&>th]:font-medium [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                        <th>Mức đạt được</th>
                        <th>Điểm KTTK</th>
                        <th>Mức đạt được</th>
                        <th>Điểm KTTK</th>
                        <th>Âm nhạc</th>
                        <th>Mĩ thuật</th>
                        <th>Tự chủ và tự học</th>
                        <th>Giao tiếp và hợp tác</th>
                        <th>GQVD và sáng tạo</th>
                        <th>Ngôn ngữ</th>
                        <th>Tính toán</th>
                        <th>Thẩm mĩ</th>
                        <th>Thể chất</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((s, index) => (
                        <tr key={s.id} className="bg-white hover:bg-slate-50 [&>td]:p-1 [&>td]:border [&>td]:border-slate-300 [&>td]:text-center [&>td]:align-middle">
                            <td className="font-medium">{index + 1}</td>
                            <td className="text-left pl-2 font-semibold">{s.name}</td>
                            <td>{s.studentId}</td>
                            {/* Subjects */}
                            <td>{s.subjects.tiengViet.level}</td>
                            <td className="font-mono">{s.subjects.tiengViet.score}</td>
                            <td>{s.subjects.toan.level}</td>
                            <td className="font-mono">{s.subjects.toan.score}</td>
                            <td>{s.subjects.ngoaiNgu1.level}</td>
                            <td>{s.subjects.daoDuc.level}</td>
                            <td>{s.subjects.tnxh.level}</td>
                            <td>{s.subjects.gdtc.level}</td>
                            <td>{s.subjects.amNhac.level}</td>
                            <td>{s.subjects.miThuat.level}</td>
                            <td>{s.subjects.hdtn.level}</td>
                            {/* Qualities */}
                            <td>{s.qualities.yeuNuoc}</td>
                            <td>{s.qualities.nhanAi}</td>
                            <td>{s.qualities.chamChi}</td>
                            <td>{s.qualities.trungThuc}</td>
                            <td>{s.qualities.trachNhiem}</td>
                            {/* Competencies */}
                            <td>{s.generalCompetencies.tuChu}</td>
                            <td>{s.generalCompetencies.giaoTiep}</td>
                            <td>{s.generalCompetencies.gqvd}</td>
                            <td>{s.specificCompetencies.ngonNgu}</td>
                            <td>{s.specificCompetencies.tinhToan}</td>
                            <td>{s.specificCompetencies.thamMi}</td>
                            <td>{s.specificCompetencies.theChat}</td>
                            {/* Assessment */}
                            <td>{s.assessment[0]}</td>
                            <td>{s.assessment[1]}</td>
                            <td>{s.assessment[2]}</td>
                            <td>{s.assessment[3]}</td>
                            {/* Rewards */}
                            <td>{s.rewards.cuoiNam}</td>
                            <td>{s.rewards.dotXuat}</td>
                            {/* Promotion */}
                            <td>{s.promotionStatus === 'Chưa được lên lớp' ? 'x' : ''}</td>
                            {/* Notes */}
                            <td className="p-0"><input type="text" defaultValue={s.notes} className="w-full h-full p-1 bg-transparent border-0 focus:bg-amber-100 focus:outline-none"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      );
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#f1f5f9] font-sans" aria-modal="true" role="dialog">
            <div className="flex h-screen">
                <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col flex-shrink-0">
                    <div className="h-16 flex items-center justify-center border-b border-slate-700 px-4">
                        <h2 className="text-xl font-bold text-white text-center">Sổ Ghi Điểm</h2>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold hover:bg-slate-700 rounded-lg">
                            Quản lý theo bộ môn
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold bg-slate-700 text-white rounded-lg">
                            Quản lý theo lớp học
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold hover:bg-slate-700 rounded-lg">
                            Thi lại và xét lên lớp
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold hover:bg-slate-700 rounded-lg">
                            Tổng hợp kết quả sau thi lại
                        </a>
                    </nav>
                </aside>
                
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="flex justify-end mb-4">
                            <button onClick={onClose} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                <ArrowLeftIcon className="w-4 h-4" />
                                <span>Quay lại bài trình bày</span>
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                             <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-600 block mb-1">Năm học</label>
                                        <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} className="p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>2024-2025</option>
                                            <option>2025-2026</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600 block mb-1">Học kỳ</label>
                                        <select value={view} onChange={(e) => setView(e.target.value)} className="p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="Cuối học kỳ 1">Cuối học kỳ 1</option>
                                            <option value="Cuối học kỳ 2">Cuối học kỳ 2</option>
                                            <option value="Tổng kết cả năm">Tổng kết cả năm</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600 block mb-1">Tên lớp</label>
                                        <select value={className} onChange={(e) => setClassName(e.target.value)} className="p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>3A1</option>
                                            <option>3A2</option>
                                        </select>
                                    </div>
                                </div>
                             </div>

                            <div className="flex justify-between items-center mb-4">
                                <p className="font-semibold text-slate-800">Sĩ số học sinh: {studentData.length}</p>
                                <div className="flex items-center space-x-2">
                                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-red-700">Chốt sổ</button>
                                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu</button>
                                </div>
                            </div>
                            
                            {(() => {
                                if (view === 'Cuối học kỳ 1' || view === 'Cuối học kỳ 2') {
                                    return renderDetailedSemesterView();
                                }
                                if (view === 'Tổng kết cả năm') {
                                    return renderYearlyView();
                                }
                                return null;
                            })()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GradebookHomeroomView;