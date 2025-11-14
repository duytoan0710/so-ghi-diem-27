import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

// Types for Primary School Re-assessment (TT27)
type ReExamGrade = 'T' | 'H' | 'C' | ''; // Tốt, Hoàn thành, Chưa hoàn thành (for subjects)
type ReExamLevel = 'T' | 'Đ' | 'C' | ''; // Tốt, Đạt, Cần cố gắng (for qualities)

interface ReExamItem {
  name: string;
  type: 'subject-score' | 'subject-grade' | 'quality';
  currentValue: string; // Can be a score, a ReExamGrade, or a ReExamLevel
  initialValue?: string; // The initial failing score, if applicable
}

interface ReExamStudent {
  id: number;
  studentId: string;
  name: string;
  className: string;
  initialAcademicResult: 'Hoàn thành' | 'Chưa hoàn thành';
  initialQualitiesResult: 'Tốt' | 'Đạt' | 'Cần cố gắng';
  reviewItems: ReExamItem[];
}

// Mock data adapted for a primary school class (e.g., Lớp 5A1) with diverse cases
const initialStudentsData: ReExamStudent[] = [
  // Case 1: Fails only in a score-based subject (Toán)
  {
    id: 1,
    studentId: 'HS079700000004',
    name: 'Phạm Minh Đức',
    className: '5A1',
    initialAcademicResult: 'Chưa hoàn thành',
    initialQualitiesResult: 'Đạt',
    reviewItems: [
      { name: 'Toán', type: 'subject-score', currentValue: '', initialValue: '4.5' },
    ],
  },
  // Case 2: Fails only in a quality/competency
  {
    id: 2,
    studentId: 'HS079700000009',
    name: 'Trần Ngọc Anh',
    className: '5A1',
    initialAcademicResult: 'Hoàn thành',
    initialQualitiesResult: 'Cần cố gắng',
    reviewItems: [
      { name: 'Phẩm chất - Chăm chỉ', type: 'quality', currentValue: '' },
    ],
  },
  // Case 3: Fails in both a grade-based subject and a competency
  {
    id: 3,
    studentId: 'HS079700000002',
    name: 'Trần Văn Bảo',
    className: '5A1',
    initialAcademicResult: 'Chưa hoàn thành',
    initialQualitiesResult: 'Cần cố gắng',
    reviewItems: [
      { name: 'Giáo dục thể chất', type: 'subject-grade', currentValue: '' },
      { name: 'Năng lực - Giao tiếp và hợp tác', type: 'quality', currentValue: '' },
    ],
  },
  // Case 4: Fails in multiple subjects (one score-based, one grade-based)
  {
    id: 4,
    studentId: 'HS079700000008',
    name: 'Võ Minh Quang',
    className: '5A1',
    initialAcademicResult: 'Chưa hoàn thành',
    initialQualitiesResult: 'Tốt',
    reviewItems: [
       { name: 'Khoa học', type: 'subject-score', currentValue: '', initialValue: '3.0' },
       { name: 'Đạo đức', type: 'subject-grade', currentValue: '' },
    ],
  },
  // Case 5: NEW - Fails only in a score-based subject (Tiếng Việt)
  {
    id: 5,
    studentId: 'HS079700000005',
    name: 'Huỳnh Thị Kim Ngân',
    className: '5A1',
    initialAcademicResult: 'Chưa hoàn thành',
    initialQualitiesResult: 'Tốt',
    reviewItems: [
      { name: 'Tiếng Việt', type: 'subject-score', currentValue: '', initialValue: '4.0' },
    ],
  },
  // Case 6: NEW - Fails in all three categories (score, grade, quality)
  {
    id: 6,
    studentId: 'HS079700000010',
    name: 'Lê Văn Luyện',
    className: '5A1',
    initialAcademicResult: 'Chưa hoàn thành',
    initialQualitiesResult: 'Cần cố gắng',
    reviewItems: [
      { name: 'Lịch sử và Địa lý', type: 'subject-score', currentValue: '', initialValue: '2.5' },
      { name: 'Âm nhạc', type: 'subject-grade', currentValue: '' },
      { name: 'Năng lực - Tự chủ và tự học', type: 'quality', currentValue: '' },
    ],
  },
];

