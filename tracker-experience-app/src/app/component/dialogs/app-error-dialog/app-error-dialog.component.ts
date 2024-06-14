import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-app-error-dialog',
  templateUrl: './app-error-dialog.component.html',
  styleUrl: './app-error-dialog.component.css'
})
export class AppErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AppErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
