import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Project} from "../../data/Project";
import {AddProjectComponent} from "../dialogs/add-project/add-project.component";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ProjectMapperService} from "../../service/mapper/project-mapper.service";

@Component({
  selector: 'app-sv',
  templateUrl: './sv.component.html',
  styleUrl: './sv.component.css'
})
export class SvComponent implements OnInit {
  projectFormGroup!: FormGroup;
  readonly dialog = inject(MatDialog);
  projects!: Project[];

  protected readonly Array = Array;

  constructor(private _formBuilder: FormBuilder,
              private _clipboard: ClipboardService,
              private _projectMapper: ProjectMapperService) {
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.projectFormGroup = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.projects = [];
  }
  removeAll() {
    this.projects = [];
  }

  onSubmit() {
    const project: Project = {
      name: '',
      description: '',
      role: '',
      period: '',
      responsibilities: [],
      environment: []
    };
    this.addProject(project);
  }

  pasteProjects() {
    this._clipboard.getClipboardText().then(
      next => {
        console.log(next);
        this._projectMapper.textParseToProjects(next).forEach(project => {
          this.projects.push(project);
        });
        console.log(this.projects);
      },
      err => {
        console.log("Error on gettext text from buffer.", err)
      }
    )
  }

  addProject(project: Project) {
    const name = project.name;
    const description = project.description;
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '900px',
      height: '500px',
      data: {name: name, description: description},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        this.projects.push(result);
      }
    });
  }

  translateProjects() {

  }

  transformProjects() {

  }

  validateProjects() {

  }

  trackerExperienceProjects() {

  }
}
