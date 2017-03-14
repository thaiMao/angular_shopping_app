export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: Array<string>;
  healthLabels: Array<string>;
  cautions: Array<string>;
  ingredientLines: Array<string>;
  ingredients: Array<Ingredient>;
  calories: number;
  totalWeight: number;
  totalNutrients: Array<Nutrients>;
  totalDaily: Array<Daily>;
  digest: Array<Digest>;
  bookmarked: boolean;
  bought: boolean;
}

interface Ingredient {
  text: string;
  weight: number;
}

interface Nutrients {
  ENERC_KCAL: LabelQuantityUnit;
  FAT: LabelQuantityUnit;
  FASAT: LabelQuantityUnit;
  FATRN: LabelQuantityUnit;
  FAMS: LabelQuantityUnit;
  FAPU: LabelQuantityUnit;
  CHOCDF: LabelQuantityUnit;
  FIBTG: LabelQuantityUnit;
  SUGAR: LabelQuantityUnit;
  PROCNT: LabelQuantityUnit;
  CHOLE: LabelQuantityUnit;
  NA: LabelQuantityUnit;
  CA: LabelQuantityUnit;
  MG: LabelQuantityUnit;
  K: LabelQuantityUnit;
  FE: LabelQuantityUnit;
  ZN: LabelQuantityUnit;
  P: LabelQuantityUnit;
  VITA_RAE: LabelQuantityUnit;
  VITC: LabelQuantityUnit;
  THIA: LabelQuantityUnit;
  RIBF: LabelQuantityUnit;
  NIA: LabelQuantityUnit;
  VITB6A: LabelQuantityUnit;
  FOLDFE: LabelQuantityUnit;
  VITB12: LabelQuantityUnit;
  VITD: LabelQuantityUnit;
  TOCPHA: LabelQuantityUnit;
  VITK1: LabelQuantityUnit;
}

interface LabelQuantityUnit {
  label: string;
  quantity: number;
  unit: string;
}

interface Daily {
  ENERC_KCAL: LabelQuantityUnit;
  FAT: LabelQuantityUnit;
  FASAT: LabelQuantityUnit;
  CHOCDF: LabelQuantityUnit;
  FIBTG: LabelQuantityUnit;
  PROCNT: LabelQuantityUnit;
  CHOLE: LabelQuantityUnit;
  NA: LabelQuantityUnit;
  CA: LabelQuantityUnit;
  MG: LabelQuantityUnit;
  K: LabelQuantityUnit;
  FE: LabelQuantityUnit;
  ZN: LabelQuantityUnit;
  P: LabelQuantityUnit;
  VITA_RAE: LabelQuantityUnit;
  VITC: LabelQuantityUnit;
  THIA: LabelQuantityUnit;
  RIBF: LabelQuantityUnit;
  NIA: LabelQuantityUnit;
  VITB6A: LabelQuantityUnit;
  FOLDFE: LabelQuantityUnit;
  VITB12: LabelQuantityUnit;
  VITD: LabelQuantityUnit;
  TOCPHA: LabelQuantityUnit;
  VITK1: LabelQuantityUnit;
}

interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub: Array<Sub>;
}

interface Sub {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}
