export interface Project {
  methodId?: string;
  typeCase?: string;
  typeId?: string;
  goodsId?: string;
  projectId?: string;
  projectGovStatus?: string;
  planId?: string;
  budgetYear?: string;
  oldIdFrom?: string;
  projectName?: string;
  sourceBudget?: number;
  sourceBudgetIncome?: string;
  sourceNonbudget?: number;
  sourceNonbudgetIncome?: string;
  consider_method?: number;
  method_paid?: string;
  issend?: string;
  senddate?: string;
  egpjson?: string;
  officecode?: string;
  projectno?: number;
  takenote?: string;
}
export interface GoodsDetail {
  matid?: number;
  projectno?: number;
  productname?: string;
  gpsccode?: string;
  dbid?: string;
  a_Qty?: number;
  a_pack?: string;
  Qty?: number;
  pack?: string;
  addition_info?: false;
  price?: number;
  price_estimate?: number;
  source?: string;
  gpsc?: string;
}
export interface GoodsJson {
  code?: string;
  Qty?: string;
  pack?: string;
  addition_info?: boolean;
  price?: string;
  price_estimate?: string;
  source?: string;
}

export interface PdJson {
  methodId?: string;
  typeCase?: string;
  typeId?: string;
  goodsId?: string;
  projectGovStatus?: string;
  planId?: string;
  budgetYear?: string;
  oldIdFrom?: string;
  projectName?: string;
  sourceBudget?: string;
  sourceBudgetIncome?: string;
  sourceNonbudget?: string;
  sourceNonbudgetIncome?: string;
  consider_method?: string;
  method_paid?: string;
  goodsDetail?: {
    code?: string;
    Qty?: string;
    pack?: string;
    addition_info?: boolean;
    price?: string;
    price_estimate?: string;
    source?: string;
  }[];
}
