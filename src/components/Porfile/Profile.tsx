import authService from "../../services/auth.service";
import { useContext } from "react";
import { TilesContext } from "../../context/tokenAndTile.context";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import classes from "./Profile.module.scss";

export const Profile: React.FC = () => {
  const { token } = useContext(TilesContext);
  const navigate = useNavigate();
  const current_user = jwt_decode(token) as any;
  console.log(current_user);
  const LogOut = async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch {
      alert("erorr");
    }
  };
  return (
    <div className={classes.Profile}>
      <i className="fa fa-user-circle" aria-hidden="true" id={classes.i}></i>
      <div className={classes.ProfileTorow}>
        <span>{current_user.userName}</span>
        <span className={classes.ProfileRole}>{current_user.role}</span>
        <button onClick={LogOut} className={classes.ProfileLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};
