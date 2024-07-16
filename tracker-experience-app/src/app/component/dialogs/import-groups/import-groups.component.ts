import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface GroupTechnologies {
  technologies: string
}
@Component({
  selector: 'app-import-groups',
  templateUrl: './import-groups.component.html',
  styleUrl: './import-groups.component.css'
})
export class ImportGroupsComponent {
  readonly dialogRef = inject(MatDialogRef<ImportGroupsComponent>);
  readonly data = inject<GroupTechnologies>(MAT_DIALOG_DATA);
  technologies = model(this.data.technologies);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
