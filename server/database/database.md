## User

| userID |   name   | surname |           email           | phoneNumber |    type    |               salt               |          hashedPassword          | verified | token |
| :----: | :------: | :-----: | :-----------------------: | :---------: | :--------: | :------------------------------: | :------------------------------: | :------: | :---: |
|   1    |  mario   |  rossi  |   mario.rossi@email.com   | 12345678901 |   hiker    | e2c8b3c929cbd232d2b0a4ec86541f2b | 3737b273a3ce89d39a0defe68af81f41 |   null   |       |
|   2    | antonio  | bianchi | antonio.bianchi@email.com |  234567890  | localGuide | 4d0674a27d4b512b7d1a5e576b7bd22e | 9beb9b87d0ada1dc9a0294f6cda52de2 |   null   |       |
|   3    | cristian |  verdi  | cristian.verdi@email.com  | 3456789012  | hutWorker  | c916da4ef3a473d862a7b10c65f10ec0 | 214e83c9288a28eeae8ef4c5d90bcbbc |   true   |       |


Test account:
|          email           | password |    role     |
| :----------------------: | :------: | :---------: |
|  mario.rossi@email.com   | password |    Hiker    |
| antonio.bianchi@email.co | password | Local Guide |
| cristian.verdi@email.com | password | Hut Worker  |

## Point

| pointID |     name     | latitude (REAL) | longitude (REAL) | address  | pointType  |
| :-----: | :----------: | :-------------: | :--------------: | :------: | :--------: |
|    1    |    hut#1     |       123       |       456        | address1 |    hut     |
|    2    | parkinglot#1 |       123       |       456        | address2 | parkinglot |
|    3    |    hut#2     |       123       |       456        | address3 |    hut     |
|    4    | parkinglot#2 |       123       |       456        | address4 | parkinglot |
|    5    |  generic#1   |       123       |       456        | address5 |  generic   |

pointType (Hut, ParkingLot, Generic)
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

| hikeID | Title  | Length | ExpectedTime | Ascent |     Difficulty     | StartPointId | EndPointId |    Description    |
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



