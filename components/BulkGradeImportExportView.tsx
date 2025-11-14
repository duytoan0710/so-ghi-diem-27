import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, ChevronDownIcon } from './icons';

// MOCK: Dữ liệu phân công của giáo viên. Trong ứng dụng thực tế, dữ liệu này sẽ được lấy từ API sau khi đăng nhập.
const teacherAssignments = {
  homeroomClassOf: '3A1', // Giáo viên này chủ nhiệm lớp 3A1
  // Danh sách các lớp và môn giáo viên này dạy
  teachingAssignments: [
    { class: '3A1', subject: 'Toán', grade: 3 },
    { class: '3A1', subject: 'Tiếng Việt', grade: 3 },
    { class: '3A1', subject: 'Đạo đức', grade: 3 },
    { class: '3A1', subject: 'Tự nhiên và Xã hội', grade: 3 },
    { class: '3A1', subject: 'Tin học và Công nghệ', grade: 3 },
    { class: '3A1', subject: 'Âm nhạc', grade: 3 },
    { class: '4A2', subject: 'Toán', grade: 4 },
    { class: '4A2', subject: 'Khoa học', grade: 4 },
  ],
};


// Cấu trúc dữ liệu cho các khối lớp, bổ sung thuộc tính `grades` để kiểm tra phân công
const gradeGroups = [
  {
    id: 'grades-1-2',
    title: 'LỚP 1, 2',
    grades: [1, 2],
    periods: [
      { id: 'mid-term-1', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 1', displayName: 'Giữa kỳ 1' },
      { id: 'end-term-1', name: 'ĐÁNH GIÁ CUỐI HỌC KỲ 1', displayName: 'Cuối học kỳ 1' },
      { id: 'mid-term-2', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 2', displayName: 'Giữa kỳ 2' },
      { id: 'end-year', name: 'ĐÁNH GIÁ CUỐI NĂM HỌC', displayName: 'Cuối năm học' },
    ],
  },
  {
    id: 'grades-3',
    title: 'LỚP 3',
    grades: [3],
    periods: [
      { id: 'mid-term-1', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 1', displayName: 'Giữa kỳ 1' },
      { id: 'end-term-1', name: 'ĐÁNH GIÁ CUỐI HỌC KỲ 1', displayName: 'Cuối học kỳ 1' },
      { id: 'mid-term-2', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 2', displayName: 'Giữa kỳ 2' },
      { id: 'end-year', name: 'ĐÁNH GIÁ CUỐI NĂM HỌC', displayName: 'Cuối năm học' },
    ],
  },
  {
    id: 'grades-4-5',
    title: 'LỚP 4, 5',
    grades: [4, 5],
    periods: [
      { id: 'mid-term-1', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 1', displayName: 'Giữa kỳ 1' },
      { id: 'end-term-1', name: 'ĐÁNH GIÁ CUỐI HỌC KỲ 1', displayName: 'Cuối học kỳ 1' },
      { id: 'mid-term-2', name: 'ĐÁNH GIÁ GIỮA HỌC KỲ 2', displayName: 'Giữa kỳ 2' },
      { id: 'end-year', name: 'ĐÁNH GIÁ CUỐI NĂM HỌC', displayName: 'Cuối năm học' },
    ],
  },
];

const BulkGradeImportExportView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Lấy danh sách các khối lớp mà giáo viên dạy từ phân công
  const taughtGrades = [...new Set(teacherAssignments.teachingAssignments.map(a => a.grade))];
  
  // Tự động tìm khối lớp đầu tiên giáo viên được phân công để làm tab mặc định
  const firstAssignedGroup = gradeGroups.find(group => 
    group.grades.some(grade => taughtGrades.includes(grade))
  );

  const [activeTab, setActiveTab] = useState(firstAssignedGroup ? firstAssignedGroup.id : '');
  const [schoolYear, setSchoolYear] = useState('2025-2026');

  // New states for separate class and subject dropdowns
  const taughtClasses = useMemo(() => [...new Set(teacherAssignments.teachingAssignments.map(a => a.class))], []);
  const [selectedClass, setSelectedClass] = useState(taughtClasses[0] || '');
  
  const isHomeroomForSelectedClass = useMemo(() => teacherAssignments.homeroomClassOf === selectedClass, [selectedClass]);

  const taughtSubjectsForClass = useMemo(() => {
    const subjects = teacherAssignments.teachingAssignments
      .filter(a => a.class === selectedClass)
      .map(a => a.subject);
    
    // GVCN có thể xuất/nhập cho tất cả môn
    if (isHomeroomForSelectedClass) {
        return ['Tất cả môn', ...subjects];
    }
    
    return subjects;
  }, [selectedClass, isHomeroomForSelectedClass]);
  
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const [selectedPeriodId, setSelectedPeriodId] = useState('mid-term-1');

  // Update subject list when class changes
  useEffect(() => {
    if (isHomeroomForSelectedClass) {
        setSelectedSubject('Tất cả môn');
    } else {
        const subjectsForClass = teacherAssignments.teachingAssignments
            .filter(a => a.class === selectedClass)
            .map(a => a.subject);
        setSelectedSubject(subjectsForClass[0] || '');
    }
  }, [selectedClass, isHomeroomForSelectedClass]);

  // Đồng bộ tab khối lớp với lớp được chọn trong dropdown
  useEffect(() => {
    if (!selectedClass) return;

    // Tìm phân công tương ứng để lấy ra khối lớp (grade)
    const assignment = teacherAssignments.teachingAssignments.find(
      a => a.class === selectedClass
    );

    if (assignment) {
      // Tìm nhóm khối (tab) tương ứng với khối lớp của phân công
      const targetGroup = gradeGroups.find(group => 
        group.grades.includes(assignment.grade)
      );
      
      // Kích hoạt tab tìm được
      if (targetGroup) {
        setActiveTab(targetGroup.id);
      }
    }
  }, [selectedClass]);


  const handleFileImport = (periodName: string) => {
    alert(`Chức năng nhập file cho "${periodName}" đang được phát triển.`);
  };

  const handleFileExport = (periodName: string) => {
    alert(`Chức năng xuất file cho "${periodName}" đang được phát triển.`);
  };

  const periodOptions = gradeGroups[0]?.periods || [];

  return (
    <div className="fixed inset-0 z-50 bg-[#f1f5f9] font-sans overflow-y-auto" aria-modal="true" role="dialog">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="w-full max-w-screen-xl">
          {/* Header */}
          <div className="relative text-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">NHẬP/XUẤT ĐIỂM HÀNG LOẠT</h1>
            <p className="text-red-600 mt-2">Công cụ giúp giáo viên nhập kết quả đánh giá giáo dục nhanh chóng từ file Excel.</p>
            <button
              onClick={onClose}
              className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center space-x-2 bg-white text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all duration-200 shadow-md border border-slate-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Quay lại bài trình bày</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200/80">
            {/* Filters */}
            <div className="p-6 flex flex-col items-center space-y-4">
                {/* Teacher info */}
                <div className="text-center space-y-1">
                    <div className="flex items-baseline space-x-2 justify-center">
                        <span className="text-sm font-bold text-slate-700">Giáo viên:</span>
                        <span className="font-bold text-lg text-blue-800">Nguyễn Vân Anh</span>
                    </div>
                    {isHomeroomForSelectedClass && (
                         <div className="flex items-baseline space-x-2 justify-center">
                            <span className="text-sm font-bold text-slate-700">Chủ nhiệm lớp:</span>
                            <span className="font-bold text-base text-slate-800">{selectedClass}</span>
                        </div>
                    )}
                </div>

                {/* Filter controls */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                    {/* Năm học filter */}
                    <div className="flex items-center space-x-3">
                        <label htmlFor="school-year" className="text-sm font-semibold text-slate-700 whitespace-nowrap">Năm học</label>
                        <div className="relative">
                            <select
                                id="school-year"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                                className="w-48 appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
                            >
                                <option>2025-2026</option>
                                <option>2024-2025</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                    {/* Lớp filter */}
                    <div className="flex items-center space-x-3">
                        <label htmlFor="class-select" className="text-sm font-semibold text-slate-700 whitespace-nowrap">Lớp</label>
                        <div className="relative">
                            <select
                                id="class-select"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-28 appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
                            >
                                {taughtClasses.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                    {/* Môn filter */}
                     <div className="flex items-center space-x-3">
                        <label htmlFor="subject-select" className="text-sm font-semibold text-slate-700 whitespace-nowrap">Môn</label>
                        <div className="relative">
                            <select
                                id="subject-select"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-48 appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
                                disabled={taughtSubjectsForClass.length === 0}
                            >
                                {taughtSubjectsForClass.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                     {/* Semester filter */}
                    <div className="flex items-center space-x-3">
                        <label htmlFor="period-select" className="text-sm font-semibold text-slate-700 whitespace-nowrap">Học kỳ</label>
                        <div className="relative">
                            <select
                                id="period-select"
                                value={selectedPeriodId}
                                onChange={(e) => setSelectedPeriodId(e.target.value)}
                                className="w-48 appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
                            >
                                {periodOptions.map((period) => (
                                    <option key={period.id} value={period.id}>{period.displayName}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-2 pb-4 border-t border-slate-200">
                <nav className="flex justify-start space-x-2 bg-blue-200 p-1.5 rounded-xl items-start" aria-label="Tabs">
                  {gradeGroups.map((group) => {
                    const isAssignedToGroup = group.grades.some(grade => taughtGrades.includes(grade));
                    return (
                        <div key={group.id} className="flex-1 text-center">
                            <button
                              onClick={() => isAssignedToGroup && setActiveTab(group.id)}
                              disabled={!isAssignedToGroup}
                              className={`w-full whitespace-nowrap py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 text-center border ${
                                activeTab === group.id
                                  ? 'bg-blue-600 text-white shadow-lg border-transparent'
                                  : 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-white hover:shadow-sm'
                              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-50 disabled:hover:shadow-none disabled:border-slate-300 disabled:text-slate-500`}
                            >
                              {group.title}
                            </button>
                            {!isAssignedToGroup && (
                                <p className="text-xs text-red-600 mt-1 font-semibold">Thầy/Cô không phụ trách khối này.</p>
                            )}
                        </div>
                    );
                  })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 pt-2">
              {activeTab ? (
                gradeGroups.map((group) => {
                  const activePeriod = group.periods.find(p => p.id === selectedPeriodId);
                  return (
                    <div key={group.id} className={activeTab === group.id ? 'block' : 'hidden'}>
                      {activePeriod ? (
                        <div className="p-5 bg-slate-50 rounded-xl border-2 border-indigo-200 shadow-md">
                          <h3 className="text-lg font-bold text-slate-800 text-center mb-4 uppercase">{activePeriod.name}</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Block 1: Subjects */}
                            <div className="p-4 bg-white rounded-lg border border-slate-300 flex flex-col text-center justify-between shadow-sm">
                              <div>
                                <h4 className="font-semibold text-slate-600">Cập nhật kết quả môn học</h4>
                                <p className="text-xs text-slate-500 mb-3">(Dành cho giáo viên bộ môn hoặc GVCN)</p>
                              </div>
                              <div className="flex items-center justify-center space-x-3 flex-shrink-0 mt-2">
                                <button
                                  onClick={() => handleFileExport(`${activePeriod.name} - Môn học`)}
                                  className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-teal-600 transition-colors duration-200 transform hover:-translate-y-px"
                                >
                                  Xuất file nhập liệu
                                </button>
                                <button
                                  onClick={() => handleFileImport(`${activePeriod.name} - Môn học`)}
                                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700 transition-colors duration-200 transform hover:-translate-y-px"
                                >
                                  Nhập file lên hệ thống
                                </button>
                              </div>
                               {selectedSubject === 'Tất cả môn' ? (
                                <p className="text-sm text-red-600 font-medium mt-4">
                                  Thầy/Cô sẽ xuất/nhập file chứa tất cả các môn học của lớp {selectedClass}.
                                </p>
                               ) : (
                                <p className="text-sm text-red-600 font-medium mt-4">
                                  Lưu ý: Thầy Cô nhớ chọn đúng môn học. Tránh cập nhật nhầm.
                                </p>
                               )}
                            </div>

                            {/* Block 2: Qualities/Competencies */}
                            <div className="p-4 bg-white rounded-lg border border-slate-300 flex flex-col text-center justify-between shadow-sm">
                              <div>
                                <h4 className="font-semibold text-slate-600">Cập nhật phẩm chất chủ yếu, năng lực cốt lõi</h4>
                                {!isHomeroomForSelectedClass ? (
                                    <p className="text-xs text-amber-700 mt-1 mb-2">(Chức năng này chỉ dành cho giáo viên chủ nhiệm)</p>
                                ) : (
                                    <p className="text-xs text-slate-500 mb-3">(Dành cho giáo viên chủ nhiệm)</p>
                                )}
                              </div>
                              <div className="flex items-center justify-center space-x-3 flex-shrink-0 mt-2">
                                <button
                                  onClick={() => handleFileExport(`${activePeriod.name} - Phẩm chất, Năng lực`)}
                                  disabled={!isHomeroomForSelectedClass}
                                  className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-teal-600 transition-colors duration-200 transform hover:-translate-y-px disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-slate-300"
                                >
                                  Xuất file nhập liệu
                                </button>
                                <button
                                  onClick={() => handleFileImport(`${activePeriod.name} - Phẩm chất, Năng lực`)}
                                  disabled={!isHomeroomForSelectedClass}
                                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-blue-700 transition-colors duration-200 transform hover:-translate-y-px disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-slate-300"
                                >
                                  Nhập file lên hệ thống
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-10 bg-slate-100 rounded-lg">
                          <p className="text-slate-500 font-semibold">Vui lòng chọn một kỳ đánh giá hợp lệ.</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-10 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
                    <p className="text-slate-500 font-semibold text-base">Giáo viên không được phân công giảng dạy tại bất kỳ lớp nào.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkGradeImportExportView;