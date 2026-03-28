export const sanitizeUser = (user) => {
  if (!user) return null;
  const {
    password,
    verificationToken,
    verificationCode,
    expiredAt,
    resendAfter,
    createdAt,
    updatedAt,
    __v,
    ...rest
  } = user._doc ?? user;
  return rest;
};