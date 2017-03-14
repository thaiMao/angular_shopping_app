import { type } from '../util';
export var ActionTypes = {
    INGREDIENTS_PREFETCHED: type('[Ingredients] Ingredients Prefetched')
};
export var IngredientsPrefetched = (function () {
    function IngredientsPrefetched(payload) {
        this.payload = payload;
        this.type = ActionTypes.INGREDIENTS_PREFETCHED;
    }
    return IngredientsPrefetched;
}());
//# sourceMappingURL=ingredients.js.map