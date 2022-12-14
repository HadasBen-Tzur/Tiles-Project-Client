import { useContext, useEffect } from "react";
import { Tile } from "../../models/tile.model";
import { AddTile } from "../AddTile/AddTile";
import { TileCard } from "../TileCard/TileCard";
import { ObjectId } from "bson";
import { TilesContext } from "../../context/tokenAndTile.context";
import { Footer } from "../Footer/Footer";
import classes from "./Tiles.module.scss";
import { Navbar } from "../Navbar/Navber";
import { useNavigate } from "react-router-dom";
import { tileService } from "../../services/tile.service";
import jwt_decode from "jwt-decode";

export interface TileCardModel {
  tile: Tile;
  deleteTile: (id: ObjectId) => void;
}

export const Tiles: React.FC = () => {
  const { token, tiles, setTiles, addTiles, setAddTiles, setDeleteTiles } =
    useContext(TilesContext);
  const current_user = jwt_decode(token) as any;
  const navigate = useNavigate();
  useEffect(() => {
    tileService
      .findAll(token)
      .then((data) => {
        setTiles(data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  const deleteTile = (id: ObjectId) => {
    console.log("fun", id);
    setTiles(tiles?.filter((tile) => tile._id !== id));
    setAddTiles(addTiles?.filter((tile) => tile._id !== id));
    setDeleteTiles((list) => [...list, id]);
  };
  const addTileBetton = () => {
    if (current_user.role === "Admin" || current_user.role === "Moderator") {
      return <AddTile />;
    }
  };
  return (
    <div className={classes.TilesForm}>
      <Navbar />
      <div className={classes.TilesCardRow}>
        {tiles?.map((tile) => {
          return (
            <TileCard
              key={tile._id.toString()}
              tile={{ _id: tile._id, color: tile.color }}
              deleteTile={deleteTile}
            />
          );
        })}
        {addTiles?.map((tile) => {
          return (
            <TileCard
              key={tile._id.toString()}
              tile={{ _id: tile._id, color: tile.color }}
              deleteTile={deleteTile}
            />
          );
        })}
        {addTileBetton()}
      </div>
      <Footer />
    </div>
  );
};
