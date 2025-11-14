import React from 'react';
import { CloseIcon } from './icons';

interface SubjectTeacher {
  stt: number;
  name: string;
  subject: string;
  status: 'Đã ký' | 'Chưa ký';
}

interface ClassInfo {
  name: string;
  teachers: SubjectTeacher[];
}

interface SubjectTeacherStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: ClassInfo | null;
}

const SubjectTeacherStatusModal: React.FC<SubjectTeacherStatusModalProps> = ({ isOpen, onClose, classInfo }) => {
  if (!isOpen || !classInfo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-slate-800">
            Danh sách giáo viên lớp {classInfo.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Đóng"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="overflow-y-auto p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-blue-800 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3 w-16 text-center">STT</th>
                  <th scope="col" className="px-4 py-3">Họ và tên</th>
                  <th scope="col" className="px-4 py-3">Tên môn</th>
                  <th scope="col" className="px-4 py-3 w-40 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {classInfo.teachers.map((teacher, index) => (
                  <tr
                    key={teacher.stt}
                    className={`border-b border-slate-200 last:border-b-0 ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800 text-center">{teacher.stt}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{teacher.name}</td>
                    <td className="px-4 py-3 text-slate-600">{teacher.subject}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`font-bold px-3 py-1 rounded-full text-xs ${
                          teacher.status === 'Đã ký' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        
        <footer className="flex justify-end p-4 border-t border-slate-200 bg-slate-50 sticky bottom-0 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-md text-sm shadow-sm hover:bg-slate-700 transition-colors"
          >
            Đóng
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SubjectTeacherStatusModal;
