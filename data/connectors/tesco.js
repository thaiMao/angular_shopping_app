const rp = require('request-promise');
const PRIMARY_KEY = process.env.PRIMARY_KEY;
const BASE_URL = `https://dev.tescolabs.com/grocery/products/`;
const OFFSET = `offset=0`;
const LIMIT = `limit=6`;

const getTescoData = {
  getData(term) {

    var { term: query } = term;

    if(query) {
      const URL = `${BASE_URL}?query=${query}&${OFFSET}&${LIMIT}`;
      var options = {
        url: URL,
        headers: {
          'Ocp-Apim-Subscription-Key': PRIMARY_KEY
        },
        transform: function(body) {
          let {
                uk: {
                  ghs: {
                    products: {
                      results
                    }
                  }
                }
              } = JSON.parse(body);
          return results;
        }
      };

      return rp(options)
              .then((dataArray) => {

                var _data = [];

                dataArray.forEach(obj => {
                  if(obj.description === undefined) {

                    _data.push(Object.assign({}, obj, { description: [] }));

                  } else {
                    _data.push(Object.assign({}, obj))
                  };
                })

                return _data;
              });
    }

    return [];
  }
}

module.exports = getTescoData;
