import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeftIcon, ChevronDownIcon } from './icons';

// MOCK: Dữ liệu phân công của giáo viên.
const teacherAssignmentsV2 = {
  name: 'Nguyễn Vân Anh',
  homeroomClassOf: '3A1',
  assignments: [
    { class: '3A1', subject: 'Toán' },
    { class: '3A1', subject: 'Tiếng Việt' },
    { class: '3A1', subject: 'Đạo đức' },
    { class: '4A2', subject: 'Toán' },
    { class: '4A2', subject: 'Khoa học' },
    { class: '5A3', subject: 'Mĩ thuật' },
  ],
};

// --- MOCK STATUS DATA ---
// Trong thực tế, dữ liệu này sẽ được lấy từ server dựa trên bộ lọc
// Chuyển sang `let` để có thể thay đổi, mô phỏng việc lưu vào CSDL
let mockServerStatus: { [key: string]: { status: 'generated' | 'uploaded', timestamp: Date } } = {
    '2025-2026-Giữa kỳ 1-3A1-Tiếng Việt-subject': { status: 'uploaded', timestamp: new Date('2025-10-25T10:30:00') },
    '2025-2026-Giữa kỳ 1-3A1-qualities': { status: 'uploaded', timestamp: new Date('2025-10-25T11:00:00') },
    '2025-2026-Giữa kỳ 1-4A2-Toán-subject': { status: 'generated', timestamp: new Date('2025-10-26T09:00:00') },
};

type FileStatusType = 'none' | 'generated' | 'uploaded';
interface FileStatus {
    status: FileStatusType;
    timestamp: Date | null;
}

const StepIndicator: React.FC<{ number: number; title: string }> = ({ number, title }) => (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full shadow-md z-10">
            {number}
        </div>
        <h3 className="text-xl font-bold text-slate-800">{`BƯỚC ${number}: ${title}`}</h3>
    </div>
);

const ActionBlock: React.FC<{
    title: string;
    buttonText: string;
    onButtonClick: () => void;
    isDisabled?: boolean;
    note?: string;
    disabledNote?: string;
    buttonColorClass?: string;
}> = ({ title, buttonText, onButtonClick, isDisabled = false, note, disabledNote, buttonColorClass = 'bg-blue-600 hover:bg-blue-700' }) => (
    <div className={`p-5 rounded-lg border flex flex-col items-center text-center transition-all duration-300 h-full ${isDisabled ? 'bg-slate-100 border-slate-200' : 'bg-green-50/70 border-green-200'}`}>
        <div className="flex-grow">
            <h4 className="font-bold text-slate-700 text-base mb-2">{title}</h4>
            {note && <p className="text-xs text-slate-500 mb-4">{note}</p>}
        </div>
        <button
            onClick={onButtonClick}
            disabled={isDisabled}
            className={`w-full max-w-xs px-4 py-2.5 text-white font-semibold rounded-md text-sm shadow-md transition-colors duration-200 transform hover:-translate-y-px disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-slate-300 mt-auto ${buttonColorClass}`}
        >
            {buttonText}
        </button>
        {isDisabled && disabledNote && <p className="text-xs text-red-600 mt-2 font-medium">{disabledNote}</p>}
    </div>
);

const StatusDisplay: React.FC<{ statusInfo: FileStatus }> = ({ statusInfo }) => {
    const { status, timestamp } = statusInfo;
    const formattedTimestamp = timestamp ? `lúc ${timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} ${timestamp.toLocaleDateString('vi-VN')}` : '';

    if (status === 'uploaded') {
        return <p className="text-sm text-green-600 font-semibold">(Trạng thái: Đã tải lên kết quả {formattedTimestamp})</p>;
    }
    if (status === 'generated') {
        return <p className="text-sm text-blue-600 font-semibold">(Trạng thái: Đã tạo file {formattedTimestamp})</p>;
    }
    return <p className="text-sm text-slate-500 font-semibold">(Trạng thái: Chưa tạo file)</p>;
};


