import Score from "../Models/ScoreMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
  const { game, value, metadata = {} } = req.body;
  if (!game || value == null)
    return next(new HandleERROR("Game and value are required", 400));
  const score = await Score.create({
    user: req.userId,
    game,
    value,
    metadata,
  });
  return res.status(201).json({ success: true, data: score });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Score, req.query, req.role)
    .filter()
    .sort("-value")
    .limitFields()
    .paginate()
    .populate("user", "username")
    .populate("game", "name");
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const score = await Score.findById(req.params.id)
    .populate("user", "username")
    .populate("game", "name");
  if (!score) return next(new HandleERROR("Score not found", 404));
  return res.status(200).json({ success: true, data: score });
});

export const update = catchAsync(async (req, res, next) => {
  const score = await Score.findById(req.params.id);
  if (!score) return next(new HandleERROR("Score not found", 404));
  const { value, metadata, isPublish } = req.body;
  if (value != null) score.value = value;
  score.metadata = metadata ?? score.metadata;
  if (isPublish !== undefined) score.isPublish = isPublish;
  const updated = await score.save();
  return res.status(200).json({ success: true, data: updated });
});

export const remove = catchAsync(async (req, res, next) => {
  const score = await Score.findById(req.params.id);
  if (!score) return next(new HandleERROR("Score not found", 404));
  score.isPublish = false;
  await score.save();
  return res
    .status(200)
    .json({ success: true, message: "Score deactivated successfully" });
});
