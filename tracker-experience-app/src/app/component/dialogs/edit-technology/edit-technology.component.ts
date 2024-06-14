import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Group} from "../../../data/group";

@Component({
  selector: 'app-technology',
  templateUrl: './edit-technology.component.html',
  styleUrl: './edit-technology.component.css'
})
export class EditTechnologyComponent {
  readonly dialogRef = inject(MatDialogRef<EditTechnologyComponent>);
  readonly data = inject<Group>(MAT_DIALOG_DATA);
  technologies = model(this.data.technologies);
  name = model(this.data.name);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): Group {
    return {
      name: this.name(),
      technologies: this.technologies()
    }
  }
}
