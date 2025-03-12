import bcrypt from "bcrypt";

import config from "../../config";
import { Teacher } from "./teacher.model";

const superUser = {
  name: "Ahad Ahamed",
  email: "superadmin@edutrack.com",
  password: config.super_admin_password,
  role: "super_admin",
  phone: "01636428995",
  needPassChange: false,
};

export const seedSuperAdmin = async () => {
  const isSuperAdminExits = await Teacher.findOne({ role: "super_admin" });

  const hashedPassword = await bcrypt.hash(
    superUser.password,
    parseInt(config.bcrypt_salt_rounds, 10)
  );

  const superAdminDataWithHashedPass = {
    ...superUser,
    password: hashedPassword,
  };

  if (!isSuperAdminExits) {
    await Teacher.create(superAdminDataWithHashedPass);
    console.log("Super admin created successfully!");
  }
};
