import { Profile } from "../Porfile/Profile";
import classes from "./Navbar.module.scss";

export const Navbar: React.FC = () => {
  return (
    <div className={classes.Navbar}>
        <div>
           <Profile/>
        </div>  
    </div>
  );
};

