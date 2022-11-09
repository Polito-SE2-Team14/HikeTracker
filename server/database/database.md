## User

| userID |   name   | surname |           email           | phoneNumber |    type    |   salt   | hashedPassword | confirmed |
| :----: | :------: | :-----: | :-----------------------: | :---------: | :--------: | :------: | :------------: | :-------: |
|   1    |  mario   |  rossi  |   mario.rossi@email.com   | 12345678901 |   hiker    |  312311  |  awfwafwqafa   |   null    |
|   2    | antonio  | bianchi | antonio.bianchi@email.com |  234567890  | localGuide | 45124124 |    fwafawfa    |   null    |
|   3    | cristian |  verdi  | cristian.verdi@email.com  | 3456789012  | hutWorkers | 51512451 | ajdhapduwhpad  |   true    |

## hut worker

| userID | hutID | confirmed |
| :----: | :---: | :-------: |
|   3    |   1   |     0     |

## Point

| pointID |     name     | latitude | longitude | address  | pointType  |
| :-----: | :----------: | :------: | :-------: | :------: | :--------: |
|    1    |    hut#1     |   123    |    456    | address1 |    hut     |
|    2    | parkinglot#1 |   123    |    456    | address2 | parkinglot |
|    3    |    hut#2     |   123    |    456    | address3 |    hut     |
|    4    | parkinglot#2 |   123    |    456    | address4 | parkinglot |
|    5    |  generic#1   |   123    |    456    | address5 |  generic   |

## Hut

| hutID | bedspace | hutOwnerID |
| :---: | :------: | :--------: |
|   1   |    10    |     3      |
|   3   |    15    |     53     |


## ParkingLot

| parkingLotID | carspace |
| :----------: | :------: |
|      2       |   100    |
|      4       |   300    |

## HikeReferencePoint

| hikeID | referencePointId |
| :----: | :--------------: |
|   1    |        1         |
|   1    |        2         |
|   2    |        2         |
|   2    |        4         |



## Hike

| hikeID | Title  | Lenght | ExpectedTime | Ascent |     Difficulty     | StartPointId | EndPointId |    Description    |
| :----: | :----: | :----: | :----------: | :----: | :----------------: | :----------: | :--------: | :---------------: |
|   1    | hike#1 |   7    |      30      |  100   |      Tourist       |      1       |     4      | firstDescription  |
|   2    | hike#2 |   2    |      45      |  123   |       Hiker        |      2       |     5      | secondDescription |
|   3    | hike#3 |   3    |      60      |  514   | Professional Hiker |      3       |     6      | thirdDescription  |

Length (kms)
Ascent (meters)
Difficulty (Tourist, Hiker, Professional Hiker)

## Hike group

| hikeID | groupID | leaderID |
| :----: | :-----: | :------: |
|   1    |    1    |    1     |
|   1    |    2    |    2     |

## Hike group member

| groupID | userID | confirmed | completed |
| :-----: | :----: | :-------: | :-------: |
|    1    |   1    |   true    |   true    |
|    2    |   1    |   false   |   false   |
|    2    |   2    |   true    |   false   |



