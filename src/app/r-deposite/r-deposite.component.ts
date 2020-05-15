import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadServiceService } from '../Services/upload-service.service';

@Component({
  selector: 'app-r-deposite',
  templateUrl: './r-deposite.component.html',
  styleUrls: ['./r-deposite.component.css']
})
export class RDepositeComponent implements OnInit {


  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  constructor(private imageService : UploadServiceService) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Caption,Image){
   this.imageService.postFile(Caption.value,this.fileToUpload).subscribe(
     data =>{
       console.log('done');
       Caption.value = null;
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
     }
   );
  }

}