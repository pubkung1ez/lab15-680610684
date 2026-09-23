import { useEffect, useState } from "react";
import { ChevronDown, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentStudent } from "@/lib/mock-data";
import type { Course } from "@/lib/types";

type RegisterDialogProps = {
  availableCourses: Course[];
  onRegister: (courseId: string, time: string) => void;
};

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function RegisterDialog({ availableCourses, onRegister }: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const fullName = `${currentStudent.firstName} ${currentStudent.lastName}`;
  const [time, setTime] = useState(() => getCurrentTime());
  const [courseId, setCourseId] = useState("");
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [isManualTimeSelected, setIsManualTimeSelected] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isManualTimeSelected) {
      return;
    }

    setTime(getCurrentTime());

    const timerId = window.setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [open, isManualTimeSelected]);

  useEffect(() => {
    if (!open) {
      setTime(getCurrentTime());
      setIsManualTimeSelected(false);
      setCourseId("");
      setCourseMenuOpen(false);
    }
  }, [open]);

  const selectedCourse = availableCourses.find(
    (course) => course.courseId === courseId,
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName.trim() || !time.trim() || !courseId.trim()) {
      return;
    }

    onRegister(courseId, time);
    setTime(getCurrentTime());
    setIsManualTimeSelected(false);
    setCourseId("");
    setCourseMenuOpen(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type="button"
          size="default"
          disabled={availableCourses.length === 0}
          className="h-9 rounded-lg bg-[#171717] px-3 text-sm text-white hover:bg-[#262626] dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <UserRoundPlus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-0 max-w-xs gap-3 overflow-visible p-3">
        <form onSubmit={handleSubmit} className="min-w-0 space-y-3">
          <DialogHeader className="gap-1">
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription className="text-xs">
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1">
            <Label className="text-xs" htmlFor="courseId">วิชา</Label>
            <div className="relative">
              <button
                id="courseId"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={courseMenuOpen}
                onClick={() => setCourseMenuOpen((current) => !current)}
                className="flex h-7 w-full min-w-0 overflow-hidden items-center justify-between rounded-md border border-input bg-background px-2 text-left text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <span className="min-w-0 truncate">
                  {selectedCourse
                    ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                    : "เลือกวิชา"}
                </span>
                <ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-60" />
              </button>

              {courseMenuOpen ? (
                <div
                  role="listbox"
                  aria-label="เลือกรายวิชา"
                  className="absolute left-0 top-8 z-20 max-h-32 w-full overflow-y-auto rounded-md border border-input bg-popover p-1 text-xs text-popover-foreground shadow-lg"
                >
                  {availableCourses.map((course) => (
                    <button
                      key={course.courseId}
                      type="button"
                      role="option"
                      aria-selected={course.courseId === courseId}
                      onClick={() => {
                        setCourseId(course.courseId);
                        setCourseMenuOpen(false);
                      }}
                      className="block w-full rounded px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground"
                    >
                      {course.courseId} - {course.courseTitle}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs" htmlFor="time">เวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setIsManualTimeSelected(true);
              }}
              className="h-7 text-xs [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs" htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={fullName}
              readOnly
              className="h-7 text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs" htmlFor="program">โปรแกรม</Label>
            <Input id="program" value="CPE" readOnly className="h-7 text-xs" />
          </div>

          <DialogFooter className="-mx-3 -mb-3 p-3">
            <Button
              type="submit"
              size="sm"
              disabled={!courseId.trim() || !time.trim() || !fullName.trim()}
            >
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
