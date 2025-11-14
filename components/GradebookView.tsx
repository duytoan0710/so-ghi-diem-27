import React, { useState } from 'react';
import { ArrowLeftIcon, UploadCloudIcon, CloseIcon } from './icons';

// Sample data for the table
const initialStudentData = [
  { id: 1, studentId: '792069126679', name: 'Nguyễn Đức Anh', scores: ['8', '9.5', '7.5', '7'], midTerm: '4', finalTerm: '7', notes: '' },
  { id: 2, studentId: '792069126680', name: 'Nguyễn Hải Anh', scores: ['8.5', '4.5', '6', '3'], midTerm: '9.5', finalTerm: '6', notes: '' },
  { id: 3, studentId: '792069126681', name: 'Nguyễn Hoàng Anh', scores: ['4', '5', '3', '4.5'], midTerm: '5.5', finalTerm: '10', notes: '' },
  { id: 4, studentId: '792069126682', name: 'Phạm Quốc Anh', scores: ['8', '9.5', '8.5', '9'], midTerm: '4', finalTerm: '3.5', notes: '' },
  { id: 5, studentId: '792069126683', name: 'Phan Hà Châu Anh', scores: ['10', '8', '7', '5'], midTerm: '9.5', finalTerm: '5.5', notes: '' },
  { id: 6, studentId: '792069126684', name: 'Phạm Băng Băng', scores: ['7', '6', '9', '8'], midTerm: '9', finalTerm: '9', notes: '' },
  { id: 7, studentId: '792069126685', name: 'Trần Lưu Hải Băng', scores: ['3', '6.5', '7', '8.5'], midTerm: '8.5', finalTerm: '3', notes: '' },
  { id: 8, studentId: '792069126686', name: 'Đỗ Quan Tú Cầm', scores: ['3', '4.5', '4.5', '10'], midTerm: '4', finalTerm: '8', notes: '' },
  { id: 9, studentId: '792069126687', name: 'Nguyễn Hoàng Bảo Châu', scores: ['9', '6.5', '7', '6.5'], midTerm: '4.5', finalTerm: '5', notes: '' },
  { id: 10, studentId: '792069126688', name: 'Nguyễn Yến Chi', scores: ['5', '7', '7', '7.5'], midTerm: '7', finalTerm: '8.5', notes: '' },
].map(s => ({...s, avg: ''})); // avg will be calculated later

const calculateAverage = (scores: string[], midTermStr: string, finalTermStr: string): string => {
    const regularScores = scores.map(s => parseFloat(s)).filter(s => !isNaN(s));
    const midTerm = parseFloat(midTermStr);
    const finalTerm = parseFloat(finalTermStr);

    let validScoresCount = 0;
    let avgRegular = 0;
    if (regularScores.length > 0) {
        avgRegular = regularScores.reduce((acc, curr) => acc + curr, 0) / regularScores.length;
        validScoresCount += 1;
    }
    
    let totalPoints = avgRegular;
    let totalWeight = 1;

    if (!isNaN(midTerm)) {
        totalPoints += midTerm * 2;
        totalWeight += 2;
    }
    if (!isNaN(finalTerm)) {
        totalPoints += finalTerm * 3;
        totalWeight += 3;
    }
    
    if (totalWeight === 1 && regularScores.length === 0) return '';
    if (totalWeight === 0) return '';

    const average = totalPoints / totalWeight;

    return average.toFixed(1);
};


// MODAL COMPONENTS DEFINED WITHIN THE SAME FILE

interface EditScoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newScore: string, reason: string) => void;
    scoreInfo: {
        studentName: string;
        subject: string;
        currentValue: string;
    } | null;
}

