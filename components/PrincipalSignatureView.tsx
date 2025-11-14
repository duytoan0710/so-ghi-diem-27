import React, { useState, useEffect } from 'react';
import { CloseIcon, ChevronDownIcon } from './icons';
import SubjectTeacherStatusModal from './SubjectTeacherStatusModal';

// --- Mock Data ---

interface SubjectTeacher {
  stt: number;
  name: string;
  subject: string;
  status: 'Đã ký' | 'Chưa ký';
}

const teacherListTemplate: Omit<SubjectTeacher, 'stt' | 'status'>[] = [
  { name: 'NGUYỄN THỊ VÂN', subject: 'Ngữ văn' },
  { name: 'NGUYỄN THỊ AN', subject: 'Toán' },
  { name: 'PHẠM LÊ QUỐC BẢO', subject: 'Giáo dục kinh tế và pháp luật' },
  { name: 'LÊ QUAN BÌNH', subject: 'Lịch sử' },
  { name: 'PHẠM VĂN CƯ', subject: 'Địa lí' },
  { name: 'HO THỊ THU CÚC', subject: 'Vật lí' },
  { name: 'NGUYỄN MINH ĐỨC', subject: 'Hóa học' },
  { name: 'HỒ THỊ PHƯƠNG DUNG', subject: 'Sinh học' },
  { name: 'VÕ TRƯỜNG GIANG', subject: 'Công nghệ' },
  { name: 'KHUẤT THỊ HÀ (GVCN)', subject: 'Tin học' },
  { name: 'PHẠM THỊ THANH HẰNG', subject: 'Âm nhạc' },
  { name: 'HỒ TRUNG HẬU', subject: 'Mĩ thuật' },
  { name: 'LÊ THANH HOA', subject: 'Giáo dục thể chất' },
  { name: 'PHẠM THỊ HOÀN', subject: 'HĐTN/GDĐP' },
  { name: 'NGUYỄN VĂN HÙNG', subject: 'Tiếng anh' },
  { name: 'NGÔ TẤN HƯNG', subject: 'Giáo dục quốc phòng và an ninh' },
];

// FIX: Added `as const` to the `status` property for array literals
// containing mixed statuses ('Đã ký' and 'Chưa ký'). This is necessary to
// prevent TypeScript from widening the type of `status` to `string`, which
// would cause a type mismatch with the `SubjectTeacher` interface. This
// issue occurs in the definitions for '10A4', '10A6', and '10A8'.
const teacherSignatureData: Record<string, SubjectTeacher[]> = {
  '10A1': teacherListTemplate.map((teacher, index) => ({ ...teacher, stt: index + 1, status: 'Đã ký' })),
  '10A2': teacherListTemplate.map((teacher, index) => ({ ...teacher, stt: index + 1, status: 'Chưa ký' })),
  '10A3': teacherListTemplate.map((teacher, index) => ({ ...teacher, stt: index + 1, status: 'Chưa ký' })),
  '10A4': [
    ...teacherListTemplate.slice(0, 8).map((teacher, index) => ({ ...teacher, stt: index + 1, status: 'Đã ký' as const })),
    ...teacherListTemplate.slice(8).map((teacher, index) => ({ ...teacher, stt: index + 9, status: 'Chưa ký' as const }))
  ],
  '10A5': teacherListTemplate.map((teacher, index) => ({...teacher, stt: index + 1, status: 'Đã ký'})),
  '10A6': [
    { ...teacherListTemplate[0], stt: 1, status: 'Đã ký' as const },
    ...teacherListTemplate.slice(1).map((teacher, index) => ({ ...teacher, stt: index + 2, status: 'Chưa ký' as const }))
  ],
  '10A7': teacherListTemplate.map((teacher, index) => ({...teacher, stt: index + 1, status: 'Đã ký'})),
  '10A8': [
    ...teacherListTemplate.slice(0, 13).map((teacher, index) => ({ ...teacher, stt: index + 1, status: 'Đã ký' as const })),
    ...teacherListTemplate.slice(13).map((teacher, index) => ({ ...teacher, stt: index + 14, status: 'Chưa ký' as const }))
  ],
  '10A9': teacherListTemplate.map((teacher, index) => ({...teacher, stt: index + 1, status: 'Đã ký'})),
};


