import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Project} from "../../../data/Project";

@Component({
  selector: 'app-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
  readonly dialogRef = inject(MatDialogRef<EditProjectComponent>);
  readonly data = inject<Project>(MAT_DIALOG_DATA);
  technologies = model(this.data.technologies);
  period = model(this.data.period);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): Project {
    return {
      period: this.period(),
      technologies: this.technologies()
    }
  }
}
