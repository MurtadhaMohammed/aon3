const dayjs = require("dayjs");
const prisma = require("../db");

function generateOtp(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const createOtp = async (phone) => {
  const admin = await prisma.admin.upsert({
    where: {
      phone,
    },
    create: {
      phone,
    },
  });

  let newOtp = generateOtp();

  await prisma.admin.update({
    where: {
      id: admin.id,
    },
    data: {
      otp: newOtp,
      otpCreatedAt: dayjs(),
    },
  });

  return { success: true };
};

const verifyOtp = async (phone, otp)=>{
   //find admin by phone
   // chack otp 
   // check otpCreatedAt
   // reset otp and otpCreatedAt
   // create token and retun it
}

module.exports = {
  createOtp,
};
