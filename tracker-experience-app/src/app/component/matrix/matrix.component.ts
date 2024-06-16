import {Component, Input} from '@angular/core';
import {TechnologySkills} from "../../data/TechnologySkills";
import {MissingTechnologyInHeader, MissingTechnologyInProjects} from "../../data/MissingTechnology";

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.css'
})
export class MatrixComponent {
  @Input() technologySkills: TechnologySkills[] = []
  @Input() missingTechnologiesInHeader!: MissingTechnologyInHeader[];
  @Input() missingTechnologiesInProjects!: MissingTechnologyInProjects[];


}
