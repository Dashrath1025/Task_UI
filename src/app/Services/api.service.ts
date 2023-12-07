import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserType } from '../Model/model';
import { Observable, throwIfEmpty } from 'rxjs';

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

  deleteToken(){
    localStorage.removeItem('access_token');
   // location.reload();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getTokenUserInfo(): any {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: any = {
      id: token.id,
      name:token.name,
      userRole: token.role === 'User' ? UserType.USER : UserType.ADMIN,
    };
    return user;
  }

 

  getTaskList() {
    return this.http.get(this.baseUrl + 'Tasks/getalltask');
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl + 'Tasks/addtask/', task,{responseType:'text'});
  }

  getRoles() {
    return this.http.get(this.baseUrl + 'Account/getrole');
  }

  uploadImage(userId: string, file: File): Observable<any> {
   // debugger;
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.http.post(
      this.baseUrl + 'Account/' + userId + '/upload',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  getImagePath(relativePath: string) {
    console.log("relative path",relativePath);
    
    return `${this.imgUrl}/${relativePath}`;
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Account/' + userId);
  }

  getAssignUser(userId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'User/' + userId);
  }

  getroleName(userId: string) {
    return this.http.get(this.baseUrl + 'User/getrolename/' + userId, {
      responseType: 'text',
    });
  }

  getRoleList() {
    return this.http.get<any[]>(this.baseUrl + 'Roles/getrole');
  }

  addrole(role: string) {
    return this.http.post(this.baseUrl + 'Roles/addrole', role, {
      responseType: 'text',
    });
  }

  getRoleId(roleId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Roles/getid/' + roleId);
  }

  updateRole(role: any) {
    return this.http.put(this.baseUrl + 'Roles/updaterole', role, {
      responseType: 'text',
    });
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'Roles/deleterole?id=' + id, {
      responseType: 'text',
    });
  }

  getAssignRole() {
    return this.http.get(this.baseUrl + 'User/getroles');
  }

  getRolesList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}User/getRolesList`);
  }

  assignUserRole(email: string, roleName: string): Observable<any> {
    const params = {
      userEmail: email,
      roleName: roleName,
    };
    return this.http.post<any>(
      `${this.baseUrl}User/updaterole`,
      { responseType: 'text' },
      { params: params }
    );
  }

  lockUnlock(userId: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'User/lockunlock?userId=' + userId,
      {}
    );
  }

  updateProfile(profile: any) {
    return this.http.put(this.baseUrl + 'Account/updateprofile', profile);
  }

  getTaskByUser(userId: string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'Tasks/gettaskbyuser?userId=' + userId
    );
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'Tasks/gettaskbyid?taskId=' + taskId
    );
  }

  updateStatus(taskId: number, status: string) {
    return this.http.put(`${this.baseUrl}Tasks/updatestatus?taskId=${taskId}&status=${status}`, null);
  }
  
  searchTasks(duedate:Date,status:string,userId:string):Observable<any[]>{
    const searchUrl=`${this.baseUrl}Tasks/filtertask?dueDate=${duedate}&status=${status}&userId=${userId}`;
    return this.http.get<any[]>(searchUrl);
  }

  clearTasks(userId:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+"Tasks/ClearTasks?userId="+userId);
  }
}
