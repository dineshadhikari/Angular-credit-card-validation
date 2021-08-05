import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  @ViewChild("cardNumber1", { static: true }) cardNumber1: ElementRef;
  @ViewChild("cardNumber2", { static: true }) cardNumber2: ElementRef;
  @ViewChild("cardNumber3", { static: true }) cardNumber3: ElementRef;
  @ViewChild("cardNumber4", { static: true }) cardNumber4: ElementRef;

  cardForm: FormGroup;
  transaction:any
  submitted = false;
  loading = false;
  error = "";
  cardNumber1to4: number;
  cardNumber5to8: number;
  cardNumber9to12: number;
  cardNumber13to16: number;
  holderName:string
  _number: any = [];
  rows: any[] = [1, 2, 3, 4];
  cardInput = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  public inputValidator(event:any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      c1: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      c2: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      c3: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      c4: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      // password: ["", Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.http.get("https://reqres.in/api/users?page=1").subscribe(
      (data:any) =>{
      // console.log(data);
      this.transaction = data.data;
    })
    
  }

  cardNumber($event) {
    if ($event.clipboardData) {
      let pastedData = $event.clipboardData.getData("Text");
      let _cardNumber = parseInt(pastedData);
      if (_cardNumber && _cardNumber.toString().length > 4) {
        while (_cardNumber > 0) {
          let mod = _cardNumber % 10000;
          _cardNumber = Math.floor(_cardNumber / 10000);
          this._number.push(mod);
        }
        this._number.reverse();
        [
          this.cardNumber1to4,
          this.cardNumber5to8,
          this.cardNumber9to12,
          this.cardNumber13to16,
        ] = this._number;
      }
    }
  }

  get f() {
    return this.cardForm.controls;
  }
  checkInputlength(event, currentInput) {
    if (event.srcElement.value.length === 4) {
      if (currentInput === 1) {
        this.cardNumber2.nativeElement.focus();
      }
      if (currentInput === 2) {
        this.cardNumber3.nativeElement.focus();
      }
      if (currentInput === 3) {
        this.cardNumber4.nativeElement.focus();
      }
    }
    if (event.srcElement.value.length === 0) {
      if (currentInput === 2) {
        this.cardNumber1.nativeElement.focus();
      }
      if (currentInput === 3) {
        this.cardNumber2.nativeElement.focus();
      }
      if (currentInput === 4) {
        this.cardNumber3.nativeElement.focus();
      }
    }
  }
  onSubmit(data: any) {
    // console.log(data);
    this.submitted = true;
    
    let detail = {
      'Name': this.holderName,
      'Card Number': `${this.cardNumber1to4} - ${this.cardNumber5to8} - ${this.cardNumber9to12} - ${this.cardNumber13to16}`
    }
    alert( JSON.stringify(detail))
    
  }
  
}
