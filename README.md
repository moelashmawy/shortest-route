# Calculate distance between 2 or more cities using haversine formula

# [Live demo](https://63600385d3da8403cff63be6--shortest-route.netlify.app/)
if it doesn't load from the first time refresh again, seems something with netlify

<div>
        <h4>Home page</h4>
        <div>Home page contains a form to fill in the trip data</div>
        <div>Origin and destination are required</div>
        <div>
          Add multiple intermediate cities using '+' at the end of the route
          line
        </div>
      </div>
      
<div>
        <h4>Results page</h4>
        <div>Results page contains the trip data</div>
        <div>Total distance</div>
        <div>Distance between every city</div>
        <div>A represental map to represent the cities cordinates</div>
        <div>The map is zommable / dragabble</div>
      </div>
      
<div>
        <h4>Errors</h4>
        <div>Errors will occur when you search using 'fail'</div>
        <div>
          If 'Dijon' is one of the choosen cities, the app will catch it as
          error and will navigate to not-found page 404
        </div>
      </div>
      
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
