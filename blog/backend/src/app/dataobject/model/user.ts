export interface User extends UserBase{
    email: string
    password: string
}

export interface UserBase {
    fullName?: string
    dateOfBirth?: any
    gender?: 'MALE' | 'FEMALE',
    role?: 'USER' | 'ADMIN',
}

export interface UserResponse extends UserBase {
    _id: string
}

export interface UserProfile extends UserBase{

}