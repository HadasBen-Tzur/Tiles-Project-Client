import { useContext, useState } from "react";
import { ObjectId } from "bson";
import { Tile } from "../../models/tile.model";
import { TilesContext } from "../../context/tokenAndTile.context";
import classes from "./AddTile.module.scss";

export const AddTile: React.FC = () => {
  const { setAddTiles } = useContext(TilesContext);
  const [select, setSelect] = useState(false);
  const colorsList = [" #FFB085", "#FEF1E6", "#E98652", "#F9D5A7"];

  const addTile = (color: string) => {
    const newTile: Tile = {
      _id: new ObjectId(),
      color: color,
    };
    setAddTiles((listAddTiles) => [...listAddTiles, newTile]);
    setSelect(false);
  };
  return (
    <div className={classes.AddTileForm}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <i
        className="fa fa-plus"
        aria-hidden="true"
        id={classes.i}
        onClick={() => setSelect(true)}
        style={{
          display: select ? "none" : "block",
        }}
      ></i>
      <div className={classes.AddTileColor}>
        {colorsList.map((color) => {
          return (
            <button
              key={color}
              className={classes.AddTileButton}
              style={{
                backgroundColor: color,
                display: select ? "block" : "none",
              }}
              onClick={() => addTile(color)}
            />
          );
        })}
      </div>
    </div>
  );
};
