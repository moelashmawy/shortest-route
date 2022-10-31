import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Map } from "../../components/map/Map";
import { ResultsInfo } from "../../components/results-info/ResultsInfo";
import { Route } from "../../components/route/Route";
import { useDistance } from "../../hooks/useDistance";
import { Loading } from "../loading-page/Loading";

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const intermediatesString = searchParams.get("intermediates") ?? "[]";
  const intermediates = JSON.parse(intermediatesString);
  const date = searchParams.get("date") || "";
  const passengersString = searchParams.get("passengers") || "1";

  const passengers = JSON.parse(passengersString);

  const route = useMemo<string[]>(
    () => [origin, ...intermediates, destination],
    [destination, intermediates, origin]
  );

  const { loading, distances, totalDistance, citiesCordinates } =
    useDistance(route);

  return loading ? (
    <Loading route={route} />
  ) : (
    <div>
      <Route route={route} distances={distances} />

      <ResultsInfo
        totalDistance={totalDistance}
        date={date}
        passengers={passengers}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Map citiesCordinates={citiesCordinates} />
      </div>

      <span style={{ color: "grey" }}>
        Drag the map / Zoom in and out the map / hover the points to know which
        city
      </span>
    </div>
  );
}
