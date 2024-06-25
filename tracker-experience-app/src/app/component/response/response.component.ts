import {Component, OnInit} from '@angular/core';
import {group} from "@angular/animations";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {TechnologyResponses} from "../../data/TechnologyResponses";
import {ResponsibilityService} from "../../service/technology-responsibility/responsibility.service";
import {map} from "rxjs";
import {Responsibility} from "../../data/Responsibility";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent implements OnInit{
  technologyFormGroup!: FormGroup;
  technologies!: Set<string>;
  technologyResponses!: Map<string, TechnologyResponses>;
  selectedTechnology!: TechnologyResponses | undefined;
  loadTechnologyResponsibilities!: boolean;

  constructor(private _formBuilder: FormBuilder,
              private _responsibilityService: ResponsibilityService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.technologyFormGroup = this._formBuilder.group({
      technology: new FormControl('', Validators.required),
    });
    this.technologies = new Set<string>();
    this.technologyResponses = new Map<string, TechnologyResponses>();
  }

  onSubmit() {
    if (this.technologyFormGroup.valid) {
      const technology = this.technologyFormGroup.get('technology')?.value;
      if (!this.technologies.has(technology)) {
        this.loadTechnologyResponsibilities = true;
        this._processResponsibility(technology);
      }
    }
  }

  removeAll() {
    this.technologies = new Set<string>();
    this.technologyResponses = new Map<string, TechnologyResponses>();
  }

  deleteTechnology(technology: string) {
    this.technologies.delete(technology);
    this.technologyResponses.delete(technology);
  }

  selectTechnology(technologyResponse: string) {
    this.selectedTechnology = this.technologyResponses.get(technologyResponse);
  }

  private _processResponsibility(technology: string) {
    this._responsibilityService.getTechnologyResponses(technology).pipe()
      .subscribe({
        next: (next) => {
          // Handle successful response here
          this.technologies.add(next.name);
          this.technologyResponses.set(next.name, next);
          console.log('Received response:', next);
          this.loadTechnologyResponsibilities = false;
        },
        error: (error) => {
          // Handle error here if not already handled in catchError
          console.error('Error in subscription:', error);
          this.deleteTechnology(technology);
        }
      });
  }

  protected readonly Array = Array;

  openSnackBarCopyMessage() {
    this._snackBar.open('Message was copied', 'OK', {
      duration: 2000
    });
  }

  selectedBack() {
    this.selectedTechnology = undefined;
  }
}
