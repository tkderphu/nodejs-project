var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthenService from "../../app/service/AuthenService";
import UserService from "../../app/service/UserService";
import TokenService from "../../app/service/TokenService";
import JwtService from "../../app/service/JwtService";
jest.mock("../../app/service/UserService");
jest.mock("../../app/service/JwtService");
jest.mock("../../app/service/TokenService");
jest.mock('bcrypt', () => ({
    compare: jest.fn((passfromUser, passFromDb) => __awaiter(void 0, void 0, void 0, function* () {
        if (passFromDb === passfromUser) {
            return true;
        }
        return false;
    }))
}));
describe("Login", () => {
    test("should send exception with code 404 when email not match", () => {
        UserService.findByEmail.mockImplementation((email) => __awaiter(void 0, void 0, void 0, function* () {
            if (email == "quang@gmail.com") {
                return {
                    email: "quang@gmail.com"
                };
            }
            return undefined;
        }));
        AuthenService.login({
            email: "quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status);
        });
    });
    test("should send exception with code 404 when password not match", () => {
        UserService.findByEmail.mockImplementation((email) => {
            if (email == "quangphu@gmail.com") {
                return {
                    email: "quangphu@gmail.com",
                    password: "test"
                };
            }
            return undefined;
        });
        AuthenService.login({
            email: "quangphu@gmail.com",
            password: "hehe"
        }).catch(err => {
            expect(404).toEqual(err.status);
        });
    });
});
describe('Forget password', () => {
    test('should send status code 404 when email not found', () => {
        UserService.findByEmail.mockImplementation((email) => {
            const data = {
                email: "quangphu@gmail.com"
            };
            if (email == data.email) {
                return data;
            }
            return undefined;
        });
        AuthenService.forgetPassword("quang@gmail.com").catch(err => {
            expect("Your username invalid, please check it again.").toEqual(err.message);
            expect(404).toEqual(err.status);
        });
    });
});
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
    TokenService.removeRefreshToken.mockImplementation((refreshToken) => {
        // Mutate the existing array instead of reassigning
        refreshTokenData = refreshTokenData.filter(token => token.refreshToken !== refreshToken);
    });
    TokenService.removeAllAccessTokenByRefreshToken.mockImplementation(() => {
        return true;
    });
    JwtService.tokenIsExpired.mockImplementation((refreshToken) => {
        const result = refreshTokenData.find(token => token.refreshToken === refreshToken);
        return result ? result.expired : false;
    });
    test("Should return 401 and remove refreshToken when refreshToken is expired", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield AuthenService.refreshToken("test", sample);
        }
        catch (err) {
            expect(err.status).toBe(401);
            expect(refreshTokenData.length).toBe(1);
        }
    }));
});
