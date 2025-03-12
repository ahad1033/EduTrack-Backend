import { Router } from "express";

import { TeacherRoutes } from "../modules/teacher/teacher.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/teachers",
    route: TeacherRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
