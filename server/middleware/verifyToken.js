import jwt from "jsonwebtoken";
export const verficationToken = async (req, res, next) => {
  const authtoken = req.headers.authorization;
  if (authtoken) {
    const token = authtoken.split(" ")[1];
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = payload;
  next();
};
export function verifyTokenAndAdmin(req, res, next) {
  verficationToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed ,only  admin" });
    }
  });
}
export function verifyTokenAndOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed ,only  admin" });
    }
  });
}
export function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed ,only  admin" });
    }
  });
}