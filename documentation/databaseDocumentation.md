# TABLES

- [TABLES](#tables)
  - [USER](#user)
  - [POINT](#point)
  - [HUT](#hut)
  - [PARKINGLOT](#parkinglot)
  - [HIKE](#hike)
  - [HIKEREFERENCEPOINT](#hikereferencepoint)
  - [USER\_STATS](#user_stats)
  - [USERHIKERECORDS](#userhikerecords)
  - [HIKELINKHUT](#hikelinkhut)

## USER

| userID |   name   | surname |           email           | phoneNumber |    type    |               salt               |          hashedPassword          | verified | approved |                  token                   |
| :----: | :------: | :-----: | :-----------------------: | :---------: | :--------: | :------------------------------: | :------------------------------: | :------: | :------: | :--------------------------------------: |
|   1    | Antonio  | Bianchi | antonio.bianchi@email.com | 12345678901 |  manager   | 8a05535d2dce81f8c083adbbc27c25c5 | b6744447aadbcfcc0ccecfe42a333f40 |    1     |    1     | 2944cd9f28ae956779a7abd745e773eed7af9e94 |
|   2    | Randolph | Carter  | randolph.carter@email.com | 23456789011 |   hiker    | 3b3b115bade25dedd70280343631f25a | be60b30c98e8c21900e45150d5c4aec7 |    1     |    1     | 0b444956374578949c122c48bf1a7586457fc4d6 |
|   3    | Barbara  |   Ann   |   barbara.ann@email.com   | 34567890112 | localGuide | 643d7183b6c2f4ef85d243938eb561e9 | fbe514000dc19a748dc72ba8303e6f68 |    1     |    1     | 0165091908b82f069628034f51e08a4482493ee8 |
|   4    | Cristian |  Verdi  | cristian.verdi@email.com  | 45678901123 | hutWorker  | 69d6806a46acacba54ac5313828c3a79 | fb00cd6f98d6cd4d6fb202f642f44dfe |    1     |    1     | 99117c79aecb85b35e951e942b34ff48e3654f2d |

Type: hiker-localGuide-hutWorker-manager
Key: userID

## POINT

| pointID |   name    | description | altitude |      latitude      |     longitude     |      address      | municipality | province | country | pointType  | creatorID |
| :-----: | :-------: | :---------: | :------: | :----------------: | :---------------: | :---------------: | :----------: | :------: | :-----: | :--------: | :-------: |
|    1    |  Al Sap   | description |   100    |      45.95233      |      8.4457       | Alpe del Sap, 215 |   Angrogna   |  Turin   |  Italy  |    hut     |     3     |
|   16    |  park#1   | description |   100    | 45.181048386933924 | 6.949786842590845 |     address2      |   Settimo    |  Turin   |  Italy  | parkinglot |     3     |
|   30    | generic#1 | description |   100    |        123         |        123        |     address30     |  Refrancore  |   Asti   |  Italy  |  generic   |     3     |


pointType: hut-parkinglot-generic
Key: pointID

## HUT

| hutID | bedspace | phoneNumber |         website         |          email           |
| :---: | :------: | :---------: | :---------------------: | :----------------------: |
|   1   |    50    | 1234567890  |      www.alsap.com      |      alsap@mail.com      |
|   2   |    20    | 1234567891  |     www.troncea.com     |     troncea@mail.com     |
|   3   |    30    | 1234567892  | www.severinobessone.com | severinobessone@mail.com |


Key: hutID

## PARKINGLOT

| parkingLotId | carspace |
| :----------: | :------: |
|      16      |   150    |
|      18      |   100    |

Key: parkingLotId

## HIKE

| hikeID |               title               | length | expectedTime | ascent | difficulty | startPointID | endPointID |  description  | municipality | province | country | creatorID |
| :----: | :-------------------------------: | :----: | :----------: | :----: | :--------: | :----------: | :--------: | :-----------: | :----------: | :------: | :-----: | :-------: |
|   5    | Dormelletto - Lagoni di Mercurago |  8571  |     134      |  306   |  Tourist   |      5       |     6      | A description |    Arona     |  Novara  |  Italy  |     3     |
|   1    |     Mergozzo Sentiero Azzurro     | 10118  |     224      |  1035  |   Hiker    |      1       |     1      | A description |   Mergozzo   | Verbano  |  Italy  |     3     |
|   3    |          Tour Monte Rosa          | 14294  |     296      |  1261  | Pro Hiker  |      3       |     5      | A description |  Macugnana   | Verbano  |  Italy  |     3     |


Key: hikeID

## HIKEREFERENCEPOINT

| hikeID | referencePointID |
| :----: | :--------------: |
|   1    |        1         |
|   1    |        2         |
|   2    |        3         |

Key: hikeID, referencePointID


## USER_STATS

| userID | completedHikes | favouriteDifficulty | minTime | maxTime | totalTime | avereageTime | minDistance | maxDistance | totalDistance | averageDistance | favouriteCountry | favouriteProvince | minAscent | maxAscent | averageAscent |
| :----: | :------------: | :-----------------: | :-----: | :-----: | :-------: | :----------: | :---------: | :---------: | :-----------: | :-------------: | :--------------: | :---------------: | :-------: | :-------: | :-----------: |
|   2    |       1        |       Tourist       |   120   |   210   |    120    |     120      |     230     |     320     |      230      |       230       |      Italy       |       Udine       |    594    |    954    |      594      |
|   6    |       4        |        Hiker        |   203   |   542   |   1344    |     402      |     345     |     543     |     2000      |       433       |      Italy       |      Bolzano      |    297    |    529    |      300      |
|   7    |       20       | Professional Hiker  |   124   |   938   |   3345    |     539      |     390     |     930     |     2675      |       793       |      Italy       |      Trueste      |    230    |    940    |      593      |

Key: userID

## USERHIKERECORDS

| userID | hikeID |      startDate      |       endDate       |  status   |
| :----: | :----: | :-----------------: | :-----------------: | :-------: |
|   1    |   1    | 2022-01-01:18.00.00 | 2022-01-01:20.00.00 | completed |
|   1    |   2    | 2022-01-02:13.20.00 |        null         |   open    |
|   2    |   1    | 2022-01-03:08.00.00 |        null         |   open    |


Key: userID, hikeID, startDate
status: open/completed



## HIKELINKHUT

| hikeID | hutID |
| :----: | :---: |
|   1    |   2   |
|   1    |   4   |
|   2    |   3   |


Key: hikeID, hutID
