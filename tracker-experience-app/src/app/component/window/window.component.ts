import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {ElectronService} from "../../service/electron/electron.service";
import {Project} from "../../data/Project";
import {MatDialog} from "@angular/material/dialog";
import {AppErrorDialogComponent} from "../dialogs/app-error-dialog/app-error-dialog.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.css',

  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class WindowComponent implements OnInit{
  @ViewChild('stepper') stepper!: MatStepper;
  importGroup!:FormGroup;
  importProjects!:FormGroup;
  private group: Group[] = [];
  private projects: Project[] = [];
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.importProjects = this._formBuilder.group({
      period: new FormControl(''),
      technologies: new FormControl('')
    });
    this.importGroup = this._formBuilder.group({
      groupName: new FormControl(''),
      technologies: new FormControl('')
    });
    this._electronService.onInit();
  }

  constructor(private _formBuilder: FormBuilder,
              private _electronService: ElectronService) {
  }

  setGroup(data: Group[]) {
    this.group = data;
  }

  setProject(data: Project[]) {
    this.projects = data;
  }

  onSelectionChange($event: StepperSelectionEvent) {
    this._checkImportedTechnologies();
    this._checkImportedProject();
    if ($event.selectedIndex === 2) {  // Index of the last step
      if (!this.isValid()) {
        this.importGroup.markAllAsTouched();
        this.importProjects.markAllAsTouched();
        setTimeout(() => {
          this.stepper.selectedIndex = $event.previouslySelectedIndex;
        }, 0);
        return;
      }

      this.sendData();
    }
  }

  sendData() {
    const data = {
      groups: this.group,
      projects: this.projects
    }

    if (this._electronService.isElectron()) {
      this._electronService.sendMessage('run-python', JSON.stringify(data))
      this._electronService.getMessage();
    }
  }

  isValid() {
    if (!this._checkImportedTechnologies() ||
        !this._checkImportedProject()) {
      this.showErrorDialog('Technologies and projects list should not be empty!')
      return false;
    }
    return true;
  }

  private _checkImportedTechnologies() {
    if (this.group.length == 0) {
      this.importGroup.setErrors({'required': true});
      return false;
    }
    return true;
  }

  private _checkImportedProject() {
    if (this.projects.length == 0) {
      this.importProjects.setErrors({'required': true});
      return false;
    }
    return true;
  }

  showErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(AppErrorDialogComponent, {
      width: '400px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
