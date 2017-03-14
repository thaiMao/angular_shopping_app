import { type } from '../util';
export var ActionTypes = {
    SALES: type('[Dashboard] Sales'),
    TOP_GROSSING: type('[Dashboard] Top Grossing'),
    RECENT_SEARCHES: type('[Dashboard] Recent Seaches'),
};
export var Sales = (function () {
    function Sales(payload) {
        this.payload = payload;
        this.type = ActionTypes.SALES;
    }
    return Sales;
}());
export var TopGrossing = (function () {
    function TopGrossing(payload) {
        this.payload = payload;
        this.type = ActionTypes.TOP_GROSSING;
    }
    return TopGrossing;
}());
export var RecentSearches = (function () {
    function RecentSearches(payload) {
        this.payload = payload;
        this.type = ActionTypes.RECENT_SEARCHES;
    }
    return RecentSearches;
}());
//# sourceMappingURL=dashboard.js.map