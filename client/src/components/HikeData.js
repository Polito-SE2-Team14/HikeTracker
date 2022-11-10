
export function getLatLon(point){
    return [point.Latitude, point.Longitude]
}

export function getPointsLatLon(points){
    return points.map((p) => [p.Latitude, p.Longitude]);
}