const BulkGradeImportExportViewV2: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    // --- STATE MANAGEMENT ---
    const [schoolYear, setSchoolYear] = useState('2025-2026');
    const [semester, setSemester] = useState('Giữa kỳ 1');
    
    const taughtClasses = useMemo(() => [...new Set(teacherAssignmentsV2.assignments.map(a => a.class))], []);
    const [selectedClass, setSelectedClass] = useState(taughtClasses[0] || '');

    const taughtSubjectsForClass = useMemo(() => 
        teacherAssignmentsV2.assignments
            .filter(a => a.class === selectedClass)
            .map(a => a.subject), 
        [selectedClass]
    );
    const [selectedSubject, setSelectedSubject] = useState(taughtSubjectsForClass[0] || '');

    const [fileStatus, setFileStatus] = useState<{ subject: FileStatus, qualities: FileStatus }>({
        subject: { status: 'none', timestamp: null },
        qualities: { status: 'none', timestamp: null },
    });


    // --- DERIVED STATE & LOGIC ---
    useEffect(() => {
        const newSubjects = teacherAssignmentsV2.assignments
            .filter(a => a.class === selectedClass)
            .map(a => a.subject);
        setSelectedSubject(newSubjects[0] || '');
    }, [selectedClass]);
    
    // Simulate fetching status from server when filters change
    useEffect(() => {
        const subjectKey = `${schoolYear}-${semester}-${selectedClass}-${selectedSubject}-subject`;
        const qualitiesKey = `${schoolYear}-${semester}-${selectedClass}-qualities`;

        const subjectStatusData = mockServerStatus[subjectKey];
        const qualitiesStatusData = mockServerStatus[qualitiesKey];

        setFileStatus({
            subject: subjectStatusData ? { ...subjectStatusData } : { status: 'none', timestamp: null },
            qualities: qualitiesStatusData ? { ...qualitiesStatusData } : { status: 'none', timestamp: null },
        });
    }, [schoolYear, semester, selectedClass, selectedSubject]);


    const isHomeroomTeacher = teacherAssignmentsV2.homeroomClassOf === selectedClass;

    const handleCreateFile = (type: 'subject' | 'qualities') => {
        const performCreation = (isNew: boolean) => {
            const newStatus = { status: 'generated' as const, timestamp: new Date() };
            
            const key = type === 'subject'
                ? `${schoolYear}-${semester}-${selectedClass}-${selectedSubject}-subject`
                : `${schoolYear}-${semester}-${selectedClass}-qualities`;
            
            // Update mock server to persist state
            mockServerStatus[key] = newStatus;
            
            // Update component state to trigger re-render
            setFileStatus(prev => ({ ...prev, [type]: newStatus }));

            const alertMessage = isNew
                ? `Đã tạo file mẫu cho "${type === 'subject' ? 'Môn học' : 'Phẩm chất & Năng lực'}"! Vui lòng chuyển đến Bước 3 để tải xuống.`
                : `Đã tạo file mẫu mới cho "${type === 'subject' ? 'Môn học' : 'Phẩm chất & Năng lực'}"! Vui lòng chuyển đến Bước 3 để tải xuống.`;
            
            alert(alertMessage);
        };

        if (fileStatus[type].status !== 'none') {
            const confirmation = window.confirm(
                'File đã tồn tại. Hành động này sẽ tạo một file mẫu mới và ghi đè lên các thay đổi chưa được lưu hoặc file đã tải lên trước đó. Bạn có chắc chắn muốn tiếp tục không?'
            );
            if (confirmation) {
                performCreation(false); // Not new, it's a re-creation
            }
        } else {
            performCreation(true); // It's a new creation
        }
    };

    const handleUploadFile = (type: 'subject' | 'qualities') => {
        const newStatus = { status: 'uploaded' as const, timestamp: new Date() };

        const key = type === 'subject'
            ? `${schoolYear}-${semester}-${selectedClass}-${selectedSubject}-subject`
            : `${schoolYear}-${semester}-${selectedClass}-qualities`;
        
        // Update mock server
        mockServerStatus[key] = newStatus;

        // Update component state
        setFileStatus(prev => ({ ...prev, [type]: newStatus }));
        alert(`Đã tải lên thành công file kết quả cho "${type === 'subject' ? 'Môn học' : 'Phẩm chất & Năng lực'}"!`);
    };
    
    return (
        <div className="fixed inset-0 z-50 bg-[#f1f5f9] font-sans overflow-y-auto" aria-modal="true" role="dialog">
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-screen-lg">
                    <div className="relative text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800">NHẬP/XUẤT ĐIỂM HÀNG LOẠT</h1>
                         <button
                            onClick={onClose}
                            className="absolute top-0 right-0 flex items-center space-x-2 bg-white text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all duration-200 shadow-md border border-slate-200"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            <span>Quay lại bài trình bày</span>
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <p className="text-base font-semibold text-slate-700">
                            GIÁO VIÊN: <span className="font-bold text-lg text-blue-800">{teacherAssignmentsV2.name.toUpperCase()}</span>
                        </p>
                         {teacherAssignmentsV2.homeroomClassOf && <p className="text-base font-semibold text-slate-700">
                            Chủ nhiệm lớp: <span className="font-bold text-lg text-slate-800">{teacherAssignmentsV2.homeroomClassOf}</span>
                        </p>}
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-slate-200/80 p-6 sm:p-8">
                        <div className="relative space-y-10">
                             <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" aria-hidden="true"></div>

                            {/* --- STEP 1 --- */}
                            <div className="relative">
                                <StepIndicator number={1} title="CHỌN BỘ LỌC" />
                                <div className="ml-16 mt-4 pl-4 border-l-2 border-slate-200">
                                    <div className="p-4 bg-slate-50 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                                            {[
                                                { label: "Năm học", value: schoolYear, setter: setSchoolYear, options: ['2025-2026', '2024-2025'] },
                                                { label: "Học kỳ", value: semester, setter: setSemester, options: ['Giữa kỳ 1', 'Cuối kỳ 1', 'Giữa kỳ 2', 'Cuối năm'] },
                                                { label: "Lớp", value: selectedClass, setter: setSelectedClass, options: taughtClasses },
                                                { label: "Môn học", value: selectedSubject, setter: setSelectedSubject, options: taughtSubjectsForClass },
                                            ].map(filter => (
                                                <div key={filter.label}>
                                                    <label className="block text-sm font-medium text-slate-600 mb-1">{filter.label}</label>
                                                    <div className="relative">
                                                        <select
                                                            value={filter.value}
                                                            onChange={(e) => filter.setter(e.target.value)}
                                                            className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 pr-8"
                                                            disabled={filter.options.length === 0}
                                                        >
                                                            {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                        </select>
                                                        <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-red-600 text-sm mt-3 text-center font-semibold">
                                            Lưu ý: Thầy Cô nhớ chọn đúng môn học. Tránh cập nhật nhầm.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* --- STEP 2 --- */}
                            <div className="relative">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full shadow-md z-10">2</div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-slate-800">BƯỚC 2: TẠO FILE NHẬP LIỆU</h3>
                                        <StatusDisplay statusInfo={fileStatus.subject} />
                                    </div>
                                </div>
                                <div className="ml-16 mt-4 pl-4 border-l-2 border-slate-200 space-y-4">
                                     <p className="text-red-600 text-justify text-sm italic">
                                        Hệ thống sẽ tạo ra file Excel có sẵn danh sách học sinh và cấu trúc cột điểm phù hợp với bộ lọc đã chọn. Nếu file đã tồn tại, hành động này sẽ tạo một file mẫu mới để thay thế.
                                     </p>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <ActionBlock 
                                            title="Cập nhật kết quả môn học"
                                            buttonText={fileStatus.subject.status === 'none' ? 'Tạo file' : 'Tạo lại file (ghi đè)'}
                                            buttonColorClass={fileStatus.subject.status === 'none' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600'}
                                            onButtonClick={() => handleCreateFile('subject')}
                                         />
                                         <ActionBlock 
                                            title="Cập nhật phẩm chất chủ yếu, Năng lực cốt lõi"
                                            buttonText={fileStatus.qualities.status === 'none' ? 'Tạo file' : 'Tạo lại file (ghi đè)'}
                                            buttonColorClass={fileStatus.qualities.status === 'none' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600'}
                                            onButtonClick={() => handleCreateFile('qualities')}
                                            isDisabled={!isHomeroomTeacher}
                                            note="(Chỉ dành cho giáo viên chủ nhiệm)"
                                            disabledNote="Bạn không phải là GVCN của lớp này."
                                         />
                                     </div>
                                </div>
                            </div>
                            
                            {/* --- STEP 3 --- */}
                            <div className="relative">
                                 <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full shadow-md z-10">3</div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-slate-800">BƯỚC 3: TẢI XUỐNG FILE NHẬP LIỆU</h3>
                                        <StatusDisplay statusInfo={fileStatus.subject} />
                                    </div>
                                </div>
                                <div className="ml-16 mt-4 pl-4 border-l-2 border-slate-200 space-y-4">
                                    <p className="text-red-600 text-justify text-sm italic">
                                        Thầy Cô tải xuống file đã được tạo ở bước 2. Sau đó, tiến hành nhập kết quả đánh giá giáo dục của học sinh. Nếu cần sửa lỗi, Thầy Cô có thể tải lại file này bất cứ lúc nào.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ActionBlock 
                                            title="Cập nhật kết quả môn học"
                                            buttonText="Tải xuống file"
                                            onButtonClick={() => alert("Đang tải xuống file môn học...")}
                                            isDisabled={fileStatus.subject.status === 'none'}
                                            disabledNote="Vui lòng tạo file ở Bước 2 trước."
                                        />
                                        <ActionBlock 
                                            title="Cập nhật phẩm chất chủ yếu, Năng lực cốt lõi"
                                            buttonText="Tải xuống file"
                                            onButtonClick={() => alert("Đang tải xuống file phẩm chất & năng lực...")}
                                            isDisabled={fileStatus.qualities.status === 'none' || !isHomeroomTeacher}
                                            disabledNote={!isHomeroomTeacher ? "Chức năng dành cho GVCN." : "Vui lòng tạo file ở Bước 2 trước."}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- STEP 4 --- */}
                             <div className="relative">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full shadow-md z-10">4</div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-slate-800">BƯỚC 4: TẢI FILE KẾT QUẢ CUỐI CÙNG LÊN HỆ THỐNG</h3>
                                        <StatusDisplay statusInfo={fileStatus.subject} />
                                    </div>
                                </div>
                                <div className="ml-16 mt-4 pl-4 border-l-2 border-slate-200 space-y-4">
                                    <p className="text-red-600 text-justify text-sm italic">
                                        Sau khi cập nhật xong file dữ liệu, Thầy Cô tiến hành tải file này lên hệ thống. Thầy Cô có thể tải lên file mới để cập nhật lại dữ liệu đã có.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ActionBlock 
                                            title="Cập nhật kết quả môn học"
                                            buttonText="Tải file lên"
                                            onButtonClick={() => handleUploadFile('subject')}
                                        />
                                        <ActionBlock 
                                            title="Cập nhật phẩm chất chủ yếu, Năng lực cốt lõi"
                                            buttonText="Tải file lên"
                                            onButtonClick={() => handleUploadFile('qualities')}
                                            isDisabled={!isHomeroomTeacher}
                                            disabledNote="Bạn không phải là GVCN của lớp này."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkGradeImportExportViewV2;