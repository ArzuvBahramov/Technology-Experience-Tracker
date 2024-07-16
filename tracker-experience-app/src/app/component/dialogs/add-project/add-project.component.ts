import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Project} from "../../../data/Project";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  readonly dialogRef = inject(MatDialogRef<AddProjectComponent>);
  readonly data = inject<Project>(MAT_DIALOG_DATA);
  name = model(this.data.name);
  description = model(this.data.description);
  role  = model(this.data.role);
  period = model(this.data.period);
  responsibilities = model(this.data.responsibilities);
  environment = model(this.data.environment);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): Project {
    return {
      name: this.name(),
      description: this.description(),
      role: this.role(),
      period: this.period(),
      responsibilities: this.responsibilities(),
      environment: this.environment()
    }
  }
}
