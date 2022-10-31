const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;

const R = 6378137;
function squared(x: number) {
  return x * x;
}
function toRad(x: number) {
  return (x * PI) / 180.0;
}
function hav(x: number) {
  return squared(sin(x / 2));
}

function haversineDistance([lat1, lon1]: number[], [lat2, lon2]: number[]) {
  const aLat = toRad(lat1);
  const bLat = toRad(lat2);
  const aLng = toRad(lon1);
  const bLng = toRad(lon2);

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return (2 * R * asin(sqrt(ht))) / 1000;
}

export { haversineDistance };
