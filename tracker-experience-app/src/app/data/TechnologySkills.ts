export interface Skill {
  name: string,
  experience_in_years: number,
  last_used: number
}

export interface TechnologySkills {
  group: string,
  skills: Skill[]
}
