import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserType } from '../Model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://localhost:7011/api/';
  imgUrl = 'https://localhost:7011';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  createAccount(user: any) {
    return this.http.post(this.baseUrl + 'Account/register', user);
  }

  login(loginInfo: any) {
    return this.http.post(this.baseUrl + 'Account/login', loginInfo);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getTokenUserInfo(): any {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    console.log(token);
    let user: any = {
      id:token.id,
      userRole: token.role === 'User' ? UserType.USER : UserType.ADMIN,
    };
    return user;
  }

  getTaskList(){
    return this.http.get(this.baseUrl+'Tasks/getalltask');
  }

  addTask(task:any):Observable<any>{
    return this.http.post(this.baseUrl+'Tasks/addtask/',task);
  }

  getRoles(){
    return this.http.get(this.baseUrl+'Account/getrole')
  }

  uploadImage(userId:string,file:File):Observable<any>{
    debugger;
    const formData=new FormData();
    formData.append('profileImage',file);
    return this.http.post(this.baseUrl+'Account/'+userId+'/upload',formData,{
      responseType:'text'
    });
  }

  getImagePath(relativePath:string){
    return `${this.imgUrl}/${relativePath}`
  }

  getUser(userId:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'/Account/'+userId);
  }

  getRoleList(){
    return this.http.get(this.baseUrl+"Roles/getrole")
  }

  addrole(role:string){
    return  this.http.post(this.baseUrl+'Roles/addrole',role,
    {
      responseType:'text'
    });
  }

  getRoleId(roleId:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+"Roles/getid/"+roleId)
  }

  updateRole(role:any){
    return this.http.put(this.baseUrl+'Roles/updaterole',role,
    {
      responseType:'text'
    });
  }

  deleteRole(id:string):Observable<any>{
    return this.http.delete(this.baseUrl+'Roles/deleterole?id='+id,{
      responseType:'text'
    });
  }

}
