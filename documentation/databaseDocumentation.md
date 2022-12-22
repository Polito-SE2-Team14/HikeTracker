# TABLES

## USER

| userID | name  | surname | email | phoneNumber | type  | salt  | hashedPassword | verified | approved | token |
| :----: | :---: | :-----: | :---: | :---------: | :---: | :---: | :------------: | :------: | :------: | :---: |
|        |       |         |       |             |       |       |                |          |          |       |

Type: hiker-localGuide-hutWorker-manager
Key: userID

## HIKEREFERENCEPOINT

| hikeID | referencePointID |
| :----: | :--------------: |

Key: hikeID, referencePointID

## POINT

| pointID | name  | description | altitude | latitude | longitude | address | municipality | province | country | pointType | creatorID |
| :-----: | :---: | :---------: | :------: | :------: | :-------: | :-----: | :----------: | :------: | :-----: | :-------: | :-------: |

pointType: hut-parkinglot-generic
Key: pointID

## USER_STATS

| userID | completedHikes | favouriteDifficulty | minTime | maxTime | totalTime | avereageTime | minDistance | maxDistance | totalDistance | averageDistance | favouriteCountry | favouriteProvince | minAscent | maxAscent |
| :----: | :------------: | :-----------------: | :-----: | :-----: | :-------: | :----------: | :---------: | :---------: | :-----------: | :-------------: | :--------------: | :---------------: | :-------: | :-------: |

Key: userID

## USERHIKERECORDS

| userID | hikeID | startDate | endDate | status |
| :----: | :----: | :-------: | :-----: | :----: |

Key: userID, hikeID, startDate

## PARKINGLOT

| parkingLotId | carspace |
| :----------: | :------: |

Key: parkingLotId

## HIKELINKHUT

| hikeID | hutID |
| :----: | :---: |

Key: hikeID, hutID

## HUT

| hutID | bedspace | phoneNumber | website | email |
| :---: | :------: | :---------: | :-----: | :---: |

Key: hutID

## HIKE

| hikeID | title | length | expectedTime | ascent | difficulty | startPointID | endPointID | description | municipality | province | country | creatorID |
| :----: | :---: | :----: | :----------: | :----: | :--------: | :----------: | :--------: | :---------: | :----------: | :------: | :-----: | :-------: |

Key: hikeID