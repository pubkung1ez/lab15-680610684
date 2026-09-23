import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course, Student } from "@/lib/types";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  status?: "registered" | "open";
  onDelete?: () => void;
};

function formatDate(date?: string) {
  if (!date) return "ยังไม่ได้ลงทะเบียน";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "ยังไม่ได้ลงทะเบียน";

  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsed);
}

export function CourseCard({
  course,
  student,
  enrolledAt,
  status = "open",
  onDelete,
}: CourseCardProps) {
  const isRegistered = status === "registered";

  return (
    <Card className="relative gap-0 rounded-xl border border-border bg-card py-0 shadow-none dark:border-white/10 dark:bg-[#181818]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 py-3 pr-14">
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base text-foreground dark:text-white">{course.courseTitle}</CardTitle>
          <CardDescription className="mt-1 text-xs text-muted-foreground dark:text-white/70">
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <span
            className={
              isRegistered
                ? "absolute right-4 top-3 rounded-full bg-[#5e2ca7] px-2.5 py-1 text-[10px] font-medium leading-none text-[#f3e8ff]"
                : "absolute right-4 top-3 rounded-full bg-[#f4b942] px-2.5 py-1 text-[10px] font-medium leading-none text-[#1a120a]"
            }
          >
            {isRegistered ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </span>

          {isRegistered && onDelete ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={onDelete}
              aria-label={`ลบวิชา ${course.courseTitle}`}
              className="pointer-events-auto absolute bottom-3 right-4 h-5 w-5 rounded-md p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </Button>
          ) : null}
        </div>
      </CardHeader>

      {isRegistered ? (
        <CardContent className="flex items-end justify-between gap-4 px-3 pb-3 pt-0">
          <div className="text-xs leading-[1.35] text-muted-foreground dark:text-white/70">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatDate(enrolledAt)}</p>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
