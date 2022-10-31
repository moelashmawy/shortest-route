import "./style.css";
import { ReactComponent as Distance } from "../../assets/icons/Distance-between.svg";
import { ReactComponent as Date } from "../../assets/icons/Date-icon.svg";
import { ReactComponent as Travelers } from "../../assets/icons/Traveler.svg";

type Props = { totalDistance: number; date: string; passengers: number };

export const ResultsInfo = ({ totalDistance, date, passengers }: Props) => {
  return (
    <div className="travel--info">
      <div className="info--item">
        <Distance width={35} />
        <span>{totalDistance.toFixed()} Km</span>
      </div>
      <div className="info--item">
        <Date width={35} />
        <span>{date}</span>
      </div>
      <div className="info--item">
        <Travelers width={35} />
        <span>{passengers}</span>
      </div>
    </div>
  );
};
