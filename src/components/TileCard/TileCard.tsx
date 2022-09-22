import { useContext, useState } from "react";
import { TilesContext } from "../../context/tokenAndTile.context";
import { TileCardModel } from "../Tiles/Tiles";
import classes from "./TileCard.module.scss";

export const TileCard: React.FC<TileCardModel> = (props) => {
  console.log("props", props.tile);
  const { addTiles, setUpdateColor, updateColor } = useContext(TilesContext);
  const [colorSelect, setColorSelect] = useState(props.tile.color);
  const colorsList = [" #FFB085", "#FEF1E6", "#E98652", "#F9D5A7"];
  const chengeColor = (color: string) => {
    setColorSelect(color);
    addTiles.map((newTile) => {
      if (newTile._id === props.tile._id) {
        newTile.color = color;
        return;
      }
    });
    setUpdateColor((tilesUp) => [
      ...tilesUp,
      { _id: props.tile._id, color: color },
    ]);
    console.log(updateColor);
  };
  return (
    <div className={classes.TileCardForm}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div
        className={classes.TileCard}
        style={{
          backgroundColor: colorSelect,
        }}
      >
        {colorsList.map((color) => {
          if (color !== colorSelect) {
            return (
              <button
                key={color}
                className={classes.TileCardButton}
                style={{
                  backgroundColor: color,
                }}
                onClick={() => chengeColor(color)}
              />
            );
          }
        })}
        <button
          className={classes.TileCardButtonTrash}
          onClick={() => props.deleteTile(props.tile._id)}
        >
          <i className="fa fa-trash" aria-hidden="true" id={classes.i}></i>
        </button>
      </div>
    </div>
  );
};
