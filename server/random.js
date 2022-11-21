const { faker } = require('@faker-js/faker/locale/it');
const Hike = require("./Class/Hike")
let difficultyArray = ["Tourist", "Hiker", "Professional Hiker"]

let i = 0;
while (i < 10) {
    let title = faker.word.adjective() + " " + faker.animal.type() + " hike"
    let length = faker.datatype.number({ min: 150, max: 1500 })
    let expectedTime = faker.datatype.number({ min: 40, max: 200 })
    let ascent = faker.datatype.number({ min: -200, max: 200 })
    let difficulty = difficultyArray[faker.datatype.number({ min: 0, max: 2 })]
    let description = faker.lorem.words(15)
    console.log(new Hike(i, title, length, expectedTime, ascent, difficulty, description, 0, 0))
    i++
}