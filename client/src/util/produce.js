// import { enableES5, produce } from "immer";

// export default (...args) => {
//   enableES5();
//   return produce(...args);
// };
import { enableES5, produce as immerProduce } from "immer";

const produce = (...args) => {
  enableES5();
  return immerProduce(...args);
};

export default produce;