import { AuthLogin } from "../../app/model/auth";
import AuthenService from "../../app/service/AuthenService"; 
import UserService from "../../app/service/UserService";
import { compare } from "bcrypt";
jest.mock("../../app/service/UserService")
jest.mock('bcrypt', () => ({
    compare: jest.fn(async (passfromUser, passFromDb) => {
        if(passFromDb === passfromUser) {
            return true
        }
        return false
    })
}))

describe("Register", () => {
  test('should send status code 400 when user exists',  () => {
    (UserService.findByEmail as jest.Mock).mockImplementation(async () => {
        return {
            email: "quangphu@gmail.com",
            password: "hehe"
        }
    })
    AuthenService.register({
        email: "quangphu@gmail.com",
        password: "hehe"
    }).catch(err => {
        expect(400).toEqual(err.status)
        
    })
  })
});


describe("Login", () => {
    test("should send exception with code 404 when email not match", () => {
        (UserService.findByEmail as jest.Mock).mockImplementation(async (email: string) => {
                if(email == "quang@gmail.com") {
                    return {
                        email: "quang@gmail.com"
                    }
                }
                return undefined
        })
        
        AuthenService.login({
            email:"quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status)
        })
    })

    test("should send exception with code 404 when password not match", () => {
        
        (UserService.findByEmail as jest.Mock).mockImplementation( (email: string) => {
                if(email == "quangphu@gmail.com") {
                    return {
                        email: "quangphu@gmail.com",
                        password: "test"
                    }
                }
                return undefined
        })
        AuthenService.login({
            email:"quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status)
        })
    })

})
