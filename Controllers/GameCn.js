import Game from "../Models/GameMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import slugify from "slugify";
import { nanoid } from "nanoid";

function makeSlug(name) {
  return slugify(name, { lower: true, strict: true }).slice(0, 50);
}

export const create = catchAsync(async (req, res, next) => {
  const { name, description = "", metadata = {} } = req.body;
  if (!name) return next(new HandleERROR("Game name is required", 400));
  const base = makeSlug(name);
  const slug = `${base}-${nanoid(4)}`;
  const game = await Game.create({
    name,
    slug,
    description,
    metadata,
    createdBy: req.userId,
  });
  return res.status(201).json({ success: true, data: game });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Game, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Game, req?.query, req?.role)
    .addManualFilters(req.role == "admin" ? {} : { _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const game = await Game.findById(id);
  if (!game) return next(new HandleERROR("Game not found", 404));
  const { name, description, metadata, isPublish } = req.body;
  if (name && name !== game.name) {
    const base = makeSlug(name);
    game.slug = `${base}-${nanoid(4)}`;
    game.name = name;
  }
  game.description = description ?? game.description;
  game.metadata = metadata ?? game.metadata;
  if (isPublish !== undefined) game.isPublish = isPublish;
  const updated = await game.save();
  return res.status(200).json({ success: true, data: updated });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const game = await Game.findById(id);
  if (!game) return next(new HandleERROR("Game not found", 404));
  game.isPublish = false;
  await game.save();
  return res
    .status(200)
    .json({ success: true, message: "Game deactivated successfully" });
});
