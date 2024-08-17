import config from "@/config";
import bcrypt from "bcrypt";

export async function comparePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
  
export async function passwordHash(password: string) {
    const salt = await bcrypt.genSalt(Number.parseInt(config.salt_bcrypt));
    return await bcrypt.hash(password, salt);
  }