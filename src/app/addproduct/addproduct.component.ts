import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup;
  public data: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.productForm = this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      description: [data ? data.description : '', Validators.required],
      price: [data ? data.price : 0, [Validators.required, Validators.min(0)]],
      quantity: [data ? data.quantity : 0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    // Implement save functionality
    this.dialogRef.close(this.productForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
