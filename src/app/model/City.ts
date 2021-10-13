import {Coordinates} from './Coordinates';
import {Government} from './Government';
import {StandardOfLiving} from './StandardOfLiving';
import {Human} from './Human';

export class City {
  id: number;
  name: string;
  coordinates: Coordinates;
  creationDate: Date;
  area: number;
  population: number;
  metersAboveSeaLevel: number;
  timezone: number;
  government: Government;
  standardOfLiving: StandardOfLiving;
  governor: Human;


  constructor(id: number, name: string, coordinates: Coordinates, creationDate: Date, area: number, population: number, metersAboveSeaLevel: number, timezone: number, government: Government, standardOfLiving: StandardOfLiving, governor: Human) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.creationDate = creationDate;
    this.area = area;
    this.population = population;
    this.metersAboveSeaLevel = metersAboveSeaLevel;
    this.timezone = timezone;
    this.government = government;
    this.standardOfLiving = standardOfLiving;
    this.governor = governor;
  }
}
