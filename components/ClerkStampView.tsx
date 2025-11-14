import React from 'react';
import { CloseIcon, ChevronDownIcon } from './icons';

const tableData = [
  { 
    stt: 1, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A1' },
    subjectTeacherStatus: 'Đã ký đủ',
    homeroomTeacherStatus: 'Đã ký',
    principalStatus: 'Đã ký',
    clerkStatus: 'Chưa ký',
  },
  { 
    stt: 2, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A2' },
    subjectTeacherStatus: 'Đã ký đủ',
    homeroomTeacherStatus: 'Đã ký',
    principalStatus: 'Đã ký',
    clerkStatus: 'Chưa ký',
  },
  { 
    stt: 3, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A3' },
    subjectTeacherStatus: 'Đã ký đủ',
    homeroomTeacherStatus: 'Đã ký',
    principalStatus: 'Đã ký',
    clerkStatus: 'Chưa ký',
  },
    { 
    stt: 4, 
    info: { namHoc: '2025 - 2026', hocKy: 'Học kỳ 1', lop: '10A4' },
    subjectTeacherStatus: 'Đã ký đủ',
    homeroomTeacherStatus: 'Đã ký',
    principalStatus: 'Đã ký',
    clerkStatus: 'Chưa ký',
  },
];

const ClerkStampView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8" aria-modal="true" role="dialog">
      <div className="w-full mx-auto relative max-w-screen-xl">
        <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors shadow"
            aria-label="Đóng"
        >
            <CloseIcon className="w-6 h-6" />
        </button>

        <div className="mt-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Đóng dấu sổ theo dõi</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div>
                        <label htmlFor="school-year-cv" className="block text-sm font-medium text-slate-700 mb-1">Năm học</label>
                        <div className="relative">
                            <select id="school-year-cv" defaultValue="2025-2026" className="w-full appearance-none bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                <option>2025-2026</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="semester-cv" className="block text-sm font-medium text-slate-700 mb-1">Học kỳ</label>
                        <div className="relative">
                            <select id="semester-cv" defaultValue="Học kỳ 1" className="w-full appearance-none bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                <option>Học kỳ 1</option>
                                <option>Học kỳ 2</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none"/>
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-end items-center space-x-3">
                         <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-indigo-700 transition-colors">
                            Đóng dấu ban hành hàng loạt
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
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-xs text-white uppercase bg-blue-800">
                            <tr>
                                <th rowSpan={2} className="px-4 py-3 border border-blue-700 align-middle text-center">STT</th>
                                <th rowSpan={2} className="px-4 py-3 border border-blue-700 align-middle text-center">Thông tin sổ</th>
                                <th colSpan={3} className="px-4 py-3 border border-blue-700 text-center">Trạng thái ký</th>
                                <th rowSpan={2} className="px-4 py-3 border border-blue-700 align-middle text-center">Văn thư đóng dấu</th>
                                <th rowSpan={2} className="px-4 py-3 border border-blue-700 align-middle text-center">Thao tác</th>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 border border-blue-700 text-center">Giáo viên bộ môn</th>
                                <th className="px-4 py-2 border border-blue-700 text-center">Giáo viên chủ nhiệm</th>
                                <th className="px-4 py-2 border border-blue-700 text-center">Hiệu trưởng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={row.stt} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                                    <td className="px-4 py-3 font-bold text-slate-800 border-x border-slate-200 text-center">{row.stt}</td>
                                    <td className="px-4 py-3 border-r border-slate-200">
                                        <p>Năm học: {row.info.namHoc}</p>
                                        <p>Học kỳ: {row.info.hocKy}</p>
                                        <p>Lớp {row.info.lop}</p>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-200 text-center align-middle">
                                        <span className="font-bold text-green-600">{row.subjectTeacherStatus}</span>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-200 text-center align-middle">
                                         <span className="font-bold text-green-600">{row.homeroomTeacherStatus}</span>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-200 text-center align-middle">
                                        <span className="font-bold text-green-600">{row.principalStatus}</span>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-200 text-center align-middle">
                                        <span className="font-bold text-orange-600">{row.clerkStatus}</span>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-200 text-center align-middle">
                                        <a href="#" className="font-medium text-blue-600 hover:underline">Xem và đóng dấu</a>
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
  );
};

export default ClerkStampView;