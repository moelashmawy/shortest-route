export function About() {
  return (
    <div>
      <h2>About</h2>
      <h3>
        A simple app to calculate a distance between multiple cities on earth
        cordinates using haversine formula.
      </h3>

      <hr style={{ margin: "30px 0" }} />

      <div>
        <h4>Home page</h4>
        <div>Home page contains a form to fill in the trip data</div>
        <div>Origin and destination are required</div>
        <div>
          Add multiple intermediate cities using '+' at the end of the route
          line
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <div>
        <h4>Results page</h4>
        <div>Results page contains the trip data</div>
        <div>Total distance</div>
        <div>Distance between every city</div>
        <div>A represental map to represent the cities cordinates</div>
        <div>The map is zommable / dragabble</div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <div>
        <h4>Errors</h4>
        <div>Errors will occur when you search using 'fail'</div>
        <div>
          If 'Dijon' is one of the choosen cities, the app will catch it as
          error and will navigate to not-found page 404
        </div>
      </div>
    </div>
  );
}
