import { Router } from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
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
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
