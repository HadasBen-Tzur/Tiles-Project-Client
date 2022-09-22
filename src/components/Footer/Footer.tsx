import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TilesContext } from "../../context/tokenAndTile.context";
import { tileService } from "../../services/tile.service";
import classes from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const {
    token,
    addTiles,
    setAddTiles,
    deleteTiles,
    setDeleteTiles,
    updateColor,
    setUpdateColor,
  } = useContext(TilesContext);
  const navigate = useNavigate();
  const undoState = () => {
    setAddTiles([]);
    setDeleteTiles([]);
    setUpdateColor([]);
  };

  const saveBulk = async () => {
    try {
      await tileService.saveTiles(addTiles, deleteTiles, updateColor, token);
      alert("נשמר בהצלחה");
      navigate("/tiles");
    } catch {
      alert("erorr save");
    }
  };
  return (
    <div className={classes.Footer}>
      <div onClick={undoState} className={classes.FooterButton}>
        UNDO
      </div>
      <div onClick={saveBulk} className={classes.FooterButton}>
        SAVE
      </div>
    </div>
  );
};