const InitialResultDetails: React.FC<{ items: ReExamItem[] }> = ({ items }) => {
    const subjects = items.filter(item => item.type.startsWith('subject'));
    const qualities = items.filter(item => item.type === 'quality' && item.name.startsWith('Phẩm chất'));
    const competencies = items.filter(item => item.type === 'quality' && item.name.startsWith('Năng lực'));

    const allSections = [
        { title: 'MÔN HỌC', items: subjects },
        { title: 'PHẨM CHẤT CHỦ YẾU', items: qualities },
        { title: 'NĂNG LỰC CỐT LÕI', items: competencies },
    ].filter(sec => sec.items.length > 0);

    const renderReasonPill = (item: ReExamItem) => {
        let text = '';
        let styles = 'px-2.5 py-1 text-xs font-bold rounded-full shadow-sm';
        if (item.type === 'subject-score') {
            text = `Điểm ${item.initialValue || '< 5'}`;
            styles += ' bg-red-100 text-red-800 ring-1 ring-inset ring-red-200';
        } else if (item.type === 'subject-grade') {
            text = 'Chưa hoàn thành';
            styles += ' bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-200';
        } else if (item.type === 'quality') {
            text = 'Cần cố gắng';
            styles += ' bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200';
        }
        return <span className={styles}>{text}</span>;
    };


    const cleanName = (name: string) => {
        return name.replace('Phẩm chất - ', '').replace('Năng lực - ', '');
    };
    
    return (
        <div className="flex flex-col divide-y divide-slate-300 text-sm">
            {allSections.map((section, secIndex) => (
                <div key={section.title} className={`py-4 ${secIndex === 0 ? 'pt-0' : ''} ${secIndex === allSections.length - 1 ? 'pb-0' : ''}`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3">{section.title}</h4>
                    <div className="space-y-2.5">
                        {section.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="font-medium text-slate-800">
                                    {item.type === 'quality' ? cleanName(item.name) : item.name}
                                </span>
                                {renderReasonPill(item)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


const GradebookReExaminationView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [students, setStudents] = useState(initialStudentsData);

    const handleValueChange = (studentId: number, itemName: string, newValue: string) => {
        setStudents(prevStudents =>
            prevStudents.map(student => {
                if (student.id === studentId) {
                    const updatedItems = student.reviewItems.map(item =>
                        item.name === itemName ? { ...item, currentValue: newValue } : item
                    );
                    return { ...student, reviewItems: updatedItems };
                }
                return student;
            })
        );
    };

    const getFinalStatus = (student: ReExamStudent) => {
        const allAssessed = student.reviewItems.every(item => item.currentValue !== '');
        if (!allAssessed) {
            return { academic: 'Chờ nhập...', qualities: 'Chờ nhập...', promotion: 'Chờ nhập...' };
        }

        const subjectItems = student.reviewItems.filter(item => item.type.startsWith('subject'));
        const allSubjectsPassed = subjectItems.length > 0
            ? subjectItems.every(item => {
                if (item.type === 'subject-score') {
                    const score = parseFloat(item.currentValue);
                    return !isNaN(score) && score >= 5;
                }
                return item.currentValue === 'H' || item.currentValue === 'T';
            })
            : true;

        const qualityItems = student.reviewItems.filter(item => item.type === 'quality');
        const allQualitiesPassed = qualityItems.length > 0
            ? qualityItems.every(item => item.currentValue === 'Đ' || item.currentValue === 'T')
            : true;
        
        const finalAcademic = student.initialAcademicResult === 'Chưa hoàn thành'
            ? (allSubjectsPassed ? 'Hoàn thành' : 'Chưa hoàn thành')
            : 'Hoàn thành';

        const finalQualities = student.initialQualitiesResult === 'Cần cố gắng'
            ? (allQualitiesPassed ? 'Đạt' : 'Cần cố gắng')
            : student.initialQualitiesResult;

        const canBePromoted = finalAcademic === 'Hoàn thành' && (finalQualities === 'Đạt' || finalQualities === 'Tốt');
        const promotion = canBePromoted ? 'Được lên lớp' : 'Chưa được lên lớp';

        return { academic: finalAcademic, qualities: finalQualities, promotion: promotion };
    };


    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-blue-100 font-sans" aria-modal="true" role="dialog">
            <div className="flex h-screen">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Rèn luyện hè và xét lên lớp - Lớp 5A1</h1>
                                <p className="text-slate-600 mt-2">Cập nhật kết quả rèn luyện trong hè cho học sinh</p>
                            </div>
                             <div className="flex items-center space-x-3 flex-shrink-0">
                                <button onClick={onClose} className="flex items-center space-x-2 bg-white text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all duration-200 shadow-md border border-slate-200 transform hover:-translate-y-px">
                                    <ArrowLeftIcon className="w-4 h-4" />
                                    <span>Quay lại trang chủ</span>
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-red-700 transition-all duration-200 transform hover:-translate-y-px">Chốt kết quả</button>
                                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-px">Lưu</button>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 rounded-xl shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-600 border-collapse">
                                    <thead className="text-sm text-slate-800 uppercase bg-slate-100">
                                        <tr className="[&>th]:font-bold [&>th]:px-3 [&>th]:py-3 [&>th]:border [&>th]:border-slate-300 [&>th]:align-middle [&>th]:text-center">
                                            <th className="w-64">Thông tin học sinh</th>
                                            <th className="w-72">Kết quả ban đầu</th>
                                            <th className="w-64">Nội dung rèn luyện</th>
                                            <th className="w-40">Cập nhật kết quả</th>
                                            <th className="w-52">Tổng kết sau cùng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {students.map((student) => {
                                            const finalStatus = getFinalStatus(student);
                                            return (
                                                <React.Fragment key={student.id}>
                                                    {student.reviewItems.map((item, itemIndex) => (
                                                        <tr key={`${student.id}-${item.name}`} className="even:bg-slate-50/50 hover:bg-blue-50/50 transition-colors duration-200">
                                                            {itemIndex === 0 && (
                                                                <>
                                                                    <td rowSpan={student.reviewItems.length} className="px-4 py-3 border border-slate-300 align-middle">
                                                                        <p><span className="font-semibold text-slate-500">Mã HS:</span> {student.studentId}</p>
                                                                        <p><span className="font-semibold text-slate-500">Tên:</span> <span className="font-bold text-slate-800">{student.name}</span></p>
                                                                        <p><span className="font-semibold text-slate-500">Lớp:</span> {student.className}</p>
                                                                    </td>
                                                                    <td rowSpan={student.reviewItems.length} className="px-4 py-3 border border-slate-300 align-middle text-left">
                                                                        <InitialResultDetails items={student.reviewItems} />
                                                                    </td>
                                                                </>
                                                            )}
                                                            <td className="px-4 py-3 border border-slate-300 align-middle font-medium">{item.name}</td>
                                                            <td className="px-2 py-1 border border-slate-300 align-middle text-center">
                                                                {item.type === 'subject-grade' ? (
                                                                    <select
                                                                        value={item.currentValue}
                                                                        onChange={(e) => handleValueChange(student.id, item.name, e.target.value)}
                                                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                                                                    >
                                                                        <option value=""></option>
                                                                        <option value="T">T (Tốt)</option>
                                                                        <option value="H">H (Hoàn thành)</option>
                                                                        <option value="C">C (Chưa hoàn thành)</option>
                                                                    </select>
                                                                ) : item.type === 'quality' ? (
                                                                    <select
                                                                        value={item.currentValue}
                                                                        onChange={(e) => handleValueChange(student.id, item.name, e.target.value)}
                                                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                                                                    >
                                                                        <option value=""></option>
                                                                        <option value="T">T (Tốt)</option>
                                                                        <option value="Đ">Đ (Đạt)</option>
                                                                        <option value="C">C (Cần cố gắng)</option>
                                                                    </select>
                                                                ) : (
                                                                    <input
                                                                        type="number"
                                                                        step="0.5"
                                                                        min="0"
                                                                        max="10"
                                                                        value={item.currentValue}
                                                                        onChange={(e) => handleValueChange(student.id, item.name, e.target.value)}
                                                                        className="w-full p-2 border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    />
                                                                )}
                                                            </td>
                                                            {itemIndex === 0 && (
                                                                <td rowSpan={student.reviewItems.length} className="px-4 py-3 border border-slate-300 align-middle text-base">
                                                                    <div className="space-y-1.5">
                                                                        <p><span className="font-semibold text-slate-600">Học tập:</span> <span className={`font-bold ${finalStatus.academic === 'Hoàn thành' ? 'text-green-600' : (finalStatus.academic.startsWith('Chờ') ? 'text-slate-500 italic' : 'text-red-600')}`}>{finalStatus.academic}</span></p>
                                                                        <p><span className="font-semibold text-slate-600">Phẩm chất, NL:</span> <span className={`font-bold ${finalStatus.qualities === 'Đạt' || finalStatus.qualities === 'Tốt' ? 'text-green-600' : (finalStatus.qualities.startsWith('Chờ') ? 'text-slate-500 italic' : 'text-red-600')}`}>{finalStatus.qualities}</span></p>
                                                                    </div>
                                                                    <hr className="my-3 border-slate-300"/>
                                                                    <div className="space-y-1">
                                                                        <p className="font-semibold text-slate-600">Xét lên lớp:</p> 
                                                                        <p className={`font-extrabold text-lg ${finalStatus.promotion === 'Được lên lớp' ? 'text-green-600' : (finalStatus.promotion.startsWith('Chờ') ? 'text-slate-500 italic' : 'text-red-600')}`}>{finalStatus.promotion}</p>
                                                                    </div>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GradebookReExaminationView;