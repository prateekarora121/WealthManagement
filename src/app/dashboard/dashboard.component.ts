import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { IciciStatement } from '../Model_classes/ICICI_Statement';
import { DashboardService } from '../Services/dashboard.service';
import { isNumber } from 'util';
import { LowerCasePipe } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from '../Services/login.service';
import { FileToUpload } from '../Model_classes/FileToUpload';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 providers:[DashboardService,LoginService]
})

export class DashboardComponent implements OnInit {

  /**
   *
   */

  theFile: any = null;
  messages: string[] = [];
  
  constructor(private Dashboardservice:DashboardService,private uploadServ:LoginService) {  }
ngOnInit(){
  
}
 

Columns=["S No.","Value Date","Transaction Date","Transaction Remarks","Withdrawal Amount (INR )","Deposit Amount (INR )","Balance (INR )"];
IsHeading:boolean;
   data;
   Balance=0;
   staticData:IciciStatement[]=[];
  dataFinal=[];
  statementObj:IciciStatement[]=[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  totalDebit=0;
  totalCredit=0;
   count=1;
  file:any;

onUpload(event)
{
  const MAX_SIZE: number = 1048576;
  this.theFile = null;
  if (event.target.files && event.target.files.length > 0) {
    // Don't allow file sizes over 1MB
    if (event.target.files[0].size < MAX_SIZE) {
      // Set theFile property
      this.theFile = event.target.files[0];
    }
    else { // Display error message
      this.messages.push("File: " +
          event.target.files[0].name
          + " is too large to upload.");
    }
  }
  this.file=event.target.files[0];
   
  let file = new FileToUpload();
      
  // Set File Information
  file.fileName = this.theFile.name;
  file.fileSize = this.theFile.size;
  file.fileType = this.theFile.type;
  file.lastModifiedTime = this.theFile.lastModified;
  file.lastModifiedDate = this.theFile.lastModifiedDate;
      
  // Use FileReader() object to get file to upload
  // NOTE: FileReader only works with newer browsers
  let reader = new FileReader();
      
  // Setup onload event for reader
  reader.onload = () => {
    // Store base64 encoded representation of file
    file.fileAsBase64 = reader.result.toString();
      
    // POST to server
    this.uploadServ.upload(file,this.file)
      .subscribe(resp =>
        { this.messages.push("Upload complete"); });

  
}
reader.readAsBinaryString(this.theFile);
}


onSearch(eve)
{
  this.totalCredit=0;
  this.totalDebit=0;
   var comment="";
let srchValue=eve.target.value;
if(this.staticData!==null && this.staticData!==null)
{
  if(srchValue ==='')
{
  //this.sort(this.staticData);
  this.statementObj.forEach(element => {
    this.totalDebit=isNumber(element.withdrawal_Amount)? element.withdrawal_Amount+this.totalDebit:this.totalDebit+0;
    this.totalCredit=isNumber(element.Deposite_Amount)? element.Deposite_Amount+this.totalCredit:this.totalCredit+0;
   });
  this.dataSource=new MatTableDataSource(this.statementObj);
}
else
{

  var newObj:IciciStatement[]=[];
  
  this.staticData.forEach((obj)=>{
  //  console.log(obj.Remarks.includes(srchValue)==-1);
 
 comment =obj.Remarks.toString();
if((comment.includes(srchValue.toLowerCase()) || comment.includes(srchValue.toUpperCase())) && srchValue !=='')
{
newObj.push(obj);
this.totalDebit=isNumber(obj.withdrawal_Amount)? obj.withdrawal_Amount+this.totalDebit:this.totalDebit+0;
 this.totalCredit=isNumber(obj.Deposite_Amount)? obj.Deposite_Amount+this.totalCredit:this.totalCredit+0;


}
  });
  this.dataSource=new MatTableDataSource(newObj);
}
}  

}

async onFileChange(evt: any) {
  this.onUpload(evt);
    this.statementObj=[];
    this.dataFinal=[];
    this.totalDebit=0;
    this.totalCredit=0;
  //console.log(evt.target.files[0].name);
 const val= await this.Dashboardservice.convertXmltoObj(evt);
   this.Dashboardservice.valueChange.subscribe((data)=>{
  //this.staticData=data;
 this.sort(data);
//this.dataFinal=data;
   });;
  }

  sort(data)
  {
    this.statementObj=[];
    
   if(data!==undefined)
   data.forEach(element => {
    
     if((element["__EMPTY_1"]==="Legends Used in Account Statement"))
     {
      this.IsHeading=false;
     }
     if(element["__EMPTY_1"]==="S No." || element["__EMPTY_1"]==1)
     {
       this.IsHeading=true;
     }
     if(this.IsHeading)
     {
       if(element["__EMPTY_1"]!=="S No." )
     this.statementObj.push(new IciciStatement(element["__EMPTY_1"],element["__EMPTY_2"],element["__EMPTY_3"],element["__EMPTY_5"],element["__EMPTY_6"],element["__EMPTY_7"],element["__EMPTY_8"]));
    // this.dataFinal.push(element); 
    // this.Balance=element["__EMPTY_8"];
   } 
   });
   this.IsHeading=false;
   this.totalDebit=0;
   this.totalCredit=0;
   this.statementObj.forEach(element => {
 this.totalDebit=isNumber(element.withdrawal_Amount)? element.withdrawal_Amount+this.totalDebit:this.totalDebit+0;
 this.totalCredit=isNumber(element.Deposite_Amount)? element.Deposite_Amount+this.totalCredit:this.totalCredit+0;
});
this.Balance=this.statementObj[this.statementObj.length-1].Balance;
this.dataSource=new MatTableDataSource(this.statementObj);
this.staticData=this.statementObj;
  }
  
  
  displayedColumns: string[] =["S No.","Value Date","Transaction Date","Transaction Remarks","Withdrawal Amount (INR )","Deposit Amount (INR )","Balance (INR )"];
 dataSource =new MatTableDataSource(this.statementObj);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
