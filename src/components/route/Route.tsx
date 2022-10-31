import "./style.css";

type Props = {
  route: string[];
  distances: number[];
};

export const Route = ({ route, distances }: Props) => {
  return (
    <div className="whole--route">
      {route.map((city: string, idx: number) => {
        const dist = distances[idx];

        return (
          <div className="one--city">
            <div className="city--name" key={idx}>
              {city}
            </div>
            {dist && (
              <div className="route--distance" key={idx}>
                {dist.toFixed()} KM
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
