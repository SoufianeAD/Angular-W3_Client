import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatDialogModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
