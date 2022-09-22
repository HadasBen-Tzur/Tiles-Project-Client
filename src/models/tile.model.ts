import { ObjectId } from "bson";

export interface Tile {
  _id: ObjectId;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}
