import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dealer } from 'src/app/model/dealer.model';
import { DealerService } from 'src/app/service/dealer.service';

@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent implements OnInit {
  dealerForm!: FormGroup;
  isEditMode: boolean = false;
  dealer!: Dealer;
  constructor(
    private service: DealerService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.dealerForm = new FormGroup({
      dealer_id: new FormControl(
        {
          value: '',
          disabled: true
        }),
      name: new FormControl('', Validators.required),
      number: new FormControl(''),
      email: new FormControl(''),
      notes: new FormControl(''),
      amount: new FormControl(0),
    });
    if (this.isEditMode) {
      this.dealerForm.patchValue(this.dealer);
    }
  }
  onSubmit() {
    if (this.isEditMode) {
      this.service.Edit(this.dealerForm.getRawValue()).subscribe(data => {
        this.activeModal.close();
      });
    } else {
      this.service.Add(this.dealerForm.value).subscribe(data => {
        this.activeModal.close();
      });
    }
  }

}
