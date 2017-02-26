import { Injectable } from '@angular/core';

import { Plant } from './plant';

const mockPlants: Plant[] = [
  {
    'id': 1,
    'height': 300,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'lettuce',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T01:03:49.000Z')
  }, {
    'id': 2,
    'height': 0,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'chives',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T19:17:12.000Z')
  }, {
    'id': 3,
    'height': 0,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'dill',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T19:17:19.000Z')
  }

]


@Injectable()
export class PlantService {
    getPlants(): Promise<Plant[]> {
		console.log(window.location.origin);
		return Promise.resolve(mockPlants);
    }
}