export const USER_ROLE = {
  super_admin: "super_admin",
  teacher: "teacher",
  student: "student",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
