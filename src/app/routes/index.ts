import { Router } from "express";

import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { StudentRoutes } from "../modules/students/student.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/teachers",
    route: TeacherRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
