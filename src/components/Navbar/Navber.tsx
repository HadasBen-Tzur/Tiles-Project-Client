import { useContext, useState } from "react";
import { TilesContext } from "../../context/tokenAndTile.context";
import { Profile } from "../Porfile/Profile";
import classes from "./Navbar.module.scss";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { token } = useContext(TilesContext);
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();
  const current_user = jwt_decode(token) as any;
  const AdminPage = () => {
    try {
      if (current_user.role === "Admin") {
        navigate("/AdminPage");
        setIsClick(true);
      }
    } catch {
      alert("erorr");
    }
  };
  const TilePage = () => {
    try {
      navigate("/tiles");
      setIsClick(false);
    } catch {
      alert("erorr");
    }
  };
  const isAdmin = () => {
    if (current_user.role === "Admin") {
      return (
        <div className={classes.iDiv}>
          <i
            id={classes.i}
            className="fa fa-cogs"
            aria-hidden="true"
            onClick={AdminPage}
            style={{ background: isClick ? "#607998" : "" }}
          ></i>
          <i
            id={classes.i}
            className="fa fa-window-restore"
            aria-hidden="true"
            onClick={TilePage}
            style={{ background: isClick ? "" : "#607998" }}
          ></i>
        </div>
      );
    }
  };
  return (
    <div className={classes.Navbar}>
      <div className={classes.NavbarDiv}>
        <Profile />
        <div className={classes.NavbarDivForAdmin}>{isAdmin()}</div>
      </div>
    </div>
  );
};
