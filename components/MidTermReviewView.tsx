import React, { useState, useMemo } from 'react';
import { 
    CloseIcon, 
    ArrowLeftIcon, 
    MenuIcon, 
    SearchIcon, 
    AppsIcon, 
    BellIcon, 
    UserCircleIcon, 
    ChevronDownIcon,
    UploadCloudIcon
} from './icons';

// --- Types and Constants ---
type AchievementLevel = 'T' | 'H' | 'C' | '';

// For Subject View
interface StudentSubjectData {
  id: number;
  studentId: string;
  name: string;
  periodicScore: string;
  achievementLevel: AchievementLevel;
  comment: string;
}

// For Class View
interface StudentClassData {
  id: number;
  studentId: string;
  name: string;
  subjects: {
    tiengViet: AchievementLevel;
    toan: AchievementLevel;
    ngoaiNgu1: AchievementLevel;
    daoDuc: AchievementLevel;
    tnxh: AchievementLevel; // Tự nhiên xã hội
    gdtc: AchievementLevel; // Giáo dục thể chất
    amNhac: AchievementLevel;
    miThuat: AchievementLevel;
    hdtn: AchievementLevel; // Hoạt động trải nghiệm
  };
  qualities: {
    yeuNuoc: AchievementLevel;
    nhanAi: AchievementLevel;
    chamChi: AchievementLevel;
    trungThuc: AchievementLevel;
    trachNhiem: AchievementLevel;
  };
  generalCompetencies: {
    tuChu: AchievementLevel;
    giaoTiep: AchievementLevel;
    gqvd: AchievementLevel; // Giải quyết vấn đề
  };
  specificCompetencies: {
    ngonNgu: AchievementLevel;
    tinhToan: AchievementLevel;
    thamMi: AchievementLevel;
    theChat: AchievementLevel;
  };
  notes: string;
}


interface EditingInfo {
  studentId: number;
  studentName: string;
  currentValue: AchievementLevel;
  fieldName: string;
  onSave: (newValue: AchievementLevel) => void;
}

interface EditHistoryEntry {
  studentId: number;
  studentName: string;
  fieldName: string;
  oldValue: AchievementLevel;
  newValue: AchievementLevel;
  reason: string;
  editor: string;
  timestamp: Date;
}

const TEACHER_NAME = 'Nguyễn Văn An';

const achievementMap: Record<AchievementLevel, string> = {
    'T': 'Tốt',
    'H': 'Hoàn thành',
    'C': 'Chưa hoàn thành',
    '': 'Chưa đánh giá'
};

const formatAchievement = (level: AchievementLevel, withCode = true): string => {
    if (!level) return achievementMap[''];
    const text = achievementMap[level] || 'Không xác định';
    return withCode ? `${level} (${text})` : text;
};
// --- End Types and Constants ---

// --- MOCK DATA ---
const initialStudentSubjectData: StudentSubjectData[] = [
  { id: 1, studentId: 'HS079700000001', name: 'Nguyễn Thị Mai Anh', periodicScore: '', achievementLevel: 'T', comment: 'Con học tốt, cần phát huy.' },
  { id: 2, studentId: 'HS079700000002', name: 'Trần Văn Bảo', periodicScore: '', achievementLevel: 'H', comment: 'Con cần tập trung hơn.' },
  { id: 3, studentId: 'HS079700000003', name: 'Lê Thị Diệu Hiền', periodicScore: '', achievementLevel: 'H', comment: '' },
  { id: 4, studentId: 'HS079700000004', name: 'Phạm Minh Đức', periodicScore: '4', achievementLevel: 'C', comment: 'Con cần cố gắng nhiều hơn.' },
  { id: 5, studentId: 'HS079700000005', name: 'Huỳnh Thị Kim Ngân', periodicScore: '', achievementLevel: 'T', comment: 'Con rất tiến bộ.' },
  { id: 6, studentId: 'HS079700000006', name: 'Nguyễn Văn Phú', periodicScore: '', achievementLevel: 'H', comment: '' },
  { id: 7, studentId: 'HS079700000007', name: 'Đỗ Thị Thanh Tâm', periodicScore: '', achievementLevel: 'T', comment: 'Con thông minh, sáng tạo.' },
  { id: 8, studentId: 'HS079700000008', name: 'Võ Minh Quang', periodicScore: '', achievementLevel: 'H', comment: '' },
  { id: 9, studentId: 'HS079700000009', name: 'Trần Ngọc Anh', periodicScore: '', achievementLevel: 'C', comment: 'Con chưa tập trung.' },
  { id: 10, studentId: 'HS079700000010', name: 'Lê Văn Luyện', periodicScore: '', achievementLevel: 'T', comment: 'Con tiếp thu bài nhanh.' },
];

