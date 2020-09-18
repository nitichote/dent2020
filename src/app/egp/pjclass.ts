import * as m from "./models";
export class Pjt implements m.Project {
  methodId = "";
  typeCase = "";
  typeId = "";
  goodsId = "";
  projectId = "";
  projectGovStatus = "";
  planId = "";
  budgetYear = "";
  oldIdFrom = "";
  projectName = "";
  sourceBudget = 0;
  sourceBudgetIncome = "";
  sourceNonbudget = 0;
  sourceNonbudgetIncome = "";
  consider_method = 0;
  method_paid = "";
  issend = "";
  senddate = "";
  egpjson = "";
  officecode = "";
}
export class Gdt implements m.GoodsDetail {
  matid = 0;
  projectno = 0;
  productname = "";
  gpsccode = "";
  dbid = "";
  a_Qty = 0;
  a_pack = "";
  Qty = 0;
  pack = "";
  addition_info?: false;
  price = 0;
  price_estimate = 0;
  source = "";
}
