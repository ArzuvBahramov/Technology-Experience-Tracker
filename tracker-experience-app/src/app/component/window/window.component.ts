import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {ElectronService} from "../../service/electron/electron.service";
import {Project} from "../../data/Project";

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

  ngOnInit(): void {
    this.importProjects = this._formBuilder.group({
      period: new FormControl('', [Validators.required]),
      technologies: new FormControl('', [Validators.required])
    });
    this.importGroup = this._formBuilder.group({
      groupName: new FormControl('', [Validators.required]),
      technologies: new FormControl('', [Validators.required])
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
    if ($event.selectedIndex === 2) {  // Index of the last step
      if (!this.importGroup.valid || !this.importProjects.valid) {
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
}
