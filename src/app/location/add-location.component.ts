import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ZipCodeService } from '../shared/zip-code.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  zipcodeForm!: FormGroup; // todo check ts2524 rm  definite assignement assertion

  constructor(
    private formBuilder: FormBuilder,
    private zipcodeService: ZipCodeService,
  ) { }


  ngOnInit(): void {
    this.zipcodeForm = this.formBuilder.group({
      zipcode: new FormControl(undefined, [
        Validators.required,
        Validators.maxLength(7),
        Validators.minLength(5),
        Validators.pattern(/^\d{5}(?:\d{2})?$/),
      ])
    })
  }

  /** ugh...hopefully ng team can improve this one day.
   * not great to type and seems like creating getters is boiler platish
   */
  get zipcode() {
    return this.zipcodeForm.get('zipcode');
  }

  addLocation(): void {
    const zipcode = this.zipcodeForm.get('zipcode')?.value;

    if ( this.zipcodeForm.valid) {
      this.zipcodeService.addZipcode(zipcode);
      this.zipcodeForm.reset();
    }

  }

}
