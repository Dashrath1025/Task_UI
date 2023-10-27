export interface User{
    id:string
    firstName: string,
    lastName: string,
    email: string,
    dob:string,
    userName:string
    gender:string,
    mobile:number,
    city:string,
    image:string
}

export enum UserType{
    ADMIN,
    USER
}