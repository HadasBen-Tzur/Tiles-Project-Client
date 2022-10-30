import { Tile } from "../models/tile.model";
import { axiosInstance } from "./axios.util";
import { ObjectId } from "bson";

class TileService {
  async findAll(token: string) {
    return (
      await axiosInstance.get<Tile[]>("/tiles", {
        headers: { authorization: `Bearer ${token}` },
      })
    ).data;
  }

  async saveTiles(
    tilesAdded: Tile[],
    tilesRemoved: ObjectId[],
    tilesUpdated: Tile[],
    token: string
  ) {
    console.log(tilesAdded, tilesRemoved, tilesUpdated);
    return (
      await axiosInstance.put<Tile[]>(
        "/tiles",
        {
          tilesAdded: tilesAdded,
          tilesRemoved: tilesRemoved,
          tilesUpdated: tilesUpdated,
        },
        // {
        //   headers: { authorization: `Bearer ${token}` },
        // }
      )
    ).data;
  }
}

export const tileService = new TileService();