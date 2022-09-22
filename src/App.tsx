import classes from "./App.module.scss";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { TilesProvider } from "./context/tokenAndTile.context";

function App() {
  return (
    <div className={classes.App}>
      <main className={classes.contianer}>
        <TilesProvider>
          <Outlet />
        </TilesProvider>
      </main>
    </div>
  );
}

export default App;
