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

export interface SideNvItem{
    title:string;
    link:string;
}

export interface sortItem{
    taskId:number
    title:string;
    description:string;
    dueDate:string;
    status:string;
    priority:string;
}