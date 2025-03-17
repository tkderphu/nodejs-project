export interface User extends UserBase{
    email: string
    password: string
}

export interface UserBase {
    dateOfBirth?: any
    gender?: 'MALE' | 'FEMALE',
    role?: 'USER' | 'ADMIN',
    school?: string
    work?: string
    introduction?: string,
    createdDate?: any
}

export interface UserResponse extends UserBase {
    _id: string
}

export interface UserProfile extends UserBase{

}
export interface UserResponseSimple {
    fullName?: string
    thumbnail?: string
    id: string
}