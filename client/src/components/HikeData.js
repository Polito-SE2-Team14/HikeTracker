
export function getLatLon(point) {
    return [point.latitude, point.longitude]
}

export function getPointsLatLon(points) {
    return points.map((p) => [p.latitude, p.longitude]);
}

export function isInArea(point, area) {
    let coords = [point.latitude, point.longitude];

    return area.center ? distanceBetweenCoords(coords, area.center) <= area.radius : true;

}

export function timeText(timeValue) {
    if (timeValue < 60) return `${timeValue}m`;

    let hours = Math.floor(timeValue / 60);
    let minutes = timeValue % 60;

    return `${hours}h${minutes == 0 ? "" : ` ${minutes}m`}`;
}

function distanceBetweenCoords(p1, p2) {
    // NOTE(antonio): Harvesine formula
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad((p2[0] - p1[0]));
    let dLon = deg2rad((p2[1] - p1[1]));

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(p1[0])) * Math.cos(deg2rad(p2[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c * 1000; // Distance in meters

    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}