const tableData = [
  { 
    stt: 1, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A1' },
    subjectTeacher: { statusText: '(Đã ký đủ)', statusColor: 'text-green-600' },
    homeroomTeacher: { name: 'KHUẤT THỊ HÀ', status: 'Đã ký', statusColor: 'text-green-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 2, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A2' },
    subjectTeacher: { statusText: '(Còn 16 giáo viên chưa ký)', statusColor: 'text-red-600' },
    homeroomTeacher: { name: 'PHẠM THỊ THANH HẰNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 3, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A3' },
    subjectTeacher: { statusText: '(Còn 16 giáo viên chưa ký)', statusColor: 'text-red-600' },
    homeroomTeacher: { name: 'HỒ TRUNG HẬU', status: 'Chưa ký', statusColor: 'text-orange-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
    { 
    stt: 4, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A4' },
    subjectTeacher: { statusText: '(Còn 8 giáo viên chưa ký)', statusColor: 'text-red-600' },
    homeroomTeacher: { name: 'LÊ THỊ BÍCH', status: 'Đã ký', statusColor: 'text-green-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 5, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A5' },
    subjectTeacher: { statusText: '(Đã ký đủ)', statusColor: 'text-green-600' },
    homeroomTeacher: { name: 'TRẦN VĂN NAM', status: 'Đã ký', statusColor: 'text-green-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Đã ký', statusColor: 'text-green-600' },
    overallStatus: 'Đã ký đủ'
  },
  { 
    stt: 6, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A6' },
    subjectTeacher: { statusText: '(Còn 16 giáo viên chưa ký)', statusColor: 'text-red-600' },
    homeroomTeacher: { name: 'VŨ THỊ HƯƠNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 7, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A7' },
    subjectTeacher: { statusText: '(Đã ký đủ)', statusColor: 'text-green-600' },
    homeroomTeacher: { name: 'HOÀNG THỊ LAN', status: 'Chưa ký', statusColor: 'text-orange-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 8, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A8' },
    subjectTeacher: { statusText: '(Còn 3 giáo viên chưa ký)', statusColor: 'text-red-600' },
    homeroomTeacher: { name: 'NGÔ BẢO CHÂU', status: 'Đã ký', statusColor: 'text-green-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
  { 
    stt: 9, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A9' },
    subjectTeacher: { statusText: '(Đã ký đủ)', statusColor: 'text-green-600' },
    homeroomTeacher: { name: 'PHẠM NHẬT VƯỢNG', status: 'Đã ký', statusColor: 'text-green-600' },
    principal: { name: 'TRẦN HOÀNG', status: 'Chưa ký', statusColor: 'text-orange-600' },
    overallStatus: 'Chưa ký đủ'
  },
];

const PrincipalSignatureView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassInfo, setSelectedClassInfo] = useState<{ name: string; teachers: SubjectTeacher[] } | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleViewTeachersClick = (className: string) => {
    const teachers = teacherSignatureData[className] || [];
    setSelectedClassInfo({ name: className, teachers });
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8" aria-modal="true" role="dialog">
        <div className="w-full mx-auto relative max-w-screen-2xl">
          <button
              onClick={onClose}
              className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors shadow"
              aria-label="Đóng"
          >
              <CloseIcon className="w-6 h-6" />
          </button>

          <div className="mt-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">BGH ký số sổ theo dõi</h1>
              
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                      <div>
                          <label htmlFor="school-year-pv" className="block text-sm font-medium text-slate-700 mb-1">Năm học</label>
                          <div className="relative">
                              <select id="school-year-pv" defaultValue="2025-2026" className="w-full appearance-none bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                  <option>2025-2026</option>
                                  <option>2024-2025</option>
                              </select>
                              <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none"/>
                          </div>
                      </div>
                      <div>
                          <label htmlFor="semester-pv" className="block text-sm font-medium text-slate-700 mb-1">Học kỳ</label>
                          <div className="relative">
                              <select id="semester-pv" defaultValue="Học kỳ 1" className="w-full appearance-none bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                  <option>Học kỳ 1</option>
                                  <option>Học kỳ 2</option>
                              </select>
                              <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none"/>
                          </div>
                      </div>
                      <div className="lg:col-span-2 flex justify-end items-center space-x-3">
                          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700 transition-colors">
                              Ký số hàng loạt
                          </button>
                          <button className="flex items-center justify-center px-4 py-2 bg-teal-500 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-teal-600 transition-colors">
                              Tìm kiếm
                          </button>
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <span>Xem</span>
                          <select className="px-2 py-1 border border-slate-300 rounded-md bg-white">
                              <option>25</option>
                              <option>50</option>
                              <option>100</option>
                          </select>
                          <span>dòng</span>
                      </div>
                      <div className="text-sm text-slate-600">
                          Đang xem 1 đến {tableData.length} trong tổng số {tableData.length} dòng
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                          <button className="px-3 py-1 text-slate-500 rounded-md">Trước</button>
                          <button className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-md shadow-sm">1</button>
                          <button className="px-3 py-1 text-slate-500 rounded-md">Tiếp</button>
                      </div>
                  </div>

                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                          <thead className="text-xs text-white uppercase bg-blue-600">
                              <tr>
                                  <th rowSpan={2} className="px-4 py-3 border-r border-blue-500 align-middle text-center">STT</th>
                                  <th rowSpan={2} className="px-4 py-3 border-r border-blue-500 align-middle text-center">Thông tin sổ</th>
                                  <th colSpan={3} className="px-4 py-3 border-r border-blue-500 text-center">Trạng thái ký</th>
                                  <th rowSpan={2} className="px-4 py-3 border-r border-blue-500 align-middle text-center">Trạng thái</th>
                                  <th rowSpan={2} className="px-4 py-3 align-middle text-center">Thao tác</th>
                              </tr>
                              <tr>
                                  <th className="px-4 py-2 border-r border-t border-blue-500 text-center">Giáo viên bộ môn</th>
                                  <th className="px-4 py-2 border-r border-t border-blue-500 text-center">Giáo viên chủ nhiệm</th>
                                  <th className="px-4 py-2 border-r border-t border-blue-500 text-center">Hiệu trưởng</th>
                              </tr>
                          </thead>
                          <tbody>
                              {tableData.map((row, index) => (
                                  <tr key={row.stt} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                                      <td className="px-4 py-3 font-bold text-slate-800 border-r text-center">{row.stt}</td>
                                      <td className="px-4 py-3 border-r">
                                          <p>Năm học: {row.info.namHoc}</p>
                                          <p>Học kỳ: {row.info.hocKy}</p>
                                          <p>Lớp {row.info.lop}</p>
                                      </td>
                                      <td className="px-2 py-1 border-r text-center align-middle">
                                          <button
                                              onClick={() => handleViewTeachersClick(row.info.lop)}
                                              className="font-medium text-blue-600 hover:underline text-center w-full p-2 rounded-md hover:bg-blue-100 transition-colors"
                                          >
                                              <span className="block">Xem danh sách</span>
                                              <span className={`font-bold ${row.subjectTeacher.statusColor}`}>{row.subjectTeacher.statusText}</span>
                                          </button>
                                      </td>
                                      <td className="px-4 py-3 border-r text-center align-middle">
                                          <p className="font-semibold text-blue-800">{row.homeroomTeacher.name}</p>
                                          <p className={`font-bold ${row.homeroomTeacher.statusColor}`}>{row.homeroomTeacher.status}</p>
                                      </td>
                                      <td className="px-4 py-3 border-r text-center align-middle">
                                          <p className="font-semibold text-blue-800">{row.principal.name}</p>
                                          <p className={`font-bold ${row.principal.statusColor}`}>{row.principal.status}</p>
                                      </td>
                                      <td className="px-4 py-3 border-r text-center align-middle">
                                          <p className={`font-bold ${row.overallStatus === 'Đã ký đủ' ? 'text-green-600' : 'text-orange-600'}`}>{row.overallStatus}</p>
                                      </td>
                                      <td className="px-4 py-3 text-center align-middle">
                                          <a href="#" className="font-medium text-blue-600 hover:underline">Xem và ký sổ</a>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <SubjectTeacherStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classInfo={selectedClassInfo}
      />
    </>
  );
};

export default PrincipalSignatureView;