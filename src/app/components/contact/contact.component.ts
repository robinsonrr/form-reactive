import { Component, OnInit } from '@angular/core';
import {DataDbService} from '../../services/data-db.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'contactForm',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  emailpattern: any ="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
    
  createFormGroup(){
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailpattern)]),
      name: new FormControl('',[Validators.required,Validators.minLength(5)]),
      message: new FormControl('',[Validators.required,Validators.maxLength(100), Validators.minLength(10)])

    });
  }
  
  contactForm:FormGroup;

  constructor(private dbData:DataDbService) {
    this.contactForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  onResetForm(){
    this.contactForm.reset();

  }

  onSaveForm(){
    if (this.contactForm.valid){
         this.dbData.saveMessage(this.contactForm.value);
         this.onResetForm();
         window.alert('Saved successfully!');
    }
   else{
    window.alert('Invalid Data, please check.');
   }

  }

  get name(){return this.contactForm.get('name');}
  get email(){return this.contactForm.get('email');}
  get message(){return this.contactForm.get( 'message');}
}
