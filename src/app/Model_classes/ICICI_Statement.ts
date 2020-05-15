export class IciciStatement{
S_no:number;
Value_Date:Date;
Transcation_Date:Date;
Remarks:string;
withdrawal_Amount:number;
Deposite_Amount:number
Balance:number;
/**ss
 *
 */
constructor(s_no:number,Value_Date:Date,Transcation_Date:Date,Remarks:string,withdrawal_Amount:number,Deposite_Amount:number,Balance:number) {
    this.S_no=s_no;
    this.Value_Date=Value_Date;
    this.Transcation_Date=Transcation_Date;
    this.Remarks=Remarks;
    this.withdrawal_Amount=withdrawal_Amount;
    this.Deposite_Amount=Deposite_Amount;
    this.Balance=Balance;    
}
}