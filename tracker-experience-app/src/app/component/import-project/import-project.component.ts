import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrackerExperience} from "../../data/TrackerExperience";
import {EditTechnologyComponent} from "../dialogs/edit-technology/edit-technology.component";
import {MatDialog} from "@angular/material/dialog";
import {EditProjectComponent} from "../dialogs/edit-project/edit-project.component";
import {group} from "@angular/animations";

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrl: './import-project.component.css'
})
export class ImportProjectComponent implements OnInit{
  projects: TrackerExperience[] = [];
  @Output() outProject = new EventEmitter<TrackerExperience[]>
  @Input() importProjects!: FormGroup;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {

  }

  constructor(private _formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.importProjects.valid) {
      const project: TrackerExperience = {
        period: this.importProjects.get('period')?.value,
        technologies: this.importProjects.get('technologies')?.value,
      };
      this.projects.push(project)
      this.outProject.emit(this.projects)
    }
  }

  editProject(project: TrackerExperience) {
    const period = project.period;
    const technologies = project.technologies
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '600px',
      height: '500px',
      data: {period: period, technologies: technologies},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        project.period = result.period;
        project.technologies = result.technologies;
      }
      this.outProject.emit(this.projects);
    });
  }

  deleteProject(project: TrackerExperience) {
    const index = this.projects.findIndex(p => p === project);
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.outProject.emit(this.projects);
    }
  }

  removeAll() {
    this.projects = [];
    this.outProject.emit(this.projects);
  }
}
