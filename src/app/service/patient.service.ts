import { Injectable } from '@angular/core';
import { Patient } from '../model/patient.model';
import { SERVICE } from '../model/SERVICER.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { SERVICEWrapd } from '../model/SERVICEWrapd.model';
import { AuthService } from './auth.service';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiURL:string = 'http://localhost:8083/PatientAng/api';
  apiURLSer: string = 'http://localhost:8083/PatientAng/ser';
  patients !: Patient[];
  services! :SERVICE[];
  
  constructor (private http : HttpClient, private authService: AuthService )   
     {  
    
   /* this.services=
      [ {idSer : 1, nomSer : "RIA"},{idSer : 2, nomSer : "services de cardiologie"}];*/
 
   /* this.patients = [
    {idPatient : 1, nomPatient : "aymen",  prenomPatient: "difallah", datenaiss : new Date("01/14/2011"), service:{idSer : 1, nomSer : "maladies des yeux"}},
    {idPatient : 2, nomPatient : "bechir",  prenomPatient: "hammami", datenaiss : new Date("12/17/2010"),service:{idSer : 2, nomSer : "maladies rares"}},
    {idPatient : 3, nomPatient :"farah",  prenomPatient:" yed3es", datenaiss : new Date("02/20/2020"),service:{idSer : 3, nomSer : "serveaux"}}
 ];*/

}

ajoutPatient( pas: Patient):Observable<Patient>
{
  let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.post<Patient>(apiURL+"/addprod", pas, {headers:httpHeaders})
  }
/*listePatient():Patient[]{
  return this.patients;
}*/

 

supprimerPatient(id : number) {
  const url = `${apiURL}/delprod/${id}`;
let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.delete(url, {headers:httpHeaders});
  }
  
  consulterPatient(id: number): Observable<Patient> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Patient>(url,{headers:httpHeaders});
    }
    
    trierPatients(){
      this.patients = this.patients.sort((n1,n2) => {
      if (n1.idPatient! > n2.idPatient!) 
      {
      return 1;
      }
      if (n1.idPatient! < n2.idPatient!) 
      {
      return -1;
      }
      return 0;
      });
      }
      updatePatient(pas :Patient) : Observable<Patient>
      {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Patient>(apiURL+"/updatepass", pas, {headers:httpHeaders});
      }


      listeService():Observable<SERVICEWrapd>{
      /*  return this.http.get<SERVICEWrapd>(this.apiURLSer);*/
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<SERVICEWrapd>(this.apiURLSer,{headers:httpHeaders} );}

      consulterServices(id:number): SERVICE{
      return this.services.find(ser => ser.idSer == id)!; }




     listePatient(): Observable<Patient[]>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Patient[]>(this.apiURL+"/all",{headers:httpHeaders});

     }


     rechercherParService(idSer: number):Observable<Patient[]> {
      const url = `${this.apiURL}/pasSer/${idSer}`;
      return this.http.get<Patient[]>(url);
      }



      rechercherParNom(nom: string):Observable< Patient[]> {
        const url = `${this.apiURL}/pasByName/${nom}`;
        return this.http.get<Patient[]>(url);
        }


        ajouterService(ser: SERVICE):Observable<SERVICE>{
          return this.http.post<SERVICE>(this.apiURLSer, ser, httpOptions);
        }
        
      }