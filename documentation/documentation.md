# HikeFIVE!

1. [Completed Stories](#completed-stories)
2. [Features](#features)
3. [Used technologies](#used-technologies)
4. [Testing](#testing)

## Completed Stories

### HT-1
As a visitor <br/>
I want to see the list (with filtering) of available hikes <br/>
So that I can get information on them

### HT-2
As a local guide <br/>
I want to add a hike description<br/>
So that users can look at it

### HT-3
As a visitor<br/>
I want to register to the platform<br/>
So that I can use its advanced services

### HT-4
As a hiker <br/>
I want to see the full list of hikes <br/>
So that I can get information (including tracks) on them"

### HT-17
As a hiker <br/>
I want to start a registered hike<br/>
So that I can record an ongoing hike

### HT-18
As a hiker <br/>
I want to terminate a hike<br/>
So that the hike is added to my completed hikes

### HT-34
As hiker<br/>
I want to access the list of hikes I completed

### HT-5
As a  local guide  <br/>
I want to insert a hut description

### HT-6
As a local guide<br/>
I want to add a parking lot

### HT-7
As a hiker<br/>
I want to search for hut description

### HT-8
As a local guide<br/>
I want to add parking lots and huts as start/arrivals points for hikes

### HT-9
As a  local guide <br/>
I want to link a hut to a hike<br/>
So that hikers can better plan their hike

### HT-33
As a local guide<br/>
I want to define reference points for a hike I added<br/>
So that hikers can be tracked

### HT-31
As a local guide<br/>
I want to register<br/>
To be able to access reserved features

### HT-32
As a platform manager<br/>
I want to validate a local guide registration<br/>
So that they can access specific features

### HT-12
As a hut worker <br/>
I want to request a user login<br/>
So that I can operate on the platform

### HT-13
As a platform manager <br/>
I want to verify hut worker users<br/>
So that they can operate on the platform

### HT-10
As a hiker <br/>
I want to record my performance parameters<br/>
So that I can get personalised recommendations

### HT-11
As a hiker<br/>
I want to filter the list of hikes based on my profile<br/>
So that I can see them based on certain characteristics


## Features

HikeFIVE! is made of these pages:
- Homepage (/)
- Hikes page (/hikes)
- Huts page (/huts)
- ParkingLots page (/parking-lots)
- Admin dashboard (/admin)
- Profile page (/user)
- Login page (/login)
- Registration page (/registration)

## Used technologies

The web application is made in JavaScript, both backend and frontend.
For frontend we used react.
For backend we used express.
We used SQLite as Database.

We used the following libraries
- dayjs
- react bootstrap
- material ui
- cors
- gpxparser
- express validator
- morgan
- passport
- jimp

## Testing

For testing we used two frameworks.
 - Mocha for integration testing
 - Jest for unit testing

On every update on our VCS, both test suites are executed