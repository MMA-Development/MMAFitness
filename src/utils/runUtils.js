export function getDistance(run) {
  let distance = 0;
  run.forEach((a, index) => {
    if (index === 0) return;
    b = run[index - 1];

    distance += measure(
      a.coords.latitude,
      a.coords.longitude,
      b.coords.latitude,
      b.coords.longitude
    );
  });

  return distance;
}

export function getTotalRuntime(run) {
  const firstTimestamp = run[0].timestamp;
  const lastTimestamp = run[run.length - 1].timestamp;

  const diffInMs = lastTimestamp - firstTimestamp; // Difference in milliseconds
  const diffInSeconds = Math.floor(diffInMs / 1000); // Convert to seconds
  const seconds = diffInSeconds % 60;
  const minutes = Math.floor(diffInSeconds / 60);
  return { seconds, minutes };
}

function measure(lat1, lon1, lat2, lon2) {
  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.floor(d * 1000); // meters
}
