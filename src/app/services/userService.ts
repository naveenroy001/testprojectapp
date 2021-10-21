import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserSerivice {

  constructor(private http: HttpClient, private common: CommonService) {}

    loginUrl =  this.common.baseUrl + '/authenticate';
    checkSessionUrl =  this.common.baseUrl + '/checklogin';
    searchRoleUrl = this.common.baseUrl + '/searchRole';
    roleUrl = this.common.baseUrl + '/user/role';
    getAllRoleListUrl = this.common.baseUrl + '/user/getAllRoleList';
    getAllRoleListDrpUrl = this.common.baseUrl + '/user/getAllRoleListDrp';
    roleMenueRightMapUrl = this.common.baseUrl + '/user/roleMenueRightMap';
    searchUsrDsgDeptURL = this.common.baseUrl + '/user/searchUsrDsgDpt/';
    userRoleMapUrl = this.common.baseUrl + '/user/usrRoleMap';
    createroleUrl=this.common.baseUrl+'/user/create-role-master';
    updateroleUrl=this.common.baseUrl+'/user/update-role-master';
    removeroleIdUrl=this.common.baseUrl+'/user/remove-role'; 
    getAllDesigListUrl=this.common.baseUrl+'/user/getAllDesignationList';
    createdesigUrl=this.common.baseUrl+'/user/create-desig';
    updatedesigUrl=this.common.baseUrl+'/user/update-desig'; 
    removedesigIdUrl=this.common.baseUrl+'/user/remove-desig'; 
    getdeptinitUrl=this.common.baseUrl+'/user/deprtment/init';
    getParentDeptListUrl=this.common.baseUrl+'/user/parentDptntList';
    createdeptUrl=this.common.baseUrl+'/user/create-dept';
    updatedeptUrl=this.common.baseUrl+'/user/update-dept';
    removedeptIdUrl=this.common.baseUrl+'/user/remove-dept';
    getmapinitUrl=this.common.baseUrl+'/user/map/init';
    getSetionListUrl=this.common.baseUrl+'/user/getSectionList'; 
    createMapUrl=this.common.baseUrl+'/user/create-map';
    updateMapUrl=this.common.baseUrl+'/user/update-map';
    removemapbyidUrl=this.common.baseUrl+'/user/remove-map';
    getmenuinitUrl=this.common.baseUrl+'/user/menu-master/init';
    createMenuUrl=this.common.baseUrl+'/user/create-menu';
    updateMenuUrl=this.common.baseUrl+'/user/update-menu';
    removemenubyidUrl=this.common.baseUrl+'/user/remove-menu';
    getSetionListByDeptIdUidUrl=this.common.baseUrl+'/user/getSectionListByDeptIdUserId';
    getRoleUrl=this.common.baseUrl+'/user/getRoleByUserid';
    getSetionDetailsByidUrl=this.common.baseUrl+'/user/getSectionDetails';
    getdesignationDetailsByidUrl=this.common.baseUrl+'/user/getDesignationDetails';
    createuserUrl=this.common.baseUrl+'/user/create-user';
    getuserbynameUrl=this.common.baseUrl+'/user/userisexists';
    getInitCreateUserUrl=this.common.baseUrl+'/user/map/initcreateuser';
    removeuserbyidUrl=this.common.baseUrl+'/user/remove-user';
    getdeptbynameUrl=this.common.baseUrl+'/user/deptisexistsByName';
    getdeptbycodeUrl=this.common.baseUrl+'/user/deptisexistsByCode';
    getdesignationbynamecodeUrl=this.common.baseUrl+'/user/designationisexists';
    getrolebynamecodeUrl=this.common.baseUrl+'/user/roleisexists';
    getMapDtlUrl=this.common.baseUrl+'/user/map/getDetails';
    userTransferUrl=this.common.baseUrl+'/user/transfer';
    updatepasswordUrl=this.common.baseUrl+'/user/update-password';
    getUserDetailsUrl=this.common.baseUrl+'/user/getUserDetails'; 
    getDeptHdrUrl=this.common.baseUrl+'/user/map/deptHderInit'
    getdptHerderisexistsUrl=this.common.baseUrl+'/user/dptHerderisexists';
    createHeaderMapUrl=this.common.baseUrl+'/user/create-header-dpt-map';
 
 
  saveRoleMenuMap(roleRightList:any[]){ 
    return this.http.post(this.roleMenueRightMapUrl+"/save",roleRightList,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('save role map list', [])) 
      );
  } 

  searchUsrDsgDept(searchText: string): Observable<any> {
    return this.http.get<User[]>(this.searchUsrDsgDeptURL + searchText,this.common.getHttpHeaders());
  }

  searchRole(searchText: string): Observable<any> {
    return this.http.get<User[]>(this.roleUrl +"/search/" + searchText,this.common.getHttpHeaders());
  }

  saveUsrRoleMap(jsonString:any){ 
    return this.http.post(this.userRoleMapUrl+"/save",jsonString,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('save user role map list', []))
      );
  } 
  getAllRoleList(){ 
    return this.http.get(this.getAllRoleListUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('get all role List', []))
      );
  }

  createrole(request) {  
    return this.http
      .post<any>(this.createroleUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Role Assign", null)));
  }
  updaterole(request) {  
    return this.http
      .post<any>(this.updateroleUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Update Role Assign", null))); 
  }
  removerole(id) {
    return this.http.post(this.removeroleIdUrl + '/' + id , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove Role', []))
    );
  }
  getAllDesigList(){ 
    return this.http.get(this.getAllDesigListUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('get all designation List', []))
      );
  } 
  createDesig(request) {  
    return this.http
      .post<any>(this.createdesigUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Designation", null)));
  }
 
  removedesig(id) {
    return this.http.post(this.removedesigIdUrl + '/' + id , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove Role', []))
    );
  } 
  getDeptInit(){ 
    return this.http.get(this.getdeptinitUrl,this.common.getHttpHeaders())
      .pipe(
          catchError(this.common.handleError<any>('Get List', []))
      );
  }
  getParentDeptList(){ 
    return this.http.get(this.getParentDeptListUrl,this.common.getHttpHeaders())
      .pipe(
          catchError(this.common.handleError<any>('Get List', []))
      );
  }
 
  createdept(request) {  
    return this.http
      .post<any>(this.createdeptUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Department", null)));
  }
  updatedept(request) {  
    return this.http
      .post<any>(this.updatedeptUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Department", null)));
  }
  removedept(id) {
    return this.http.post(this.removedeptIdUrl + '/' + id , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove Role', [])) 
    );
  }
  getMapInit(){ 
    return this.http.get(this.getmapinitUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('get all designation List', []))
      );
  }

  getSetionList(did: number) {
  
    return this.http.get(this.getSetionListUrl + '/' + did, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Section List', []))
      ); 
  } 

  getSetionListByDeptIdUid(did: number) { 
  
    return this.http.get(this.getSetionListByDeptIdUidUrl + '/' + did, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Section List', []))
      ); 
  }

  createmap(request) {  
    return this.http
      .post<any>(this.createMapUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Map", null)));
  }

  updatemap(request) {  
    return this.http
      .post<any>(this.updateMapUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Update Map", null)));
  }

  removemap(id:number) {
    return this.http.post(this.removemapbyidUrl + '/' + id , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove Role', []))  
    );
  }

  getMenuInit(){ 
    return this.http.get(this.getmenuinitUrl,this.common.getHttpHeaders())
      .pipe(
          catchError(this.common.handleError<any>('Get Menu List', []))
      );
  }

  createmenu(request) {  
    return this.http
      .post<any>(this.createMenuUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Create Menu", null)));
  }

  updatemenu(request) {  
    return this.http
      .post<any>(this.updateMenuUrl, request, this.common.getHttpHeaders())  
      .pipe(catchError(this.common.handleError<any>("Update Menu", null)));
  }
  
  removemenu(id:number) {
    return this.http.post(this.removemenubyidUrl + '/' + id , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove Menu', []))  
    );
  }
  getRole(){ 
    return this.http.get(this.getRoleUrl,this.common.getHttpHeaders())
      .pipe(
          catchError(this.common.handleError<any>('Remove Role', []))
      );
  }

  getSetionDetailsByid(sid: number) { 
  
    return this.http.get(this.getSetionDetailsByidUrl + '/' + sid, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Section Details', []))
      );  
  }
  getdesignationDetailsByid(dsgid: number) { 
  
    return this.http.get(this.getdesignationDetailsByidUrl + '/' + dsgid, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Section Details', []))
      ); 
  }
  createuser(request) {  
    return this.http
      .post<any>(this.createuserUrl, request, this.common.getHttpHeaders())  
      .pipe(catchError(this.common.handleError<any>("Create User", null)));
  }

  getuserbyname(uname: string) { 
  
    return this.http.get(this.getuserbynameUrl + '/' + uname, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }
  getInitCreateUser(){  
    return this.http.get(this.getInitCreateUserUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('get all designation List', []))
      ); 
  }
  removeuser(uId:number) {
    return this.http.post(this.removeuserbyidUrl + '/' + uId , null, this.common.getHttpHeaders()) 
    .pipe(
        catchError(this.common.handleError<any>('Remove user', []))  
    );
  } 

  getdeptbyname(name: string) { 
  
    return this.http.get(this.getdeptbynameUrl + '/' + name , this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }

  getdeptbycode(code: string) { 
  
    return this.http.get(this.getdeptbycodeUrl + '/' + code , this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }

  getdesignationbynamecode(name: string,code:string) { 
  
    return this.http.get(this.getdesignationbynamecodeUrl + '/' + name +'/'+code, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }


  initRoleRightMap(roleId:number){ 
    return this.http.get(this.roleMenueRightMapUrl+"/init/"+roleId,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('save role map list', [])) 
      );
  } 


  getRolesOfUser(userId:number){ 
    return this.http.get(this.userRoleMapUrl+"/getRoles/"+userId,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('Get roles of user', [])) 
      );
  } 


  getAllRoleListDrp(){ 
    return this.http.get(this.getAllRoleListDrpUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('Get roles of user', [])) 
      );
  } 

  getrolebynamecode(name: string,code:string) { 
 
    return this.http.get(this.getrolebynamecodeUrl + '/' + name +'/'+code, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }


  getUserDsgDepMapDtl(id:number){
    return this.http.get(this.getMapDtlUrl + '/' + id, this.common.getHttpHeaders()) 
    .pipe(
      catchError(this.common.handleError<any>('Get Details', []))
    ); 
  } 

  removeRoleUserMap(id:number,userId:number,updatedBy:number){
    return this.http.get(this.userRoleMapUrl +"/remove"+ '/' + id +"/"+userId+"/"+updatedBy, this.common.getHttpHeaders()) 
    .pipe(
      catchError(this.common.handleError<any>('Get Details', []))
    ); 
  }

  initTransferUser(userId:any){
    return this.http.get(this.userTransferUrl +"/init/" + userId, this.common.getHttpHeaders()) 
    .pipe(
      catchError(this.common.handleError<any>('Get Details', []))
    ); 
  }

  userTransfer(jsonStr:string){
    return this.http.post(this.userTransferUrl +"/save/" , jsonStr,this.common.getHttpHeaders()) 
    .pipe(
      catchError(this.common.handleError<any>('Get Details', []))
    );
  }

  updatepassword(request) {  
    return this.http
      .post<any>(this.updatepasswordUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Password Updated", null)));
  }

  getUserDetails(userId:number){
    return this.http.get(this.getUserDetailsUrl + '/' + userId, this.common.getHttpHeaders()) 
    .pipe(
      catchError(this.common.handleError<any>('Get Details', []))
    ); 
  }
  getDeptHdr(){  
    return this.http.get(this.getDeptHdrUrl,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('get all Detail List', []))
      ); 
  } 


  getdptHerderisexists(code: string,dpt:number) { 
     return this.http.get(this.getdptHerderisexistsUrl + '/' + code +'/'+dpt, this.common.getHttpHeaders()) 
      .pipe(
        catchError(this.common.handleError<any>('Get Details', []))
      ); 
  }
  createHeaderMap(request) {  
    return this.http
      .post<any>(this.createHeaderMapUrl, request, this.common.getHttpHeaders()) 
      .pipe(catchError(this.common.handleError<any>("Created Succesfully", null)));
  }

  initUsrRoleMap(){  
    return this.http.get(this.userRoleMapUrl + "/init" ,this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('init user role map', []))
      ); 
  } 
} 
