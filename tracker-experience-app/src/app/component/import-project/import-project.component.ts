import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {Project} from "../../data/Project";

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrl: './import-project.component.css'
})
export class ImportProjectComponent implements OnInit{
  projects: Project[] = [];
  @Output() outProject = new EventEmitter<Project[]>
  @Input() importProjects!: FormGroup;

  ngOnInit(): void {

  }

  constructor(private _formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.importProjects.valid) {
      const project: Project = {
        period: this.importProjects.get('period')?.value,
        technologies: this.importProjects.get('technologies')?.value,
      };
      this.projects.push(project)
      this.outProject.emit(this.projects)
    }
  }
}
