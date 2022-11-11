
export function getLatLon(point){
    return [point.latitude, point.longitude]
}

export function getPointsLatLon(points){
    return points.map((p) => [p.latitude, p.longitude]);
}