
export class Validator {
  public properties: string[]; // expected properties from JSON response
  public propertiesAuto: string[]; // primitive properties to auto-inject
  public name: string; // object name

  constructor(name: string, properties: string[], propertiesAuto: string[]) {
    this.properties = properties;
    this.propertiesAuto = propertiesAuto;
    this.name = name;
  }
}

export abstract class ActiveModel {
  public jsonDetection: boolean = true;

  constructor(objectJSON: any, validator: Validator) {
    if (objectJSON) {
      const responseKeys = Object.keys(objectJSON);

      for (const key of responseKeys) {
        // Check if server send extra info
        if (validator.properties.includes(key)) {
          if (validator.propertiesAuto.includes(key)) {
            // @ts-ignore
            this[key] = objectJSON[key];
          }
        } else {
          console.warn(`Extra data in response '${validator.name}': '${key}' not recognized for model`);
        }
      }

      // Check if server send less info
      for (const key of validator.properties) {
        if (!responseKeys.includes(key)) {
          console.warn(`Missing data in response '${validator.name}': '${key}' expected for model`);
        }
      }
    }
  }

  public static hoursToSeconds(hours: number): number {
    return hours * 3600;
  }

  public static workDayToSeconds(days: number): number {
    return days * 28800;
  }
}
