import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {IFlower} from "./../types/Flower";

interface IFlowerWithSort extends IFlower {
  sortValue: number;
}

interface IFlowerContext {
  flowers: IFlower[];
  currentFlower: IFlower;
  next: () => void;
}

interface IFlowerContextProviderProps {
  children: React.ReactNode;
}

const FlowerContext = createContext<IFlowerContext | null>(null);

export const FlowerContextProvider: React.FC<IFlowerContextProviderProps> = ({children}) => {

  const [flowers, setFlowers] = useState<IFlower[]>([])
  const [currentIdx, setCurrentIdx] = useState<number>(0)

  const loadFlowers = async () => {
    try {
      const data = await (await fetch("/data/flowers.json")).json();

      const flowers: IFlower[] = data.map((flower: IFlower) => ({
        ...flower,
        sortValue: Math.random()
      })).sort((first: IFlowerWithSort, second: IFlowerWithSort) => first.sortValue - second.sortValue);

      setFlowers(flowers);

    } catch (e) {
      console.log(e)
    }
  }

  const currentFlower = flowers[currentIdx]

  const next = () => {
    if (currentIdx >= flowers.length - 1) setCurrentIdx(0)
    else setCurrentIdx(prevCurrentIdx => prevCurrentIdx + 1)
  }

  useEffect(() => {
    loadFlowers();
  }, []);

  return <FlowerContext.Provider value={{flowers, currentFlower, next}}>{children}</FlowerContext.Provider>
}

export const useFlowerContext = () => {
  const context = useContext(FlowerContext);

  if (!context) throw new Error("FlowerContext should be inside FlowerContextProvider")

  return context
}