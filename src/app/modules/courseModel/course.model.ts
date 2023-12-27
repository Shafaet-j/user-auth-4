import { Schema, Types, model } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";
import httpStatus from "http-status";

const tagSchema = new Schema<TTags>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});

const detailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});
const coureSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    price: { type: Number, required: true },
    tags: { type: [tagSchema], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: detailsSchema, required: true },
  },
  { timestamps: true }
);

coureSchema.pre("save", async function () {
  const startDate: Date = new Date(this.startDate);
  const endDate: Date = new Date(this.endDate);

  const differenceInMilliseconds: number =
    endDate.getTime() - startDate.getTime();

  this.durationInWeeks = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );
});

coureSchema.pre("save", async function (next) {
  const isCourseExist = await Course.findOne({ title: this.title });
  if (isCourseExist) {
    throw new Error("This course already exist");
  }
  next();
});

export const Course = model<TCourse>("Course", coureSchema);
