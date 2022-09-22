import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Tile } from "../models/tile.model";
import { tileService } from "../services/tile.service";
import { ObjectId } from "bson";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface TilesContextProps {
  token: string;
  setToken: (value: string | ((val: string) => string)) => void;
  tiles: Tile[] | undefined;
  setTiles: Dispatch<SetStateAction<Tile[] | undefined>>;
  addTiles: Tile[];
  setAddTiles: Dispatch<SetStateAction<Tile[]>>;
  deleteTiles: ObjectId[];
  setDeleteTiles: Dispatch<SetStateAction<ObjectId[]>>;
  updateColor: Tile[];
  setUpdateColor: Dispatch<SetStateAction<Tile[]>>;
}

export const TilesContext = createContext<TilesContextProps>({
  token: "",
  setToken: () => {},
  tiles: undefined,
  setTiles: () => {},
  addTiles: [],
  setAddTiles: () => {},
  deleteTiles: [],
  setDeleteTiles: () => {},
  updateColor: [],
  setUpdateColor: () => [],
});

interface TilesProviderProps {}

export const TilesProvider: React.FC<PropsWithChildren<TilesProviderProps>> = (
  props
) => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [tiles, setTiles] = useState<Tile[]>();
  const [addTiles, setAddTiles] = useState<Tile[]>([]);
  const [deleteTiles, setDeleteTiles] = useState<ObjectId[]>([]);
  const [updateColor, setUpdateColor] = useState<Tile[]>([]);

  return (
    <TilesContext.Provider
      value={{
        token: token,
        setToken,
        tiles: tiles,
        setTiles,
        addTiles,
        setAddTiles,
        deleteTiles,
        setDeleteTiles,
        updateColor,
        setUpdateColor,
      }}
    >
      {props.children}
    </TilesContext.Provider>
  );
};
