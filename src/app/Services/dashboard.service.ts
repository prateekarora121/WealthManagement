import * as XLSX from 'xlsx';
import { IciciStatement } from '../Model_classes/ICICI_Statement';
import { EventEmitter, Output, Injectable } from '@angular/core';
import { resolve } from 'url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, elementAt } from 'rxjs/operators';

type AOA = any[][];


@Injectable()
export class DashboardService
{
data:any;
@Output() valueChange = new EventEmitter();

/**
 *
 */
constructor(private httpClient:HttpClient) {}



getData()
{
  return this.data;
}
async convertXmltoObj (evTarget):Promise<any>
{
   
  let workBook = null;
  let jsonData = null;
  let jname=null;
  const reader = new FileReader();
  const file = evTarget.target.files[0];
 
  reader.onload = (event) => {
    const data = reader.result;
     workBook = XLSX.read(data, { type: 'binary' });
     jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      this.valueChange.emit(  initial[name] );
      return initial[name];
    }, {});
    
    this.data = jsonData['OpTransactionHistoryTpr'];
    //this.valueChange.emit(this.data);
   // console.log(this.data);
    
   
    // const dataString = JSON.stringify(jsonData);
  // console.log(jsonData[jname]);
  }
  reader.readAsBinaryString(file);
//return this.data;  
// console.log(this.jsonData[jname]);
//return jsonData[jname];
return Promise.resolve(this.data);











    // const target: DataTransfer = <DataTransfer>(evTarget);
    // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    // const reader: FileReader = new FileReader();
    // reader.onload = (e: any) =>{
    //   // /* read workbook */
    //   const bstr: string = e.target.result;
    //   const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    //   // /* grab first sheet */
    //   const wsname: string = wb.SheetNames[0];
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    //   // /* save data */
    //   this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
    //  //
    //  reader.readAsBinaryString(target.files[0]);
    // // return this.data;
    //             }
              
                
    //             return this.data;
   
}
}