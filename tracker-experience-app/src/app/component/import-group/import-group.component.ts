import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../data/group";
import {group} from "@angular/animations";

@Component({
  selector: 'app-import-group',
  templateUrl: './import-group.component.html',
  styleUrl: './import-group.component.css'
})
export class ImportGroupComponent implements OnInit{
  groups: Group[] = [];
  @Output() outGroup = new EventEmitter<Group[]>
  @Input() importGroup!: FormGroup;

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
}