const EditScoreModal: React.FC<EditScoreModalProps> = ({ isOpen, onClose, onSubmit, scoreInfo }) => {
    const [newScore, setNewScore] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (scoreInfo) {
            setNewScore(scoreInfo.currentValue || '');
            setReason('');
            setError('');
        }
    }, [scoreInfo]);

    if (!isOpen || !scoreInfo) return null;

    const handleSubmit = () => {
        const scoreNum = parseFloat(newScore);
        if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
            setError('Điểm không hợp lệ. Vui lòng nhập điểm từ 0 đến 10.');
            return;
        }
        if (!reason.trim()) {
            setError('Lý do chỉnh sửa là bắt buộc.');
            return;
        }
        onSubmit(newScore, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-slate-800">Chỉnh sửa điểm</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><CloseIcon className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p><span className="font-semibold">Học sinh:</span> {scoreInfo.studentName}</p>
                    <p><span className="font-semibold">Môn/Cột điểm:</span> {scoreInfo.subject}</p>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="font-semibold">Điểm cũ:</label>
                        <span className="px-3 py-2 bg-slate-100 rounded-md text-center">{scoreInfo.currentValue || "Chưa có"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor="new-score" className="font-semibold">Điểm mới:</label>
                        <input
                            id="new-score"
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={newScore}
                            onChange={(e) => setNewScore(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="reason" className="font-semibold block mb-1">Lý do chỉnh sửa:</label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ví dụ: Nhập nhầm điểm, phúc khảo,..."
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


interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: EditHistoryEntry[];
}
const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
                    <h3 className="text-lg font-bold text-slate-800">Lịch sử chỉnh sửa điểm</h3>
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
                                    <th className="px-4 py-3">Cột điểm</th>
                                    <th className="px-4 py-3 text-center">Điểm cũ</th>
                                    <th className="px-4 py-3 text-center">Điểm mới</th>
                                    <th className="px-4 py-3">Lý do</th>
                                    <th className="px-4 py-3">Người sửa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[...history].reverse().map((entry, index) => (
                                    <tr key={index} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 whitespace-nowrap">{entry.timestamp.toLocaleString('vi-VN')}</td>
                                        <td className="px-4 py-3 font-semibold">{entry.studentName}</td>
                                        <td className="px-4 py-3">{entry.subject}</td>
                                        <td className="px-4 py-3 text-center font-medium text-red-600">{entry.oldScore || "–"}</td>
                                        <td className="px-4 py-3 text-center font-medium text-green-600">{entry.newScore}</td>
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

// Types for history and editing state
type ScoreType = 'regular' | 'midTerm' | 'finalTerm';
interface EditingScoreInfo {
    studentId: number;
    studentName: string;
    scoreType: ScoreType;
    scoreIndex?: number;
    currentValue: string;
    subject: string;
}
interface EditHistoryEntry {
    studentId: number;
    studentName: string;
    subject: string;
    oldScore: string;
    newScore: string;
    reason: string;
    editor: string;
    timestamp: Date;
}

const TEACHER_NAME = 'Trần Thị Thuỷ';

const initialEditHistory: EditHistoryEntry[] = [
  {
    studentId: 2,
    studentName: 'Nguyễn Hải Anh',
    subject: 'KT, ĐG thường xuyên 2',
    oldScore: '4.5',
    newScore: '5.5',
    reason: 'Nhập nhầm điểm ban đầu, đã kiểm tra lại bài làm của học sinh.',
    editor: TEACHER_NAME,
    timestamp: new Date('2024-10-25T10:30:00'),
  },
  {
    studentId: 5,
    studentName: 'Phan Hà Châu Anh',
    subject: 'KT, ĐG cuối kỳ I',
    oldScore: '5.5',
    newScore: '6.0',
    reason: 'Học sinh phúc khảo, điểm được điều chỉnh tăng.',
    editor: TEACHER_NAME,
    timestamp: new Date('2024-10-28T14:15:00'),
  },
  {
    studentId: 1,
    studentName: 'Nguyễn Đức Anh',
    subject: 'KT, ĐG giữa kỳ I',
    oldScore: '4',
    newScore: '4.5',
    reason: 'Sót điểm thành phần trong bài kiểm tra.',
    editor: TEACHER_NAME,
    timestamp: new Date('2024-11-01T08:00:00'),
  }
];

const GradebookView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [students, setStudents] = useState(() => initialStudentData.map(s => ({
        ...s,
        avg: calculateAverage(s.scores, s.midTerm, s.finalTerm)
    })));
    const [schoolYear, setSchoolYear] = useState('2025-2026');
    const [semester, setSemester] = useState('Học kỳ 1');
    const [className, setClassName] = useState('9A01 - Toán');
    const [saveStatus, setSaveStatus] = useState('');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [editingScoreInfo, setEditingScoreInfo] = useState<EditingScoreInfo | null>(null);
    const [editHistory, setEditHistory] = useState<EditHistoryEntry[]>(initialEditHistory);
    
    const semesterRoman = semester === 'Học kỳ 1' ? 'I' : 'II';

    const handleScoreClick = (studentId: number, scoreType: ScoreType, scoreIndex?: number) => {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        let currentValue = '';
        let subject = '';
        if (scoreType === 'regular' && scoreIndex !== undefined) {
            currentValue = student.scores[scoreIndex];
            subject = `KT, ĐG thường xuyên ${scoreIndex + 1}`;
        } else if (scoreType === 'midTerm') {
            currentValue = student.midTerm;
            subject = `KT, ĐG giữa kỳ ${semesterRoman}`;
        } else if (scoreType === 'finalTerm') {
            currentValue = student.finalTerm;
            subject = `KT, ĐG cuối kỳ ${semesterRoman}`;
        }

        setEditingScoreInfo({ studentId, studentName: student.name, scoreType, scoreIndex, currentValue, subject });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (newScore: string, reason: string) => {
        if (!editingScoreInfo) return;

        const { studentId, scoreType, scoreIndex, currentValue, studentName, subject } = editingScoreInfo;

        // Add to history
        const newHistoryEntry: EditHistoryEntry = {
            studentId, studentName, subject,
            oldScore: currentValue,
            newScore, reason,
            editor: TEACHER_NAME,
            timestamp: new Date(),
        };
        setEditHistory(prev => [...prev, newHistoryEntry]);

        // Update student data
        setStudents(prevStudents =>
            prevStudents.map(student => {
                if (student.id === studentId) {
                    const updatedStudent = { ...student, scores: [...student.scores] };
                    if (scoreType === 'regular' && scoreIndex !== undefined) {
                        updatedStudent.scores[scoreIndex] = newScore;
                    } else if (scoreType === 'midTerm') {
                        updatedStudent.midTerm = newScore;
                    } else if (scoreType === 'finalTerm') {
                        updatedStudent.finalTerm = newScore;
                    }

                    const newAvg = calculateAverage(updatedStudent.scores, updatedStudent.midTerm, updatedStudent.finalTerm);
                    return { ...updatedStudent, avg: newAvg };
                }
                return student;
            })
        );
        
        setIsEditModalOpen(false);
        setEditingScoreInfo(null);
        setSaveStatus('');
    };

    const handleSave = () => {
        console.log("Saving data:", students);
        console.log("Edit History:", editHistory);
        setSaveStatus('Đã lưu thành công!');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const ScoreCell: React.FC<{ value: string; onClick: () => void }> = ({ value, onClick }) => (
        <div onClick={onClick} className="w-full h-full p-2 text-center cursor-pointer hover:bg-amber-100 transition-colors">
            {value}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-[#f1f5f9] font-sans" aria-modal="true" role="dialog">
            <EditScoreModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSaveEdit}
                scoreInfo={editingScoreInfo}
            />
            <HistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                history={editHistory}
            />
            <div className="flex h-screen">
                 <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col flex-shrink-0">
                    <div className="h-16 flex items-center justify-center border-b border-slate-700 px-4">
                        <h2 className="text-xl font-bold text-white text-center">Sổ Ghi Điểm</h2>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold bg-slate-700 text-white rounded-lg">
                            Quản lý theo bộ môn
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold hover:bg-slate-700 rounded-lg">
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
                            <div className="flex items-center space-x-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Năm học</label>
                                    <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>2025-2026</option>
                                        <option>2024-2025</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Học kỳ</label>
                                    <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Học kỳ 1</option>
                                        <option>Học kỳ 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Tên lớp</label>
                                    <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>9A01 - Toán</option>
                                        <option>9A02 - Văn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 pt-4 mb-4">
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2">
                                     <UploadCloudIcon className="w-6 h-6 text-slate-500" />
                                     <span className="font-semibold text-slate-700">IMPORT SỔ THEO DÕI HỌC SINH</span>
                                 </div>
                                 <div className="flex items-center space-x-4 text-sm font-medium">
                                     <a href="#" className="text-blue-600 hover:underline">Mẫu Import</a>
                                     <button className="text-blue-600 hover:underline">Import</button>
                                 </div>
                               </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-semibold text-slate-800">Sĩ số học sinh: {students.length}</p>
                                        <p className="text-sm text-red-600">(Thầy cô có thể nhấn trực tiếp vào cột điểm để sửa điểm)</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {saveStatus && <span className="text-sm font-semibold text-green-600 transition-opacity">{saveStatus}</span>}
                                        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-red-700">Chốt sổ</button>
                                        <button onClick={() => setIsHistoryModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700">Lịch sử chỉnh sửa</button>
                                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700">Lưu</button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                                    <table className="w-full text-sm text-left text-slate-600 min-w-[1300px]">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                            <tr>
                                                <th scope="col" rowSpan={2} className="w-12 px-4 py-3 border-r border-slate-200 text-center align-middle">STT</th>
                                                <th scope="col" rowSpan={2} className="w-36 px-4 py-3 border-r border-slate-200 align-middle">Mã học sinh</th>
                                                <th scope="col" rowSpan={2} className="w-56 px-4 py-3 border-r border-slate-200 align-middle">Họ và tên</th>
                                                <th scope="col" colSpan={4} className="px-4 py-3 border-r border-b border-slate-200 text-center align-middle">KT, ĐG thường xuyên</th>
                                                <th scope="col" rowSpan={2} className="w-32 px-4 py-3 border-r border-slate-200 text-center align-middle">KT, ĐG giữa kỳ {semesterRoman}</th>
                                                <th scope="col" rowSpan={2} className="w-32 px-4 py-3 border-r border-slate-200 text-center align-middle">KT, ĐG cuối kỳ {semesterRoman}</th>
                                                <th scope="col" rowSpan={2} className="w-32 px-4 py-3 border-r border-slate-200 text-center align-middle">Điểm TB học kỳ {semesterRoman}</th>
                                                <th scope="col" rowSpan={2} className="w-48 px-4 py-3 text-center align-middle">Ghi chú</th>
                                            </tr>
                                            <tr>
                                                <th scope="col" className="w-16 px-2 py-2 border-r border-slate-200 text-center font-bold text-red-600">1</th>
                                                <th scope="col" className="w-16 px-2 py-2 border-r border-slate-200 text-center font-bold text-red-600">2</th>
                                                <th scope="col" className="w-16 px-2 py-2 border-r border-slate-200 text-center font-bold text-red-600">3</th>
                                                <th scope="col" className="w-16 px-2 py-2 border-r border-slate-200 text-center font-bold text-red-600">4</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student) => (
                                                <tr key={student.id} className="bg-white border-b last:border-b-0 border-slate-200 hover:bg-slate-50">
                                                    <td className="px-4 py-0 h-12 border-r border-slate-200 text-center font-medium text-slate-700">{student.id}</td>
                                                    <td className="px-4 py-0 border-r border-slate-200">{student.studentId}</td>
                                                    <td className="px-4 py-0 border-r border-slate-200 font-semibold text-slate-900 whitespace-nowrap">{student.name}</td>
                                                    {student.scores.map((score, i) => (
                                                        <td key={i} className="p-0 border-r border-slate-200 text-center">
                                                            <ScoreCell value={score} onClick={() => handleScoreClick(student.id, 'regular', i)} />
                                                        </td>
                                                    ))}
                                                    <td className="p-0 border-r border-slate-200 text-center">
                                                        <ScoreCell value={student.midTerm} onClick={() => handleScoreClick(student.id, 'midTerm')} />
                                                    </td>
                                                    <td className="p-0 border-r border-slate-200 text-center">
                                                        <ScoreCell value={student.finalTerm} onClick={() => handleScoreClick(student.id, 'finalTerm')} />
                                                    </td>
                                                    <td className="px-4 py-2 border-r border-slate-200 text-center font-bold text-slate-900 bg-slate-50">{student.avg}</td>
                                                    <td className="p-0 text-center">
                                                        <input type="text" defaultValue={student.notes} className="w-full h-full p-2 text-left bg-transparent border-0 rounded-md focus:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GradebookView;