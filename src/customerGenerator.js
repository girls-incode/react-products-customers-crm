"use strict";

const faker = require("faker");
let id = 0;

module.exports = function generateCustomer() {
    id += 1;

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const dob = faker.date.past(
        50,
        new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")
    );

    return {
        id: id,
        name: faker.name.findName(firstName, lastName),
        dateOfBirth: dob,
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country(),
        },
        phone: faker.phone.phoneNumber(),
        username: faker.internet.userName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
        avatar: `https://randomuser.me/api/portraits/thumb/lego/${faker.random.number(
            9
        )}.jpg?v=${new Date().getTime()}`,
        job: {
            title: faker.name.jobTitle(),
            company: faker.company.companyName(),
        },
        quote: faker.lorem.sentence(),
    };
};
