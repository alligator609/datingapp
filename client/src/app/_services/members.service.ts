import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member } from '../_model/member';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedResult } from '../_model/pagination';
import { UserParams } from '../_model/userParams';
import { AccountService } from './account.service';
import { User } from '../_model/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

// const httpOptions ={
//   headers : new HttpHeaders({
//     Authorization:'Bearer ' +JSON.parse(localStorage.getItem('user')).token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user= user;
      this.userParams = new UserParams(user);
    });
  }
  getUserParams(){
    return this.userParams;
  }
  setUserParams(params:UserParams){
    return this.userParams =params;
  }
  resetUserParams(){
    return this.userParams = new UserParams(this.user);
  }

  getMembers(userParams: UserParams)  {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      
      return of(response);
    }    
    console.log(this.memberCache);
    
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
 
   // if(this.members.length>0) return of(this.members);
   return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
  
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

/*   private getPaginatedResult<T>(url,params) {
    const   paginatedResult : PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url , { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pagenumber:number,pageSize:number){
    let params = new HttpParams();
  
      params = params.append('pageNumber',pagenumber.toString());
      params = params.append('pageSize',pageSize.toString());
      return params;
  } */

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
   // return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params);
   return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }
  
}