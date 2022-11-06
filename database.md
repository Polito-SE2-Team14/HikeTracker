## Hike

| hikeID | Title  | Lenght | ExpectedTime | Ascent |     Difficulty     | StartPointId | EndPointId |    Description     |
| :----: | :----: | :----: | :----------: | :----: | :----------------: | :----------: | :--------: | :---------------: |
|   1    | hike#1 |   7    |      30      |  100   |      Tourist       |      1       |     4      | firstDescription  |
|   2    | hike#2 |   2    |      45      |  123   |       Hiker        |      2       |     5      | secondDescription |
|   3    | hike#3 |   3    |      60      |  514   | Professional Hiker |      3       |     6      | thirdDescription  |


Length (kms)
Ascent (meters)
Difficulty (Tourist, Hiker, Professional Hiker)

## HikeReferencePoint

| hikeID | referencePointId | referencePointType |
| :----: | :--------------: | :----------------: |
|   1    |        1         |        hut         |
|   1    |        2         |     parkingLot     |
|   2    |        2         |        hut         |
|   2    |        4         |     parkingLot     |

## Hut

| hutID | latitude | longitude |
| :---: | :------: | :-------: |
|   1   |   123    |    456    |
|   2   |   789    |    456    |


## ParkingLot

| parkingLotID | latitude | longitude |
| :----------: | :------: | :-------: |
|      2       |   123    |    456    |
|      4       |   789    |    456    |

## User

| userID |   name   | surname |           email           | phoneNumber |    type    |   salt   | hashedPassword |
| :----: | :------: | :-----: | :-----------------------: | :---------: | :--------: | :------: | :------------: |
|   1    |  mario   |  rossi  |   mario.rossi@email.com   | 12345678901 |   hiker    |  312311  |  awfwafwqafa   |
|   2    | antonio  | bianchi | antonio.bianchi@email.com |  234567890  | localGuide | 45124124 |    fwafawfa    |
|   3    | cristian |  verdi  | cristian.verdi@email.com  | 3456789012  | hutWorkers | 51512451 | ajdhapduwhpad  |
