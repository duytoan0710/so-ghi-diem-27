import React, { useState } from 'react';
import { 
    ArrowLeftIcon, 
    ChevronDownIcon, 
} from './icons';

// --- TYPES AND INTERFACES ---
type Grade = 'T' | 'H' | 'C' | ''; // Tốt, Hoàn thành, Chưa hoàn thành
type Level = 'T' | 'Đ' | 'C' | ''; // Tốt, Đạt, Cần cố gắng

interface StudentData {
  id: number;
  studentId: string;
  name: string;
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
  assessment: {
    xs: string; // Hoàn thành xuất sắc
    t: string;  // Hoàn thành tốt
    h: string;  // Hoàn thành
    c: string;  // Chưa hoàn thành
  };
  rewards: {
    cuoiNam: string;
    dotXuat: string;
  };
  notPromoted: string;
  notes: string;
}

// --- MOCK DATA ---
const levels: Level[] = ['T', 'Đ', 'C'];
const grades: Grade[] = ['T', 'H', 'C'];
const getRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const studentBaseInfo = [
  { id: 1, studentId: 'HS079700000001', name: 'Nguyễn Thị Mai Anh' },
  { id: 2, studentId: 'HS079700000002', name: 'Trần Văn Bảo' },
  { id: 3, studentId: 'HS079700000003', name: 'Lê Thị Diệu Hiền' },
  { id: 4, studentId: 'HS079700000004', name: 'Phạm Minh Đức' },
  { id: 5, studentId: 'HS079700000005', name: 'Huỳnh Thị Kim Ngân' },
  { id: 6, studentId: 'HS079700000006', name: 'Nguyễn Văn Phú' },
  { id: 7, studentId: 'HS079700000007', name: 'Đỗ Thị Thanh Tâm' },
  { id: 8, studentId: 'HS079700000008', name: 'Võ Minh Quang' },
  { id: 9, studentId: 'HS079700000009', name: 'Trần Ngọc Anh' },
  { id: 10, studentId: 'HS079700000010', name: 'Lê Văn Luyện' },
];

const createInitialData = (): StudentData[] => studentBaseInfo.map(s => ({
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
    assessment: { xs: '', t: '', h: 'x', c: '' },
    rewards: { cuoiNam: '', dotXuat: '' },
    notPromoted: '',
    notes: ''
}));


