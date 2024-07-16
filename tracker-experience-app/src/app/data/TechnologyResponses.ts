import {Responsibility} from "./Responsibility";
import {TechnologyGroup} from "./TechnologyGroup";

export interface TechnologyResponses {
  id: string,
  name: string,
  info: string,
  made: string,
  group: TechnologyGroup,
  responsibilities: Responsibility[]
}
