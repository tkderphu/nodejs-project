import { AuthLogin } from "../../app/model/auth";
import AuthenService from "../../app/service/AuthenService";
import UserService from "../../app/service/UserService";
import { compare } from "bcrypt";
import TokenService from "../../app/service/TokenService";
import JwtService from "../../app/service/JwtService";
jest.mock("../../app/service/UserService")
jest.mock("../../app/service/JwtService")
jest.mock("../../app/service/TokenService")
jest.mock('bcrypt', () => ({
    compare: jest.fn(async (passfromUser, passFromDb) => {
        if (passFromDb === passfromUser) {
            return true
        }
        return false
    })
}))



describe("Login", () => {
    test("should send exception with code 404 when email not match", () => {
        (UserService.findByEmail as jest.Mock).mockImplementation(async (email: string) => {
            if (email == "quang@gmail.com") {
                return {
                    email: "quang@gmail.com"
                }
            }
            return undefined
        })

        AuthenService.login({
            email: "quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status)
        })
    })

    test("should send exception with code 404 when password not match", () => {

        (UserService.findByEmail as jest.Mock).mockImplementation((email: string) => {
            if (email == "quangphu@gmail.com") {
                return {
                    email: "quangphu@gmail.com",
                    password: "test"
                }
            }
            return undefined
        })
        AuthenService.login({
            email: "quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status)
        })
    })

})



describe('Forget password', () => {
    test('should send status code 404 when email not found', () => {
        (UserService.findByEmail as jest.Mock).mockImplementation((email: string) => {
            const data = {
                email: "quangphu@gmail.com"
            }
            if (email == data.email) {
                return data
            }
            return undefined
        })

        AuthenService.forgetPassword("quang@gmail.com").catch(err => {
            expect("Your username invalid, please check it again.").toEqual(err.message)
            expect(404).toEqual(err.status)
        })

    })
})


describe('Refresh Token', () => {
    let refreshTokenData = [
        {
            refreshToken: "39453trengkreg",
            expired: true
        },
        {
            refreshToken: "fleskfdlgfdkgfd",
            expired: false
        }
    ];
    
    const sample = refreshTokenData[0].refreshToken;
    
    (TokenService.removeRefreshToken as jest.Mock).mockImplementation((refreshToken: string) => {
        // Mutate the existing array instead of reassigning
        refreshTokenData = refreshTokenData.filter(token => token.refreshToken !== refreshToken);
    });
    
    (TokenService.removeAllAccessTokenByRefreshToken as jest.Mock).mockImplementation(() => {
        return true;
    });
    
    (JwtService.tokenIsExpired as jest.Mock).mockImplementation((refreshToken: string) => {
        const result = refreshTokenData.find(token => token.refreshToken === refreshToken);
        return result ? result.expired : false;
    });
    
    test("Should return 401 and remove refreshToken when refreshToken is expired", async () => {
        try {
            await AuthenService.refreshToken("test", sample);
        } catch (err: any) {
            expect(err.status).toBe(401);
            expect(refreshTokenData.length).toBe(1); 
        }
    });
    
})