import "./style.css";
import { ReactComponent as Bus } from "../../assets/icons/Bus.svg";
import { ReactComponent as Car } from "../../assets/icons/Car.svg";
import { ReactComponent as Arrow } from "../../assets/icons/RightArrow.svg";

type Props = { route: string[] };

export const Loading = ({ route }: Props) => {
  return (
    <div className="loading--page">
      <h3>Please wait while we're sorting your trip....</h3>
      {route.map((city, idx) => {
        const lastIdx = route.length - 1;

        return (
          <>
            <span
              style={{
                margin: "0 25px",
                border: "1px solid green",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
            >
              {city}
            </span>
            {lastIdx !== idx && <Arrow height={35} />}
          </>
        );
      })}

      <div className="bus">
        <Bus width={250} />
        <Car width={150} />
      </div>
    </div>
  );
};
