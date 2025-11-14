import type { StepData } from './types';

export const PRESENTATION_DATA: StepData[] = [
  {
    menuTitle: {
      main: "Thông tư 27",
      sub: ""
    },
    contentTitle: "Tổng quan quy trình đánh giá theo Thông tư 27",
    subsections: [
      {
        title: "MỘT SỐ NỘI DUNG QUAN TRỌNG TRONG THÔNG TƯ 27",
        description: `
<div class="space-y-12 text-slate-700">
  <!-- Section 1: Interactive Evaluation Process Quick Reference -->
  <div id="evaluation-tabs-container" class="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200/80">
    <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-4 text-center">BẢNG TRA CỨU</h2>
    <div class="mb-4">
      <nav class="flex justify-center space-x-2 bg-slate-100 p-1.5 rounded-xl" aria-label="Tabs">
        <button data-tab="1-2" class="whitespace-nowrap py-2 px-5 rounded-lg font-semibold text-base transition-all duration-200 bg-white text-blue-600 shadow-md">
          Lớp 1-2
        </button>
        <button data-tab="3" class="whitespace-nowrap py-2 px-5 rounded-lg font-medium text-base transition-all duration-200 text-slate-500 hover:bg-white/70 hover:text-slate-800">
          Lớp 3
        </button>
        <button data-tab="4-5" class="whitespace-nowrap py-2 px-5 rounded-lg font-medium text-base transition-all duration-200 text-slate-500 hover:bg-white/70 hover:text-slate-800">
          Lớp 4-5
        </button>
      </nav>
    </div>
    <div class="mt-5 text-sm">
      <div data-tab-content="1-2" class="">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 border border-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-1/5 border-r border-slate-200">Nhóm Đánh Giá</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-2/5 border-r border-slate-200">Nội Dung Cụ Thể</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">GIỮA HỌC KỲ<br>(I, II)</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">CUỐI KỲ I</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider">CUỐI<br>NĂM HỌC</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr>
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="8">Môn học & HĐGD</td>
                <td class="px-4 py-3 border-r border-slate-200">Tiếng Việt</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Toán</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Ngoại ngữ 1</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Tự nhiên và Xã hội</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Đạo đức</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Giáo dục thể chất</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Nghệ thuật (Âm nhạc, Mĩ thuật)</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Hoạt động trải nghiệm</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200">Phẩm chất chủ yếu</td>
                <td class="px-4 py-3 border-r border-slate-200">Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="2">Năng lực cốt lõi</td>
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực chung:</strong> Tự chủ và tự học; Giao tiếp và hợp tác; Giải quyết vấn đề và sáng tạo.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực đặc thù:</strong> Ngôn ngữ; Tính toán; Thẩm mỹ; Thể chất.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-tab-content="3" class="hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 border border-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-1/5 border-r border-slate-200">Nhóm Đánh Giá</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-2/5 border-r border-slate-200">Nội Dung Cụ Thể</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">GIỮA HỌC KỲ<br>(I, II)</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">CUỐI KỲ I</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider">CUỐI<br>NĂM HỌC</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr>
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="9">Môn học & HĐGD</td>
                <td class="px-4 py-3 border-r border-slate-200">Tiếng Việt</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Toán</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Ngoại ngữ 1</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Tin học và Công nghệ</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Tự nhiên và Xã hội</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Đạo đức</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Giáo dục thể chất</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Nghệ thuật (Âm nhạc, Mĩ thuật)</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Hoạt động trải nghiệm</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200">Phẩm chất chủ yếu</td>
                <td class="px-4 py-3 border-r border-slate-200">Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="2">Năng lực cốt lõi</td>
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực chung:</strong> Tự chủ và tự học; Giao tiếp và hợp tác; Giải quyết vấn đề và sáng tạo.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực đặc thù:</strong> Ngôn ngữ; Tính toán; Công nghệ; Tin học; Thẩm mỹ; Thể chất.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-tab-content="4-5" class="hidden">
       <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 border border-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-1/5 border-r border-slate-200">Nhóm Đánh Giá</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider w-2/5 border-r border-slate-200">Nội Dung Cụ Thể</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">GIỮA HỌC KỲ<br>(I, II)</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-r border-slate-200">CUỐI KỲ I</th>
                <th class="px-4 py-3 text-center text-sm font-bold text-blue-800 uppercase tracking-wider">CUỐI<br>NĂM HỌC</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr>
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="10">Môn học & HĐGD</td>
                <td class="px-4 py-3 border-r border-slate-200">Tiếng Việt</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Toán</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Ngoại ngữ 1</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Lịch sử và Địa lý</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Khoa học</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Tin học và Công nghệ</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center font-bold border-r border-slate-200">💯+📝</td>
                <td class="px-4 py-3 text-center font-bold">💯+📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Đạo đức</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Giáo dục thể chất</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Nghệ thuật (Âm nhạc, Mĩ thuật)</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-r border-slate-200">Hoạt động trải nghiệm</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center border-r border-slate-200">📝</td>
                <td class="px-4 py-3 text-center">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200">Phẩm chất chủ yếu</td>
                <td class="px-4 py-3 border-r border-slate-200">Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold align-middle border-r border-slate-200" rowspan="2">Năng lực cốt lõi</td>
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực chung:</strong> Tự chủ và tự học; Giao tiếp và hợp tác; Giải quyết vấn đề và sáng tạo.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 border-r border-slate-200"><strong>Năng lực đặc thù:</strong> Ngôn ngữ; Tính toán; Khoa học; Công nghệ; Tin học; Thẩm mỹ; Thể chất.</td>
                <td class="px-4 py-3 text-center" colspan="3">📝</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
       <div class="mt-4 text-xs text-slate-600 space-y-2">
        <p><span class="font-bold">Ghi chú:</span></p>
        <ul class="list-disc list-inside pl-2 space-y-1">
            <li><span class="font-bold text-lg">💯+📝</span>: Bài kiểm tra định kỳ chấm theo thang điểm 10, không cho điểm thập phân, kết hợp nhận xét.</li>
            <li><span class="font-bold text-lg">📝 (T/H/C)</span>: Đánh giá mức độ đạt được của môn học/hoạt động giáo dục (Hoàn thành Tốt, Hoàn thành, Chưa hoàn thành).</li>
            <li><span class="font-bold text-lg">📝 (T/Đ/C)</span>: Đánh giá mức độ hình thành của phẩm chất/năng lực (Tốt, Đạt, Cần cố gắng).</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Section 2: Overview of Assessment Content & Methods -->
  <div class="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200/80">
    <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-5 text-center">NỘI DUNG & PHƯƠNG PHÁP ĐÁNH GIÁ</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-blue-50/80 p-5 rounded-lg border border-blue-200">
        <h3 class="font-bold text-blue-800 text-lg mb-3">Nội dung đánh giá</h3>
        <ul class="space-y-3 list-disc list-inside text-blue-900">
          <li><strong>Quá trình học tập và kết quả</strong> của từng môn học, hoạt động giáo dục.</li>
          <li><strong>Phẩm chất chủ yếu:</strong> Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm.</li>
          <li><strong>Năng lực cốt lõi (Chung & Đặc thù):</strong> Tự chủ và tự học, Giao tiếp và hợp tác, v.v.</li>
        </ul>
      </div>
      <div class="bg-green-50/80 p-5 rounded-lg border border-green-200">
        <h3 class="font-bold text-green-800 text-lg mb-3">Phương pháp đánh giá</h3>
        <ul class="space-y-3 list-disc list-inside text-green-900">
          <li>Quan sát quá trình học sinh học tập, rèn luyện.</li>
          <li>Đánh giá qua hồ sơ học tập, sản phẩm, bài thực hành.</li>
          <li>Vấn đáp, trao đổi trực tiếp với học sinh.</li>
          <li>Kiểm tra viết (trắc nghiệm, tự luận).</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Section 3: The 4 Levels of Year-End Assessment -->
  <div class="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200/80">
    <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-5 text-center">ĐÁNH GIÁ KẾT QUẢ GIÁO DỤC CUỐI NĂM</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
      <div class="border-2 border-amber-400 bg-amber-50 rounded-lg p-4 flex flex-col">
        <div class="text-4xl mb-2">🏆</div>
        <h3 class="font-bold text-amber-800 text-lg">Hoàn thành Xuất sắc</h3>
        <ol class="text-xs mt-2 text-left list-decimal list-inside space-y-1 flex-grow">
          <li>Tất cả môn học <span class="font-semibold">Hoàn thành Tốt</span>.</li>
          <li>Năng lực & Phẩm chất <span class="font-semibold">Tốt</span>.</li>
          <li>Điểm kiểm tra cuối năm <span class="font-semibold">≥ 9</span>.</li>
        </ol>
      </div>
      <div class="border-2 border-sky-400 bg-sky-50 rounded-lg p-4 flex flex-col">
        <div class="text-4xl mb-2">🥈</div>
        <h3 class="font-bold text-sky-800 text-lg">Hoàn thành Tốt</h3>
        <ol class="text-xs mt-2 text-left list-decimal list-inside space-y-1 flex-grow">
          <li>Tất cả môn học <span class="font-semibold">Hoàn thành Tốt</span>.</li>
          <li>Năng lực & Phẩm chất <span class="font-semibold">Tốt</span>.</li>
          <li>Điểm kiểm tra cuối năm <span class="font-semibold">≥ 7</span>.</li>
        </ol>
      </div>
      <div class="border-2 border-teal-400 bg-teal-50 rounded-lg p-4 flex flex-col">
        <div class="text-4xl mb-2">✅</div>
        <h3 class="font-bold text-teal-800 text-lg">Hoàn thành</h3>
        <ol class="text-xs mt-2 text-left list-decimal list-inside space-y-1 flex-grow">
          <li>Tất cả môn học từ <span class="font-semibold">Hoàn thành</span> trở lên.</li>
          <li>Năng lực & Phẩm chất từ <span class="font-semibold">Đạt</span> trở lên.</li>
          <li>Điểm kiểm tra cuối năm <span class="font-semibold">≥ 5</span>.</li>
        </ol>
      </div>
      <div class="border-2 border-rose-400 bg-rose-50 rounded-lg p-4 flex flex-col">
        <div class="text-4xl mb-2">🔄</div>
        <h3 class="font-bold text-rose-800 text-lg">Chưa hoàn thành</h3>
        <p class="text-xs mt-2 flex-grow flex items-center justify-center">Học sinh không thuộc các đối tượng trên.</p>
      </div>
    </div>
  </div>

  <!-- Section 4 & 5 -->
  <div class="grid lg:grid-cols-5 gap-8">
    <!-- Section 4: The "Not Promoted" (Lưu Ban) Process -->
    <div class="lg:col-span-3 bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200/80">
      <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-5 text-center">Quy Trình Xét 'Chưa Được Lên Lớp'</h2>
      <div class="relative space-y-8">
         <div class="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200" aria-hidden="true"></div>
         <div class="relative flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold text-lg rounded-full border-2 border-slate-200 z-10">1</div>
            <div>
              <h4 class="font-bold text-slate-800 pt-1.5">Kết quả cuối năm "Chưa hoàn thành"</h4>
              <p class="text-sm mt-1">Hệ thống xác định học sinh có kết quả đánh giá giáo dục cả năm thuộc mức "Chưa hoàn thành".</p>
            </div>
         </div>
         <div class="relative flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold text-lg rounded-full border-2 border-slate-200 z-10">2</div>
            <div>
              <h4 class="font-bold text-slate-800 pt-1.5">Rèn luyện trong hè</h4>
              <p class="text-sm mt-1">Giáo viên chủ nhiệm lập kế hoạch, hướng dẫn và hỗ trợ học sinh ôn tập, rèn luyện trong hè để đánh giá lại.</p>
            </div>
         </div>
         <div class="relative flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold text-lg rounded-full border-2 border-slate-200 z-10">3</div>
            <div>
              <h4 class="font-bold text-slate-800 pt-1.5">Quyết định cuối cùng</h4>
              <p class="text-sm mt-1">Dựa trên kết quả đánh giá lại, quyết định học sinh "Được lên lớp" hoặc "Chưa được lên lớp".</p>
            </div>
         </div>
      </div>
    </div>

    <!-- Section 5: Automated Filtering Criteria for Summer Review -->
    <div class="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-amber-400">
      <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="text-2xl mr-2">⚠️</span>
        Tiêu chí lọc học sinh cần ôn luyện lại trong hè
      </h2>
      <p class="text-sm mb-4 text-slate-600">Hệ thống sẽ tự động lọc ra học sinh nếu có <span class="font-bold">BẤT KỲ</span> điều kiện nào dưới đây là đúng:</p>
      <ul class="space-y-3">
        <li class="p-3 bg-amber-50/70 rounded-md border border-amber-200">
            <input type="checkbox" class="mr-2" disabled> Có ít nhất <strong>01 Môn học/HĐGD</strong> được đánh giá <span class="font-semibold text-red-600">"Chưa hoàn thành"</span>.
        </li>
        <li class="p-3 bg-amber-50/70 rounded-md border border-amber-200">
            <input type="checkbox" class="mr-2" disabled> Có ít nhất <strong>01 Năng lực/Phẩm chất</strong> được đánh giá <span class="font-semibold text-red-600">"Cần cố gắng"</span>.
        </li>
         <li class="p-3 bg-amber-50/70 rounded-md border border-amber-200">
            <input type="checkbox" class="mr-2" disabled> Có ít nhất <strong>01 bài kiểm tra cuối kỳ</strong> có điểm <span class="font-semibold text-red-600">&lt; 5.0</span>.
        </li>
      </ul>
    </div>
  </div>
</div>
`
      }
    ]
  },
  {
    menuTitle: {
      main: "Quy trình thực hiện",
      sub: ""
    },
    contentTitle: "Quy trình thực hiện Sổ ghi điểm",
    subsections: [
      {
        title: "QUY TRÌNH THỰC HIỆN",
        description: `
<div class="space-y-8 relative">
    <!-- Vertical connecting line -->
    <div class="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 -z-0" aria-hidden="true"></div>

    <!-- Step 1 -->
    <div class="relative flex items-start space-x-6">
        <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl rounded-full shadow-md z-10">
            1
        </div>
        <div class="flex-1 min-w-0">
            <h4 class="text-xl font-bold text-slate-800 pt-2">LIÊN KẾT CSDL NGÀNH</h4>
            <div class="mt-3 space-y-4">
                <!-- 1. Why -->
                <div class="p-4 bg-blue-50/70 rounded-lg border-l-4 border-blue-400">
                    <h5 class="font-bold text-blue-800 text-base mb-2">1. Tại sao cần liên kết CSDL ngành</h5>
                    <p class="text-slate-700 text-sm">
                        Cần liên kết CSDL ngành thì mới có dữ liệu giáo viên, học sinh, xếp lớp, phân công giảng dạy để thực hiện Sổ ghi điểm.
                    </p>
                </div>

                <!-- 2. Notes -->
                <div class="p-4 bg-blue-50/70 rounded-lg border-l-4 border-blue-400">
                    <h5 class="font-bold text-blue-800 text-base mb-2">2. Cần lưu ý gì</h5>
                    <ul class="list-disc list-inside space-y-2 text-slate-700 text-sm pl-2">
                        <li>Cần đảm bảo dữ liệu trên CSDL ngành chính xác.</li>
                        <li><span class="font-bold text-red-600">Phải đăng nhập bằng tài khoản admin</span> để liên kết dữ liệu.</li>
                    </ul>
                </div>

                <!-- 3. Sample -->
                <div class="p-4 bg-blue-50/70 rounded-lg border-l-4 border-blue-400">
                     <h5 class="font-bold text-blue-800 text-base mb-3">3. Xem thao tác mẫu</h5>
                     <div class="flex justify-end">
                        <a href="https://drive.google.com/file/d/1ipNsT9jCvWB8IAyabp55V9_36T6Ec5Wy/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                            </svg>
                            <span>Xem thao tác</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 2 -->
    <div class="relative flex items-start space-x-6">
        <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl rounded-full shadow-md z-10">
            2
        </div>
        <div class="flex-1 min-w-0">
            <h4 class="text-xl font-bold text-slate-800 pt-2">GIÁO VIÊN ĐĂNG NHẬP VÀ CHỌN SỔ GHI ĐIỂM</h4>
            <div class="mt-3">
                <div class="p-4 bg-blue-50/70 rounded-lg border-l-4 border-blue-400">
                     <h5 class="font-bold text-blue-800 text-base mb-3">Thao tác</h5>
                     <div class="flex justify-end">
                        <a href="https://drive.google.com/file/d/1kHIzHtUW5J31I_ENQ9CdnTyGylWohGF6/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l-3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                            </svg>
                            <span>Xem thao tác</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 3 -->
    <div class="relative flex items-start space-x-6">
        <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-600 text-white font-bold text-xl rounded-full shadow-md z-10">
            3
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2">
                <h4 class="text-xl font-bold text-slate-800 mb-2 sm:mb-0">BẮT ĐẦU SỬ DỤNG SỔ GHI ĐIỂM</h4>
                <div class="flex items-center space-x-2 flex-shrink-0">
                    <a href="https://drive.google.com/file/d/1kOyNJN3oIApSv9N--voLi7A3L4z4iKnj/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="flex items-center text-xs font-semibold py-1 px-3 rounded-full transition-colors duration-200 bg-blue-100 text-blue-800 hover:bg-blue-200 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>Thông tư 22</span>
                    </a>
                    <a href="https://drive.google.com/file/d/1dseDImwLyAZg6wNoS-r0WEKI2tWDy_78/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="flex items-center text-xs font-semibold py-1 px-3 rounded-full transition-colors duration-200 bg-teal-100 text-teal-800 hover:bg-teal-200 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>Thông tư 27</span>
                    </a>
                </div>
            </div>
            <div class="mt-4 space-y-8">
                <!-- Nhập/xuất điểm hàng loạt -->
                <div class="p-4 bg-sky-50/70 rounded-xl border border-sky-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <h5 class="font-bold text-sky-800 text-lg">Nhập/xuất điểm hàng loạt</h5>
                        <button data-view="bulk-import-export" class="flex-shrink-0 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px whitespace-nowrap">
                            Xem giao diện
                        </button>
                    </div>
                </div>

                <!-- Cập nhật theo bộ môn -->
                <div class="p-4 bg-sky-50/70 rounded-xl border border-sky-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <h5 class="font-bold text-sky-800 text-lg">Cập nhật theo bộ môn</h5>
                        <button data-view="gradebook-mid-term" class="flex-shrink-0 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px whitespace-nowrap">
                            Xem giao diện
                        </button>
                    </div>
                </div>

                <!-- Cập nhật theo lớp học -->
                <div class="p-4 bg-sky-50/70 rounded-xl border border-sky-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <h5 class="font-bold text-sky-800 text-lg">Cập nhật theo lớp học</h5>
                        <button data-view="class-update" class="flex-shrink-0 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px whitespace-nowrap">
                            Xem giao diện
                        </button>
                    </div>
                </div>
                
                <!-- Ôn luyện trong hè -->
                <div class="p-4 bg-sky-50/70 rounded-xl border border-sky-200 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h5 class="font-bold text-sky-800 text-lg mb-3 sm:mb-0">Ôn luyện trong hè</h5>
                        <button data-view="gradebook-re-examination" class="ml-auto flex-shrink-0 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px whitespace-nowrap">
                            Xem giao diện
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
      }
    ]
  }
];