const expect = require('expect');

const {Users} = require('./users');

describe('Users' , () => {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'node course'
        }, 
        {
            id: 2,
            name: 'Danny',
            room: 'react course'
        }, 
        {
            id: 3,
            name: 'Jen',
            room: 'node course'
        }];
    });

    it('should add a new user', () => {
        let users = new Users();
        let user = {
            id: '1233',
            name: 'Manu',
            room: 'home'
        };

        let res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(res).toMatchObject(user);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('node course');

        expect(userList).toEqual(['Mike', 'Jen']);

    });

    it('should return names for node course', () => {
        let userList = users.getUserList('react course');

        expect(userList).toEqual(['Danny']);

    });

    it('should find user', () => {
        let userId = 2;
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId = 23;
        let user = users.getUser(userId);

        expect(user).toBeFalsy();

    });

    it('should remove an user', () => {
        let userId = 1;
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);

    });

    it('should not remove user', () => {
        let userId = 23;
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();

    });

});