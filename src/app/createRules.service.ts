import { Injectable } from '@angular/core';

@Injectable()
export class CreateRulesService {
  createRule: (
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    eventDescription: string
  ) => {
    // tslint:disable-next-line:typedef
    return({
      startDate,
      startTime,
      endDate,
      endTime,
      eventDescription
    });
  };
};

