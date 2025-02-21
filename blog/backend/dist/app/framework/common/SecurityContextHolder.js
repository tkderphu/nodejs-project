"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecurityContextHolder {
    static setAuthentication(userLogginedId, userRoles) {
        SecurityContextHolder.userId = userLogginedId;
        SecurityContextHolder.roles = userRoles;
    }
    static getUserLoggined(req) {
        return {
            userId: req.userId,
            roles: req.roles
        };
    }
}
SecurityContextHolder.userId = "";
SecurityContextHolder.roles = [];
exports.default = SecurityContextHolder;
// export const threadLocals: any = {
//     current: {},
//     set: (key: any, val: any) => {
//       threadLocals.current[key] = val;
//     },
//     get: (key:) => threadLocals.current[key]
//   };
// process.addAsyncListener({
//     create: () => threadLocals.current,
//     before: (context, storage) => {
//         if (storage) {
//             threadLocals.current = storage;
//         }
//     },
//     after: (context, storage) => {
//         if (storage) {
//             threadLocals.current = {};
//         }
//     }
// });
