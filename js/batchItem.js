function BatchItem(options) {
  this.source = options.source;
  this._svgDir = options.svgDir || 'assets/';
  this._outDir = options.outDir || 'images/';
  this._outBase = options.outBase || this.source.replace(/\.svg$/i,'');
  this._format = options.format || 'png';
  this._sizes = options.sizes || [];
}

BatchItem.prototype.nameAtSize = function (size) {
  return this._outBase + size + '.' + this._format;
};

BatchItem.prototype.eachSize = function (callback) {
  this._sizes.forEach(callback);
};

BatchItem.prototype.getArgs = function (size) {
  var inputPath = this._svgDir + this.source;
  var outputPath = this._outDir + this.nameAtSize(size);
  var args = ['-z', '-f', inputPath, '-w', size, '-e', outputPath];
  return args;
};

BatchItem.prototype.process = function (spawn) {
  this.eachSize(function (size) {
    var args = this.getArgs(size);
    spawn('inkscape', args);
  }.bind(this));
};

module.exports = BatchItem;
