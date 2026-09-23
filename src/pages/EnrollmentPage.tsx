import { useEffect, useMemo, useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  CURRENT_STUDENT_ID,
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

const STORAGE_KEY = "lab15-enrollments";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return initialEnrollments.filter(
        (item) => item.studentId === CURRENT_STUDENT_ID,
      );
    }

    try {
      const parsed = JSON.parse(saved) as Enrollment[];
      return parsed.filter((item) => item.studentId === CURRENT_STUDENT_ID);
    } catch {
      return initialEnrollments.filter(
        (item) => item.studentId === CURRENT_STUDENT_ID,
      );
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
  }, [enrollments]);

  const enrollmentMap = useMemo(
    () =>
      new Map(
        enrollments.map((enrollment) => [
          enrollment.courseId,
          enrollment.enrolledAt ?? undefined,
        ]),
      ),
    [enrollments],
  );

  const availableCourses = courses.filter(
    (course) => !enrollmentMap.has(course.courseId),
  );

  function handleRegister(courseId: string, time: string) {
    if (!courseId.trim()) return;

    const enrolledAt = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    enrolledAt.setHours(hours, minutes, 0, 0);

    setEnrollments((current) => {
      if (current.some((item) => item.courseId === courseId)) {
        return current;
      }

      return [
        ...current,
        {
          studentId: CURRENT_STUDENT_ID,
          courseId,
          enrolledAt: enrolledAt.toISOString(),
        },
      ];
    });
  }

  function handleDelete(courseId: string) {
    setEnrollments((current) =>
      current.filter((item) => item.courseId !== courseId),
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-foreground dark:text-white">รายวิชาทั้งหมด</h1>
          <p className="mt-0.5 text-[10px] text-muted-foreground dark:text-white/60">
            {currentStudent.firstName} {currentStudent.lastName} ({CURRENT_STUDENT_ID})
          </p>
        </div>
        <RegisterDialog
          availableCourses={availableCourses}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-2">
        {courses.map((course) => {
          const isRegistered = enrollmentMap.has(course.courseId);

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollmentMap.get(course.courseId)}
              status={isRegistered ? "registered" : "open"}
              onDelete={isRegistered ? () => handleDelete(course.courseId) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
