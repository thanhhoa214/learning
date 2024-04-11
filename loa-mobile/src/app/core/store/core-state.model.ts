import { LanguageCode } from '@loa-shared/models/';

export interface CoreStateModel {
  language: LanguageCode;
  searchQuery: string;
}
export const initialState: CoreStateModel = {
  language: 'en',
  searchQuery: '',
};
