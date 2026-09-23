import { Link } from "react-router";

import { currentStudent, currentUser } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-start px-4 pt-10">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#1d1d1d] px-6 py-5 shadow-[0_0_20px_rgba(0,0,0,0.35)]">
        <p className="text-lg font-medium text-white">
          ระบบลงทะเบียนเรียน CPE &amp; ISNE
        </p>

        <Link
          to="/enrollment"
          className="mt-4 inline-flex rounded-md border border-white/20 bg-[#f5f5f5] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-white"
        >
          ไปหน้าลงทะเบียนเรียน
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-white/70">
        <span>
          จัดทำโดย {currentUser.nickname} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
        </span>
      </div>
    </div>
  );
}
