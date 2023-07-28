import { CatsBreedResponseModel } from "./cats-breed-response-model";

export interface CatsListResponseModel {
    id: string;
    url: string;
    breeds: CatsBreedResponseModel[];
    [key: string]: string | number | object;
}