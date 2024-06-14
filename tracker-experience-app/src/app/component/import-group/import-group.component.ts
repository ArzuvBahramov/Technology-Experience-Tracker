import {Component, EventEmitter, inject, Input, model, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {group} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {ImportGroupsComponent} from "../dialogs/import-groups/import-groups.component";

@Component({
  selector: 'app-import-group',
  templateUrl: './import-group.component.html',
  styleUrl: './import-group.component.css'
})
export class ImportGroupComponent implements OnInit{
  groups: Group[] = [];
  @Output() outGroup = new EventEmitter<Group[]>
  @Input() importGroup!: FormGroup;
  readonly technologies = signal('');
  readonly dialog = inject(MatDialog);


  ngOnInit(): void {

  }
  constructor(private _formBuilder: FormBuilder) {

  }

  onSubmit() {
    if (this.importGroup.valid) {
      const group: Group = {
        name: this.importGroup.get('groupName')?.value,
        technologies: this.importGroup.get('technologies')?.value,
      };
      this.groups.push(group)
      this.outGroup.emit(this.groups)
    }
  }

  protected readonly group = group;

  addAllTechnologies() {
    this.openDialog();
  }

  removeAll() {
    this.groups = [];
    this.outGroup.emit(this.groups)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImportGroupsComponent, {
      data: {technologies: this.technologies()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.technologies.set(result);
         this.parseText(result).map(group => {
           this.groups.push(group)
           this.outGroup.emit(this.groups)
         });
      }
    });
  }

  parseText(text: string): Group[] {
    const lines = text.split('\n').map(line => line.trim());
    const groups: Group[] = [];
    let currentGroup: Group | null = null;

    for (const line of lines) {
      if (line === '') {
        continue;
      }

      if (currentGroup == null) {
        currentGroup = {
          name: line,
          technologies: ''
        };
        groups.push(currentGroup);
      } else {
        currentGroup.technologies = line;
        currentGroup = null;
      }
    }

    return groups;
  }
}
