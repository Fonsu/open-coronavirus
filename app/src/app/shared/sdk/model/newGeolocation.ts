/**
 * LoopBack Application
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * (Schema options: { title: \'NewGeolocation\' })
 */
export interface NewGeolocation { 
  [key: string]: object | any;


    id?: string;
    latitude?: number;
    longitude?: number;
    accuracy?: number;
    altitude?: number;
    bearing?: number;
    speed?: number;
    created?: Date;
    userId: string;
}

