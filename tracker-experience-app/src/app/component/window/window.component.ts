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
import {MissingTechnologyInHeader, MissingTechnologyInProjects} from "../../data/MissingTechnology";
import {
  MissingTechnologyInHeaderMessage,
  MissingTechnologyInProjectsMessage
} from "../../data/response/MissingTechnology";

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
  missingTechnologiesInHeader!: MissingTechnologyInHeader[];
  missingTechnologiesInProjects!: MissingTechnologyInProjects[];

  constructor(private _formBuilder: FormBuilder,
              private _electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.initializeForms();
    this._electronService.onInit();

    if (this._electronService.isElectron()) {
      this.setupElectronMessageHandlers();
    }
  }

  private initializeForms(): void {
    this.importProjects = this._formBuilder.group({
      period: new FormControl(''),
      technologies: new FormControl('')
    });
    this.importGroup = this._formBuilder.group({
      groupName: new FormControl(''),
      technologies: new FormControl('')
    });
  }

  private setupElectronMessageHandlers(): void {
    this._electronService.getMessage(
      (event: Electron.IpcMessageEvent, message: any) => {
        this.handleMatrixMessage(message);
      },
      (event: Electron.IpcMessageEvent, message: any) => {
        this.showErrorDialog(message);
        console.log('error: ' + message);
      }
    );
  }

  private handleMatrixMessage(message: any): void {
    let matrix = JSON.parse(message);
    this.processTechnologySkillsMatrix(matrix['matrix']);
    this.processMissingTechnologiesInHeaderMatrix(matrix['missing_groups_technologies_matrix']);
    this.processMissingTechnologiesInProjectsMatrix(matrix['missing_technologies_matrix']);
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

  private sendData() {
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

  private showErrorDialog(message: string): void {
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

  private formatPeriods(periods: string[]): string {
    if (periods.length === 0) return '';

    // Sort periods in ascending order
    const sortedPeriods = periods.sort();

    // Get the first and last elements as the range
    const firstPeriod = sortedPeriods[0];
    const lastPeriod = sortedPeriods[sortedPeriods.length - 1];

    return `${firstPeriod} - ${lastPeriod}`;
  }

  private processTechnologySkillsMatrix(technologySkillsMatrix: any) {
    this.technologySkills = technologySkillsMatrix.reduce((acc: TechnologySkills[], item:TechnologySkillsMessage) => {
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
  }

  private processMissingTechnologiesInHeaderMatrix(missingTechnologiesInHeaderMatrix: any) {
    this.missingTechnologiesInHeader = missingTechnologiesInHeaderMatrix.reduce((acc: MissingTechnologyInHeader[], item:MissingTechnologyInHeaderMessage) => {
      console.log(acc)
      acc.push({
        technology: item.TECHNOLOGY,
        periods: this.formatPeriods(item.PERIODS),
        experience_in_years: parseInt(item.EXPERIENCE)
      });
      return acc;
    }, []);
  }

  private processMissingTechnologiesInProjectsMatrix(missingTechnologiesInProjectsMatrix: any) {
    this.missingTechnologiesInProjects = missingTechnologiesInProjectsMatrix.reduce((acc: MissingTechnologyInProjects[], item:MissingTechnologyInProjectsMessage) => {
      let group = acc.find(g => g.group === item.GROUP);
      if (!group && item.GROUP.trim() !== '') {
        group = { group: item.GROUP, technologies: [] };
        acc.push(group);
      }
      acc[acc.length-1].technologies.push(item["MISSING TECHNOLOGY"]);
      return acc;
    }, []);
  }
}
