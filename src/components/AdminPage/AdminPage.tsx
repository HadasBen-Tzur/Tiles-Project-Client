import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TilesContext } from "../../context/tokenAndTile.context";
import authService from "../../services/auth.service";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navber";
import jwt_decode from "jwt-decode";
import { Roles, User } from "../../models/user.model";
import classesF from "../Footer/Footer.module.scss";
import classes from "./AdminPage.module.scss";
import { ObjectId } from "bson";

export interface UsersTableModel {
  user: User;
}

export const AdminPage: React.FC = () => {
  const { token } = useContext(TilesContext);
  const [users, setUsers] = useState<User[]>([]);
  const [usersUpdate, setUsersUpdate] = useState<User[]>([]);
  const [role, setRole] = useState<Roles | "All">("All");
  const current_user = jwt_decode(token) as any;
  const roleList = [
    "",
    Roles.Admin,
    Roles.Editor,
    Roles.Moderator,
    Roles.Viewer,
  ];
  const navigate = useNavigate();
  useEffect(() => {
    authService
      .findAllUsers(token)
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  //   const updateUsers = (idUser: ObjectId) => {
  //     const userUp = users?.find((user) => {
  //       return user._id === idUser;
  //     });
  //     const newRoleUser: User = {
  //       ...userUp!,
  //       role: roleSelect!,
  //     };
  //     setUsers((list) => [...list, newRoleUser]);
  //     console.log(updateUsers);
  //   };

  const getUsers = useMemo(
    () =>
      users?.filter((user) => {
        if (role === "All") {
          return true;
        }
        return user.role === role;
      }),
    [users, role]
  );

  // const changeRoles = useMemo(() => {
  //   return roleSelect;
  // }, [users, roleSelect]);

  const changeRole = (
    event: React.ChangeEvent<HTMLSelectElement>,
    idUser: ObjectId
  ) => {
    const userUp = users?.find((user) => {
      return user._id === idUser;
    });
    const newRoleUser: User = {
      ...userUp!,
      role: event.target.selectedOptions[0].value as Roles,
    };
    setUsersUpdate((list) => [...list, newRoleUser]);
    
  };
  useEffect(() => {
    console.log(usersUpdate);
  }, [usersUpdate]);

  const undoState = () => {
    setUsersUpdate([]);
    console.log(usersUpdate);
  };

  const saveState = async () => {
    try {
      await authService.updateUsers(usersUpdate, token);
      console.log(usersUpdate);
      alert("נשמר בהצלחה");
      navigate("/AdminPage");
    } catch {
      alert("erorr save");
    }
  };
  return (
    <div className={classes.Admin}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Navbar />
      <div className={classes.AdminPage}>
        <div className={classes.SelectTypeUser}>
          <button
            onClick={() => setRole("All")}
            style={{
              color: role === "All" ? "#607998" : "#ffffff",
            }}
            className={classes.SelectTypeUserButton}
          >
            All Users
          </button>
          <hr className={classes.hr}></hr>
          <button
            style={{ color: role === Roles.Admin ? "#607998" : "#ffffff" }}
            onClick={() => setRole(Roles.Admin)}
            className={classes.SelectTypeUserButton}
          >
            Admin
          </button>
          <button
            style={{ color: role === Roles.Moderator ? "#607998" : "#ffffff" }}
            onClick={() => setRole(Roles.Moderator)}
            className={classes.SelectTypeUserButton}
          >
            Moderator
          </button>
          <button
            style={{ color: role === Roles.Editor ? "#607998" : "#ffffff" }}
            onClick={() => setRole(Roles.Editor)}
            className={classes.SelectTypeUserButton}
          >
            Editor
          </button>
          <button
            style={{ color: role === Roles.Viewer ? "#607998" : "#ffffff" }}
            onClick={() => setRole(Roles.Viewer)}
            className={classes.SelectTypeUserButton}
          >
            Viewer
          </button>
        </div>
        <div className={classes.TableUsers}>
          <table className={classes.TableUsersLine}>
            <thead>
              <tr className={classes.tableTr}>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {getUsers?.map((user, index) => {
                return (
                  <tr key={++index} className={classes.tableTrDitales}>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        className={classes.selectRole}
                        value={role}
                        name="roles"
                        id="roles"
                        onChange={(event) => {
                          changeRole(event, user._id);
                        }}
                      >
                        {roleList.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={classes.Footer}>
        <div onClick={undoState} className={classes.FooterButton}>
          UNDO
        </div>
        <div onClick={saveState} className={classes.FooterButton}>
          SAVE
        </div>
      </div>
    </div>
  );
};
