function SvgBatch(options) {
  this.options = options || {};
  this._svgDir = this.options.svgDir || 'assets/';
  this._outDir = this.options.outDir || 'images/';
  this._items = [];
}

SvgBatch.prototype.getItems = function () {
  return this._items;
};

SvgBatch.prototype.add = function (item) {
  return this._items.push(item);
};

SvgBatch.prototype.process = function (spawn) {
  this._items.forEach(function (item) {
    item.process(spawn);
  });
};

module.exports = SvgBatch;
