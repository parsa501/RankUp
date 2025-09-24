import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req?.role)
    .addManualFilters(req.role == "admin" ? {} : { _id: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  if (req.role != "admin" && req.userId != req.params.id) {
    return next(
      new HandleERROR("You are not authorized to update this user", 403)
    );
  }
  const user = await User.findById(req.params.id);
  user.username = req?.body?.username || user.username;
  user.password = req?.body?.password
    ? bcryptjs.hashSync(req.body.password, 10)
    : user?.password;
  user.role =
    req?.body?.role && req.role == "admin" ? req.body.role : user?.role;
  const newUser = await user.save();
  return res.status(200).json({
    success: true,
    data: newUser,
  });
});
