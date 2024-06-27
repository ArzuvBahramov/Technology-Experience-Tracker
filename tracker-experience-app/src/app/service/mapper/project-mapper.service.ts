import {Injectable} from '@angular/core';
import {Project} from "../../data/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectMapperService {

  constructor() { }

  public textParseToProjects(text: string): Project[] {
    const projects: Project[] = [];
    const projectSections = text.split(/(?=^[A-Z ]+$)/gm).map(section => section.trim()).filter(section => section.length > 0);

    projectSections.forEach(section => {
      const project = this.textParseToProject(section);

      projects.push(project);
    });
    return projects;
  }

  textParseToProject(text: string): Project {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const name = lines[0];
    const description = lines[1];
    const role = lines[3];
    const period = lines[5];

    const responsibilitiesStartIndex = lines.indexOf('Responsibilities') + 1;
    const environmentStartIndex = lines.indexOf('Environment') + 1;

    const responsibilities = lines.slice(responsibilitiesStartIndex, environmentStartIndex - 1);
    const environment = lines[environmentStartIndex].split(', ');

    return {
      name,
      description,
      role,
      period,
      responsibilities,
      environment
    };
  }


}
