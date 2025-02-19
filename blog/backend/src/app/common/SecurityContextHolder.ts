class SecurityContextHolder {
    private static userId: string =  ""
    private static roles: string[] = []
    static setAuthentication(userLogginedId: string, userRoles: string[]) {
        SecurityContextHolder.userId = userLogginedId
        SecurityContextHolder.roles = userRoles
    }

    static getUserLogginedId() {
        return SecurityContextHolder.userId
    }
}
export default SecurityContextHolder

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