const levels: AchievementLevel[] = ['T', 'H', 'C'];
const getRandomLevel = () => levels[Math.floor(Math.random() * levels.length)];
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
const initialClassStudentData: StudentClassData[] = studentBaseInfo.map(s => ({
    ...s,
    subjects: {
        tiengViet: getRandomLevel(), toan: getRandomLevel(), ngoaiNgu1: getRandomLevel(), daoDuc: getRandomLevel(),
        tnxh: getRandomLevel(), gdtc: getRandomLevel(), amNhac: getRandomLevel(), miThuat: getRandomLevel(), hdtn: getRandomLevel(),
    },
    qualities: {
        yeuNuoc: getRandomLevel(), nhanAi: getRandomLevel(), chamChi: getRandomLevel(), trungThuc: getRandomLevel(), trachNhiem: getRandomLevel(),
    },
    generalCompetencies: {
        tuChu: getRandomLevel(), giaoTiep: getRandomLevel(), gqvd: getRandomLevel(),
    },
    specificCompetencies: {
        ngonNgu: getRandomLevel(), tinhToan: getRandomLevel(), thamMi: getRandomLevel(), theChat: getRandomLevel(),
    },
    notes: '',
}));


const initialHistoryData: EditHistoryEntry[] = [
    {
        studentId: 4, studentName: 'Phạm Minh Đức', fieldName: 'Mức đạt được',
        oldValue: 'H', newValue: 'C',
        reason: 'Đánh giá lại năng lực hoàn thành bài tập của con.',
        editor: TEACHER_NAME, timestamp: new Date('2024-10-20T09:15:30')
    },
    {
        studentId: 2, studentName: 'Trần Văn Bảo', fieldName: 'Mức đạt được',
        oldValue: 'C', newValue: 'H',
        reason: 'Có sự tiến bộ trong quá trình học tập giữa kỳ.',
        editor: TEACHER_NAME, timestamp: new Date('2024-10-22T14:05:10')
    }
];

// --- Modal Components ---

const EditAchievementModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newValue: AchievementLevel, reason: string) => void;
    editInfo: EditingInfo | null;
}> = ({ isOpen, onClose, onSubmit, editInfo }) => {
    const [newValue, setNewValue] = useState<AchievementLevel>('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (editInfo) {
            setNewValue(editInfo.currentValue || '');
            setReason('');
            setError('');
        }
    }, [editInfo]);

    if (!isOpen || !editInfo) return null;

    const handleSubmit = () => {
        if (!newValue) {
            setError('Vui lòng chọn mức đạt được mới.');
            return;
        }
        if (!reason.trim()) {
            setError('Lý do chỉnh sửa là bắt buộc.');
            return;
        }
        onSubmit(newValue, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-slate-800">Chỉnh sửa: {editInfo.fieldName}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><CloseIcon className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p><span className="font-semibold">Học sinh:</span> {editInfo.studentName}</p>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="font-semibold">Kết quả cũ:</label>
                        <span className="px-3 py-2 bg-slate-100 rounded-md">{formatAchievement(editInfo.currentValue, true)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor="new-value" className="font-semibold">Kết quả mới:</label>
                        <select
                            id="new-value"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value as AchievementLevel)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>-- Chọn mức --</option>
                            <option value="T">T (Tốt)</option>
                            <option value="H">H (Hoàn thành)</option>
                            <option value="C">C (Chưa hoàn thành)</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="reason" className="font-semibold block mb-1">Lý do chỉnh sửa:</label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ví dụ: Cập nhật lại do có tiến bộ..."
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
                <div className="flex justify-end items-center p-4 bg-slate-50 rounded-b-lg space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md text-sm shadow-sm hover:bg-slate-50">Hủy</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
};

const HistoryModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    history: EditHistoryEntry[];
}> = ({ isOpen, onClose, history }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-bold text-slate-800">Lịch sử chỉnh sửa</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><CloseIcon className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {history.length === 0 ? (
                        <p className="text-center text-slate-500 p-8">Chưa có lịch sử chỉnh sửa nào.</p>
                    ) : (
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3">Thời gian</th>
                                    <th className="px-4 py-3">Học sinh</th>
                                    <th className="px-4 py-3">Nội dung sửa</th>
                                    <th className="px-4 py-3">Kết quả cũ</th>
                                    <th className="px-4 py-3">Kết quả mới</th>
                                    <th className="px-4 py-3">Lý do</th>
                                    <th className="px-4 py-3">Người sửa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[...history].reverse().map((entry, index) => (
                                    <tr key={index} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 whitespace-nowrap">{entry.timestamp.toLocaleString('vi-VN')}</td>
                                        <td className="px-4 py-3 font-semibold">{entry.studentName}</td>
                                        <td className="px-4 py-3 font-semibold">{entry.fieldName}</td>
                                        <td className="px-4 py-3 font-medium text-red-600">{formatAchievement(entry.oldValue, true)}</td>
                                        <td className="px-4 py-3 font-medium text-green-600">{formatAchievement(entry.newValue, true)}</td>
                                        <td className="px-4 py-3">{entry.reason}</td>
                                        <td className="px-4 py-3">{entry.editor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="p-4 bg-slate-50 border-t flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md text-sm shadow-sm hover:bg-slate-50">Đóng</button>
                </div>
            </div>
        </div>
    );
};

const SubjectView: React.FC<{
    period: string;
    selectedSubject: string;
    setEditingInfo: (info: EditingInfo | null) => void;
    setIsEditModalOpen: (isOpen: boolean) => void;
    setEditHistory: React.Dispatch<React.SetStateAction<EditHistoryEntry[]>>;
}> = ({ period, selectedSubject, setEditingInfo, setIsEditModalOpen, setEditHistory }) => {
    const [students, setStudents] = useState<StudentSubjectData[]>(initialStudentSubjectData);

    const handleDataChange = (studentId: number, field: keyof StudentSubjectData, value: string) => {
        setStudents(prev => 
            prev.map(student => 
                student.id === studentId ? { ...student, [field]: value } : student
            )
        );
    };

    const handleAchievementClick = (student: StudentSubjectData) => {
        setEditingInfo({
            studentId: student.id,
            studentName: student.name,
            currentValue: student.achievementLevel,
            fieldName: `Mức đạt được (${selectedSubject})`,
            onSave: (newValue) => {
                setStudents(prev => prev.map(s => s.id === student.id ? {...s, achievementLevel: newValue} : s));
                 setEditHistory(prev => [...prev, {
                    studentId: student.id, studentName: student.name,
                    fieldName: `Mức đạt được (${selectedSubject})`,
                    oldValue: student.achievementLevel, newValue,
                    reason: 'Lý do được nhập ở modal', // Placeholder
                    editor: TEACHER_NAME, timestamp: new Date()
                }]);
            }
        });
        setIsEditModalOpen(true);
    };

    const tableConfig = useMemo(() => {
        const hasScore = period === 'Cuối kỳ 1' || period === 'Cuối năm';
        return {
            showPeriodicScore: hasScore,
            columns: [
                { key: 'stt', header: 'STT' }, { key: 'studentId', header: 'Mã học sinh' },
                { key: 'name', header: 'Họ và tên' },
                ...(hasScore ? [{ key: 'periodicScore', header: 'Điểm KTĐK' }] : []),
                { key: 'achievementLevel', header: 'Mức đạt được' },
                { key: 'comment', header: 'Nhận xét' },
            ]
        };
    }, [period]);

    return (
        <>
            <div className="flex justify-between items-center mb-4 py-2 border-b border-slate-200">
                <div>
                    <p className="font-semibold text-slate-800">Sĩ số học sinh: <span className="font-bold">{students.length}</span></p>
                    <p className="text-sm text-slate-600 mt-1">Giáo viên phụ trách: <span className="font-bold">Nguyễn Văn An</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-red-700">Chốt sổ</button>
                    <button onClick={() => { /* Logic to open history */ }} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700">Lịch sử chỉnh sửa</button>
                    <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu</button>
                </div>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            {tableConfig.columns.map(col => (
                                <th key={col.key} scope="col" className="px-4 py-3 border-r last:border-r-0 border-slate-200 text-center font-bold">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className="bg-white border-b last:border-b-0 border-slate-200 hover:bg-slate-50">
                                <td className="px-4 py-2 border-r border-slate-200 text-center font-medium text-slate-700">{index + 1}</td>
                                <td className="px-4 py-2 border-r border-slate-200 text-center">{student.studentId}</td>
                                <td className="px-4 py-2 border-r border-slate-200 font-semibold text-slate-900">{student.name}</td>
                                {tableConfig.showPeriodicScore && (
                                    <td className="p-0 border-r border-slate-200 text-center align-middle">
                                        <input type="number" step="0.5" min="0" max="10" value={student.periodicScore} onChange={(e) => handleDataChange(student.id, 'periodicScore', e.target.value)} className="w-full h-full p-2 text-center bg-transparent border-0 rounded-none focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </td>
                                )}
                                <td className="p-0 border-r border-slate-200 text-center align-middle">
                                    <div onClick={() => handleAchievementClick(student)} className="w-full h-full flex items-center justify-center py-2 cursor-pointer hover:bg-amber-100 transition-colors">
                                        {student.achievementLevel}
                                    </div>
                                </td>
                                <td className="p-0 text-center align-middle">
                                    <input type="text" value={student.comment} onChange={(e) => handleDataChange(student.id, 'comment', e.target.value)} className="w-full h-full p-2 text-left bg-transparent border-0 rounded-none focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const ClassView: React.FC<{
    setEditingInfo: (info: EditingInfo | null) => void;
    setIsEditModalOpen: (isOpen: boolean) => void;
}> = ({ setEditingInfo, setIsEditModalOpen }) => {
    const [students, setStudents] = useState<StudentClassData[]>(initialClassStudentData);
    
    const handleCellChange = (id: number, field: 'notes', value: string) => {
        setStudents(prev => prev.map(s => s.id === id ? {...s, [field]: value} : s));
    };

    const handleAchievementClick = (
        student: StudentClassData, 
        category: 'qualities' | 'generalCompetencies' | 'specificCompetencies',
        subkey: string,
        fieldName: string
    ) => {
        const currentValue = (student[category] as any)[subkey];
        setEditingInfo({
            studentId: student.id,
            studentName: student.name,
            currentValue,
            fieldName,
            onSave: (newValue) => {
                setStudents(prev => prev.map(s => {
                    if (s.id === student.id) {
                        const updatedStudent = { ...s };
                        (updatedStudent[category] as any)[subkey] = newValue;
                        return updatedStudent;
                    }
                    return s;
                }));
            }
        });
        setIsEditModalOpen(true);
    };

    const renderEditableCell = (student: StudentClassData, category: any, subkey: string, fieldName: string) => (
        <td className="p-0 text-center align-middle border border-slate-200">
            <div
                onClick={() => handleAchievementClick(student, category, subkey, fieldName)}
                className="w-full h-12 flex items-center justify-center cursor-pointer hover:bg-amber-100 transition-colors"
            >
                {(student[category] as any)[subkey]}
            </div>
        </td>
    );

    const ReadOnlyAchievementCell: React.FC<{ level: AchievementLevel }> = ({ level }) => (
        <td className="p-0 text-center align-middle border border-slate-200 bg-slate-50">
            <div className="w-full h-12 flex items-center justify-center text-slate-600 font-medium">
                {level}
            </div>
        </td>
    );

    return (
        <>
            <div className="flex justify-between items-center mb-4 py-2 border-b border-slate-200">
                <div>
                    <p className="font-semibold text-slate-800">Sĩ số học sinh: <span className="font-bold">{students.length}</span></p>
                    <p className="text-sm text-slate-600 mt-1">Giáo viên chủ nhiệm: <span className="font-bold">Nguyễn Văn An</span></p>
                </div>
                 <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-red-700">Chốt sổ</button>
                    <button onClick={() => { /* Logic to open history */ }} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700">Lịch sử chỉnh sửa</button>
                    <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu</button>
                </div>
            </div>
            <p className="text-sm text-slate-600 mb-4 italic">
                Lưu ý: Kết quả các môn học được đồng bộ từ mục "Quản lý theo bộ môn". GVCN chỉ cập nhật các mục <span className="font-semibold text-slate-700">Phẩm chất</span> và <span className="font-semibold text-slate-700">Năng lực</span>.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-sm text-left text-slate-600 border-collapse min-w-[3000px]">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th rowSpan={3} className="px-2 py-3 border border-slate-200 align-middle text-center font-bold sticky left-0 bg-slate-100 z-10 w-10">STT</th>
                            <th rowSpan={3} className="px-4 py-3 border border-slate-200 align-middle text-center font-bold sticky left-10 bg-slate-100 z-10 w-36">Mã học sinh</th>
                            <th rowSpan={3} className="px-4 py-3 border border-slate-200 align-middle text-center font-bold sticky left-[11.5rem] bg-slate-100 z-10 w-52">Họ và tên</th>
                            <th colSpan={9} className="px-4 py-2 border border-slate-200 text-center font-bold">Môn học và hoạt động giáo dục</th>
                            <th colSpan={5} className="px-4 py-2 border border-slate-200 text-center font-bold">Phẩm chất chủ yếu</th>
                            <th colSpan={7} className="px-4 py-2 border border-slate-200 text-center font-bold">Năng lực cốt lõi</th>
                            <th rowSpan={3} className="px-4 py-3 border border-slate-200 align-middle text-center font-bold w-64">Ghi chú</th>
                        </tr>
                        <tr>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Tiếng Việt</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Toán</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Ngoại ngữ 1</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Đạo đức</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Tự nhiên & Xã hội</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Giáo dục TC</th>
                            <th colSpan={2} className="p-2 border border-slate-200 text-center font-semibold">Nghệ thuật</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Hoạt động TN</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Yêu nước</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Nhân ái</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Chăm chỉ</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Trung thực</th>
                            <th rowSpan={2} className="p-2 border border-slate-200 align-middle text-center font-semibold">Trách nhiệm</th>
                            <th colSpan={3} className="p-2 border border-slate-200 text-center font-semibold">Năng lực chung</th>
                            <th colSpan={4} className="p-2 border border-slate-200 text-center font-semibold">Năng lực đặc thù</th>
                        </tr>
                        <tr>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Âm nhạc</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Mĩ thuật</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Tự chủ & Tự học</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Giao tiếp & Hợp tác</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">GQVB & Sáng tạo</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Ngôn ngữ</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Tính toán</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Thẩm mĩ</th>
                            <th className="p-2 border border-slate-200 text-center font-semibold">Thể chất</th>
                        </tr>
                    </thead>
                    <tbody>
                         {students.map((student, index) => (
                            <tr key={student.id} className="bg-white hover:bg-slate-50 group">
                                <td className="px-2 py-2 border border-slate-200 text-center font-medium text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50 w-10">{index + 1}</td>
                                <td className="px-4 py-2 border border-slate-200 text-center sticky left-10 bg-white group-hover:bg-slate-50 w-36">{student.studentId}</td>
                                <td className="px-4 py-2 border border-slate-200 font-semibold text-slate-900 sticky left-[11.5rem] bg-white group-hover:bg-slate-50 w-52">{student.name}</td>
                                
                                <ReadOnlyAchievementCell level={student.subjects.tiengViet} />
                                <ReadOnlyAchievementCell level={student.subjects.toan} />
                                <ReadOnlyAchievementCell level={student.subjects.ngoaiNgu1} />
                                <ReadOnlyAchievementCell level={student.subjects.daoDuc} />
                                <ReadOnlyAchievementCell level={student.subjects.tnxh} />
                                <ReadOnlyAchievementCell level={student.subjects.gdtc} />
                                <ReadOnlyAchievementCell level={student.subjects.amNhac} />
                                <ReadOnlyAchievementCell level={student.subjects.miThuat} />
                                <ReadOnlyAchievementCell level={student.subjects.hdtn} />

                                {renderEditableCell(student, 'qualities', 'yeuNuoc', 'PC Yêu nước')}
                                {renderEditableCell(student, 'qualities', 'nhanAi', 'PC Nhân ái')}
                                {renderEditableCell(student, 'qualities', 'chamChi', 'PC Chăm chỉ')}
                                {renderEditableCell(student, 'qualities', 'trungThuc', 'PC Trung thực')}
                                {renderEditableCell(student, 'qualities', 'trachNhiem', 'PC Trách nhiệm')}
                                
                                {renderEditableCell(student, 'generalCompetencies', 'tuChu', 'NLC Tự chủ & Tự học')}
                                {renderEditableCell(student, 'generalCompetencies', 'giaoTiep', 'NLC Giao tiếp & Hợp tác')}
                                {renderEditableCell(student, 'generalCompetencies', 'gqvd', 'NLC GQVB & Sáng tạo')}
                                
                                {renderEditableCell(student, 'specificCompetencies', 'ngonNgu', 'NLĐT Ngôn ngữ')}
                                {renderEditableCell(student, 'specificCompetencies', 'tinhToan', 'NLĐT Tính toán')}
                                {renderEditableCell(student, 'specificCompetencies', 'thamMi', 'NLĐT Thẩm mĩ')}
                                {renderEditableCell(student, 'specificCompetencies', 'theChat', 'NLĐT Thể chất')}

                                <td className="p-0 text-center align-middle border border-slate-200 w-64">
                                    <input type="text" value={student.notes} onChange={e => handleCellChange(student.id, 'notes', e.target.value)} className="w-full h-12 p-2 text-left bg-transparent border-0 focus:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


const MidTermReviewView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [viewMode, setViewMode] = useState<'subject' | 'class'>('class');
    const [period, setPeriod] = useState('Giữa kỳ 1');
    const [selectedClass, setSelectedClass] = useState('3A1');
    const [selectedSubject, setSelectedSubject] = useState('Toán');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [editingInfo, setEditingInfo] = useState<EditingInfo | null>(null);
    const [editHistory, setEditHistory] = useState<EditHistoryEntry[]>(initialHistoryData);
    
    const handleSaveEdit = (newValue: AchievementLevel, reason: string) => {
        if (!editingInfo) return;
        
        const newHistoryEntry: EditHistoryEntry = {
            studentId: editingInfo.studentId,
            studentName: editingInfo.studentName,
            fieldName: editingInfo.fieldName,
            oldValue: editingInfo.currentValue,
            newValue,
            reason,
            editor: TEACHER_NAME,
            timestamp: new Date(),
        };
        setEditHistory(prev => [...prev, newHistoryEntry]);

        editingInfo.onSave(newValue);
        
        setIsEditModalOpen(false);
        setEditingInfo(null);
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#f1f5f9] font-sans" aria-modal="true" role="dialog">
            <EditAchievementModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSaveEdit}
                editInfo={editingInfo}
            />
            <HistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                history={editHistory}
            />
            <div className="flex h-screen">
                <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col flex-shrink-0">
                    <nav className="flex-1 p-4 space-y-2 mt-4">
                         <a href="#" onClick={(e) => {e.preventDefault(); setViewMode('subject')}} className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'subject' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700/80'}`}>
                            Quản lý theo môn học
                        </a>
                        <a href="#" onClick={(e) => {e.preventDefault(); setViewMode('class')}} className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'class' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700/80'}`}>
                            Quản lý theo lớp học
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold hover:bg-slate-700/80 rounded-lg transition-colors">
                            Ôn luyện lại trong hè
                        </a>
                    </nav>
                </aside>
                
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
                        <div className="flex items-center space-x-4">
                            <MenuIcon className="w-6 h-6 text-slate-500" />
                            <h1 className="text-xl font-bold text-slate-800">Sổ ghi điểm</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SearchIcon className="w-5 h-5 text-slate-500" />
                            <AppsIcon className="w-5 h-5 text-slate-500" />
                            <BellIcon className="w-5 h-5 text-slate-500" />
                            <button onClick={onClose} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                <ArrowLeftIcon className="w-4 h-4" />
                                <span>Quay lại trang chủ</span>
                            </button>
                            <div className="flex items-center space-x-2 border rounded-full p-1 pr-3">
                                <UserCircleIcon className="w-7 h-7 text-slate-600"/>
                                <span className="text-sm font-medium">Xin chào, {TEACHER_NAME}</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                             <div className="flex items-center space-x-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Học kỳ</label>
                                    <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="Giữa kỳ 1">Giữa kỳ 1</option>
                                        <option value="Cuối kỳ 1">Cuối kỳ 1</option>
                                        <option value="Giữa kỳ 2">Giữa kỳ 2</option>
                                        <option value="Cuối năm">Cuối năm</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Tên lớp</label>
                                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>3A1</option>
                                        <option>3A2</option>
                                    </select>
                                </div>
                                {viewMode === 'subject' && (
                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Môn học</label>
                                        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>Toán</option>
                                            <option>Tiếng Việt</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            
                            <div className="border-t border-b border-slate-200 py-3 mb-4">
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                     <UploadCloudIcon className="w-7 h-7 text-slate-500" />
                                     <span className="font-semibold text-slate-700 text-base">IMPORT SỔ GHI ĐIỂM</span>
                                 </div>
                                 <div className="flex items-center space-x-4 text-sm font-medium">
                                     <a href="#" className="text-blue-600 hover:underline">Mẫu Import</a>
                                     <button className="text-blue-600 hover:underline">Import</button>
                                 </div>
                               </div>
                            </div>
                            
                             {viewMode === 'subject' ? (
                                <SubjectView 
                                    period={period} 
                                    selectedSubject={selectedSubject}
                                    setEditingInfo={setEditingInfo}
                                    setIsEditModalOpen={setIsEditModalOpen}
                                    setEditHistory={setEditHistory}
                                />
                            ) : (
                                <ClassView 
                                    setEditingInfo={setEditingInfo}
                                    setIsEditModalOpen={setIsEditModalOpen}
                                />
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MidTermReviewView;