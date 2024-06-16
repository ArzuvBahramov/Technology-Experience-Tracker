import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {ElectronService} from "../../service/electron/electron.service";
import {Project} from "../../data/Project";
import {MatDialog} from "@angular/material/dialog";
import {AppErrorDialogComponent} from "../dialogs/app-error-dialog/app-error-dialog.component";
import {TechnologySkills} from "../../data/TechnologySkills";
import {TechnologySkillsMessage} from "../../data/response/TechnologySkillsMessage";

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
  private groups: Group[] = [];
  private projects: Project[] = [];
  readonly dialog = inject(MatDialog);
  matrix: string = '';
  technologySkills!: TechnologySkills[];

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


    if (this._electronService.isElectron()) {
      this._electronService.getMessage( (event: Electron.IpcMessageEvent, message:any) => {
        let matrix = JSON.parse(message)['matrix']
        this.technologySkills = matrix.reduce((acc: TechnologySkills[], item:TechnologySkillsMessage) => {
          let group = acc.find(g => g.group === item.GROUP);
          if (!group && item.GROUP.trim() !== '') {
            group = { group: item.GROUP, skills: [] };
            acc.push(group);
          }
          acc[acc.length-1].skills.push({
            name: item.SKILLS,
            experience_in_years: parseInt(item["EXPERIENCE IN YEARS"]),
            last_used: parseInt(item["LAST USED"])
          });
          return acc;
        }, []);
        console.log(this.technologySkills);
      }, (event: Electron.IpcMessageEvent, message:any) => {
        console.log('error: '+ message)
      });
    }
  }

  constructor(private _formBuilder: FormBuilder,
              private _electronService: ElectronService) {
  }

  setGroup(data: Group[]) {
    this.groups = data;
  }

  setProject(data: Project[]) {
    this.projects = data;
  }

  onSelectionChange($event: StepperSelectionEvent) {
    this._checkImportedTechnologies();
    this._checkImportedProject();
    if ($event.selectedIndex === 2) {  // Index of the last step
      if (!this._isValid()) {
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
      groups: this.groups,
      projects: this.projects
    }

    if (this._electronService.isElectron()) {
      this._electronService.sendMessage('run-python', JSON.stringify(data))
    }
  }

  _isValid() {
    if (!this._checkImportedTechnologies() ||
        !this._checkImportedProject()) {
      this.showErrorDialog('Technologies and projects list should not be empty!')
      return false;
    }
    return true;
  }

  private _checkImportedTechnologies() {
    if (this.groups.length == 0) {
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

  reset() {
    this.stepper.reset();
  }
}
