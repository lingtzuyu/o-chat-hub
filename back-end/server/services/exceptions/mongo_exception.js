const { Exception } = require('./exception');

class MongoException extends Exception {
  constructor(msg, log, table, queryType, functionName) {
    super(msg, log, functionName);
    this.table = table;
    this.queryType = queryType;
  }

  get fullLog() {
    return JSON.stringify({
      ...JSON.parse(super.fullLog),
      table: this.table,
      query: this.queryType,
    });
  }
}

module.exports = { MongoException };
