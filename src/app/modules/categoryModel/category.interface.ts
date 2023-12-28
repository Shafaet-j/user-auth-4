import { Schema } from "mongoose";

export type TCategory = {
  name: string;
  createdBy: Schema.Types.ObjectId;
};