const ClassUpdateView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [students, setStudents] = useState(createInitialData());

  // A helper to update nested state immutably.
  const handleDataChange = (studentId: number, path: string, value: any) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id !== studentId) return student;
        
        // Deep copy the student object to avoid mutation
        const newStudent = JSON.parse(JSON.stringify(student));
        
        // Navigate the path and set the new value
        const keys = path.split('.');
        let current = newStudent;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        return newStudent;
      })
    );
  };

  const LevelSelect: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ value, onChange, options }) => (
    <select value={value} onChange={onChange} className="w-full h-full p-1 bg-transparent border-0 focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none text-center">
        <option value=""></option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  const ScoreInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => (
    <input type="number" step="0.5" min="0" max="10" value={value} onChange={onChange} className="w-full h-full p-1 text-center bg-transparent border-0 focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
  );

  const MarkInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => (
    <input type="text" value={value} onChange={onChange} maxLength={1} className="w-full h-full p-1 text-center bg-transparent border-0 focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 font-sans overflow-auto" aria-modal="true" role="dialog">
      <div className="min-h-screen flex flex-col p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Page Header & Filters */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm mb-4 flex items-center space-x-2">
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Trở về</span>
                    </button>
                     <div className="flex items-center space-x-4">
                        {/* Semester Filter */}
                        <div className="flex w-52 items-center rounded-lg border border-slate-300 bg-white overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 hover:border-slate-400">
                            <label htmlFor="semester-filter" className="shrink-0 pl-3 pr-2 py-2 text-sm font-medium text-slate-600 bg-slate-50 border-r border-slate-300">Học kỳ</label>
                            <div className="relative flex-1">
                                <select id="semester-filter" defaultValue="Cuối năm" className="w-full appearance-none bg-transparent py-2 pl-3 pr-8 text-slate-900 focus:outline-none sm:text-sm">
                                    <option>Giữa kỳ 1</option>
                                    <option>Cuối kỳ 1</option>
                                    <option>Giữa kỳ 2</option>
                                    <option>Cuối năm</option>
                                </select>
                                <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            </div>
                        </div>
                        {/* Class Filter */}
                        <div className="flex w-48 items-center rounded-lg border border-slate-300 bg-white overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 hover:border-slate-400">
                            <label htmlFor="class-filter" className="shrink-0 pl-3 pr-2 py-2 text-sm font-medium text-slate-600 bg-slate-50 border-r border-slate-300">Tên lớp</label>
                            <div className="relative flex-1">
                                <select id="class-filter" defaultValue="5A1" className="w-full appearance-none bg-transparent py-2 pl-3 pr-8 text-slate-900 focus:outline-none sm:text-sm">
                                    <option>5A1</option>
                                    <option>5A2</option>
                                </select>
                                <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-auto">
                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-red-700">Chốt sổ</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700">Lịch sử chỉnh sửa</button>
                    <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu</button>
                </div>
            </div>
            
            <p className="font-semibold text-slate-800 mb-4">Sĩ số học sinh: {students.length}</p>

            {/* Grade Table */}
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
              <table className="w-full text-sm border-collapse min-w-[3000px]">
                <thead className="text-xs text-slate-800 bg-slate-100 font-sans">
                  <tr className="[&>th]:font-bold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle">
                    <th rowSpan={3} className="w-10 text-center">STT</th>
                    <th rowSpan={3} className="w-36 text-center">MÃ HỌC SINH</th>
                    <th rowSpan={3} className="w-48 text-left px-4">HỌ VÀ TÊN HỌC SINH</th>
                    <th colSpan={12} className="text-center">Môn học và hoạt động giáo dục</th>
                    <th colSpan={5} className="text-center">Phẩm chất chủ yếu</th>
                    <th colSpan={7} className="text-center">Năng lực cốt lõi</th>
                    <th colSpan={4} className="text-center">Đánh giá KQGD</th>
                    <th colSpan={2} className="text-center">Khen thưởng</th>
                    <th rowSpan={3} className="w-24 text-center">
                      Chưa được
                      <br />
                      lên lớp
                    </th>
                    <th rowSpan={3} className="w-40 text-center">
                      Nhận xét
                      <br />
                      học bạ
                    </th>
                  </tr>
                  <tr className="[&>th]:font-semibold [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                    <th colSpan={2}>Tiếng Việt</th>
                    <th colSpan={2}>Toán</th>
                    <th rowSpan={2} className="w-20">Ngoại ngữ 1</th>
                    <th rowSpan={2} className="w-16">Đạo đức</th>
                    <th rowSpan={2} className="w-16">TN-XH</th>
                    <th rowSpan={2} className="w-16">GDTC</th>
                    <th colSpan={2}>Nghệ thuật</th>
                    <th rowSpan={2} className="w-16">HĐTN</th>
                    <th rowSpan={2} className="w-20">Tiếng dân tộc</th>
                    <th rowSpan={2} className="w-20">Yêu nước</th>
                    <th rowSpan={2} className="w-20">Nhân ái</th>
                    <th rowSpan={2} className="w-20">Chăm chỉ</th>
                    <th rowSpan={2} className="w-20">Trung thực</th>
                    <th rowSpan={2} className="w-20">Trách nhiệm</th>
                    <th colSpan={3}>Năng lực chung</th>
                    <th colSpan={4}>Năng lực đặc thù</th>
                    <th rowSpan={2} className="w-24">
                      Hoàn thành
                      <br />
                      xuất sắc
                    </th>
                    <th rowSpan={2} className="w-24">Hoàn thành tốt</th>
                    <th rowSpan={2} className="w-24">Hoàn thành</th>
                    <th rowSpan={2} className="w-24">Chưa hoàn thành</th>
                    <th rowSpan={2} className="w-16">Cuối năm</th>
                    <th rowSpan={2} className="w-16">Đột xuất</th>
                  </tr>
                  <tr className="[&>th]:font-medium [&>th]:p-1 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                    <th className="w-20">Mức đạt được</th>
                    <th className="w-20">Điểm KTĐK</th>
                    <th className="w-20">Mức đạt được</th>
                    <th className="w-20">Điểm KTĐK</th>
                    <th className="w-16">Âm nhạc</th>
                    <th className="w-16">Mĩ thuật</th>
                    <th className="w-24">Tự chủ và tự học</th>
                    <th className="w-24">Giao tiếp và hợp tác</th>
                    <th className="w-24">GQVD và sáng tạo</th>
                    <th className="w-20">Ngôn ngữ</th>
                    <th className="w-20">Tính toán</th>
                    <th className="w-20">Thẩm mĩ</th>
                    <th className="w-20">Thể chất</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, index) => (
                    <tr key={s.id} className="bg-white hover:bg-slate-50 [&>td]:p-0 [&>td]:border [&>td]:border-slate-300 [&>td]:align-middle h-12">
                      <td className="p-1 font-medium text-center">{index + 1}</td>
                      <td className="p-1 text-center">{s.studentId}</td>
                      <td className="px-4 py-1 text-left font-semibold">{s.name}</td>
                      {/* Subjects */}
                      <td><LevelSelect value={s.subjects.tiengViet.level} onChange={(e) => handleDataChange(s.id, 'subjects.tiengViet.level', e.target.value)} options={grades} /></td>
                      <td><ScoreInput value={s.subjects.tiengViet.score} onChange={(e) => handleDataChange(s.id, 'subjects.tiengViet.score', e.target.value)} /></td>
                      <td><LevelSelect value={s.subjects.toan.level} onChange={(e) => handleDataChange(s.id, 'subjects.toan.level', e.target.value)} options={grades} /></td>
                      <td><ScoreInput value={s.subjects.toan.score} onChange={(e) => handleDataChange(s.id, 'subjects.toan.score', e.target.value)} /></td>
                      <td><LevelSelect value={s.subjects.ngoaiNgu1.level} onChange={(e) => handleDataChange(s.id, 'subjects.ngoaiNgu1.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.daoDuc.level} onChange={(e) => handleDataChange(s.id, 'subjects.daoDuc.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.tnxh.level} onChange={(e) => handleDataChange(s.id, 'subjects.tnxh.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.gdtc.level} onChange={(e) => handleDataChange(s.id, 'subjects.gdtc.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.amNhac.level} onChange={(e) => handleDataChange(s.id, 'subjects.amNhac.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.miThuat.level} onChange={(e) => handleDataChange(s.id, 'subjects.miThuat.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.hdtn.level} onChange={(e) => handleDataChange(s.id, 'subjects.hdtn.level', e.target.value)} options={grades} /></td>
                      <td><LevelSelect value={s.subjects.tiengDanToc.level} onChange={(e) => handleDataChange(s.id, 'subjects.tiengDanToc.level', e.target.value)} options={grades} /></td>
                      {/* Qualities */}
                      <td><LevelSelect value={s.qualities.yeuNuoc} onChange={(e) => handleDataChange(s.id, 'qualities.yeuNuoc', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.qualities.nhanAi} onChange={(e) => handleDataChange(s.id, 'qualities.nhanAi', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.qualities.chamChi} onChange={(e) => handleDataChange(s.id, 'qualities.chamChi', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.qualities.trungThuc} onChange={(e) => handleDataChange(s.id, 'qualities.trungThuc', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.qualities.trachNhiem} onChange={(e) => handleDataChange(s.id, 'qualities.trachNhiem', e.target.value)} options={levels} /></td>
                      {/* Competencies */}
                      <td><LevelSelect value={s.generalCompetencies.tuChu} onChange={(e) => handleDataChange(s.id, 'generalCompetencies.tuChu', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.generalCompetencies.giaoTiep} onChange={(e) => handleDataChange(s.id, 'generalCompetencies.giaoTiep', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.generalCompetencies.gqvd} onChange={(e) => handleDataChange(s.id, 'generalCompetencies.gqvd', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.specificCompetencies.ngonNgu} onChange={(e) => handleDataChange(s.id, 'specificCompetencies.ngonNgu', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.specificCompetencies.tinhToan} onChange={(e) => handleDataChange(s.id, 'specificCompetencies.tinhToan', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.specificCompetencies.thamMi} onChange={(e) => handleDataChange(s.id, 'specificCompetencies.thamMi', e.target.value)} options={levels} /></td>
                      <td><LevelSelect value={s.specificCompetencies.theChat} onChange={(e) => handleDataChange(s.id, 'specificCompetencies.theChat', e.target.value)} options={levels} /></td>
                      {/* Assessment */}
                      <td><MarkInput value={s.assessment.xs} onChange={(e) => handleDataChange(s.id, 'assessment.xs', e.target.value)} /></td>
                      <td><MarkInput value={s.assessment.t} onChange={(e) => handleDataChange(s.id, 'assessment.t', e.target.value)} /></td>
                      <td><MarkInput value={s.assessment.h} onChange={(e) => handleDataChange(s.id, 'assessment.h', e.target.value)} /></td>
                      <td><MarkInput value={s.assessment.c} onChange={(e) => handleDataChange(s.id, 'assessment.c', e.target.value)} /></td>
                      {/* Rewards */}
                      <td><MarkInput value={s.rewards.cuoiNam} onChange={(e) => handleDataChange(s.id, 'rewards.cuoiNam', e.target.value)} /></td>
                      <td><MarkInput value={s.rewards.dotXuat} onChange={(e) => handleDataChange(s.id, 'rewards.dotXuat', e.target.value)} /></td>
                      {/* Promotion */}
                      <td><MarkInput value={s.notPromoted} onChange={(e) => handleDataChange(s.id, 'notPromoted', e.target.value)} /></td>
                      {/* Notes */}
                      <td><input type="text" value={s.notes} onChange={(e) => handleDataChange(s.id, 'notes', e.target.value)} className="w-full h-full p-1 bg-transparent border-0 focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ClassUpdateView;