import { Suspense } from "react";
import CoursesContent from "./CoursesContent";

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesContent />
    </Suspense>
  );
}
