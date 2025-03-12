import bcrypt from "bcrypt";

import { User } from "./user.model";

import config from "../../config";

const superUser = {
  name: "Ahad Ahamed",
  email: "superadmin@cicada.com",
  password: "cicadA1033",
  role: "super_admin",
  phone: "01636428995",
  needPassChange: false,
};

export const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: "super_admin" });

  const hashedPassword = await bcrypt.hash(
    superUser.password,
    parseInt(config.bcrypt_salt_rounds, 10)
  );

  const superAdminDataWithHashedPass = {
    ...superUser,
    password: hashedPassword,
  };

  if (!isSuperAdminExits) {
    await User.create(superAdminDataWithHashedPass);
    console.log("Super admin created successfully!");
  }
};
