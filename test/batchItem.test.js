var BatchItem = require('../js/batchItem.js');
var batchItem;

describe('BatchItem', function () {
  beforeEach(function () {
    var source = 'example.svg';
    batchItem = new BatchItem({source: source});
  });

  it('has a default svg directory', function () {
    expect(batchItem._svgDir).to.equal('assets/');
  });

  it('has a default output directory', function () {
    expect(batchItem._outDir).to.equal('images/');
  });


  it('has a source filename', function () {
    expect(batchItem.source).to.equal('example.svg');
  });

  it('gets output name from source', function () {
    expect(batchItem._outBase).to.equal('example');
  });

  it('defaults to png format', function () {
    expect(batchItem._format).to.equal('png');
  });

  it('has no default sizes', function () {
    expect(batchItem._sizes).to.have.length(0);
  });

  describe('#nameAtSize', function () {
    it('returns the output filename for a given size', function () {
      var outputFile = batchItem.nameAtSize(42);
      expect(outputFile).to.equal('example42.png');
    });
  });

  describe('#eachSize', function () {
    it('calls callback with each size', function () {
      var spy = sinon.spy();
      var source = 'example.svg';
      var sizes = [16, 42, 64];
      batchItem = new BatchItem({source: source, sizes: sizes});
      batchItem.eachSize(spy);
      expect(spy).to.have.callCount(3);
      expect(spy).to.have.been.calledWith(16);
      expect(spy).to.have.been.calledWith(42);
      expect(spy).to.have.been.calledWith(64);
    });
  });

  describe('#getArgs', function () {
    it('returns correct command line arguments', function () {
      var args = batchItem.getArgs(42);
      var correctArgs = '-z -f assets/example.svg -w 42 -e images/example42.png';
      expect(args.join(' ')).to.equal(correctArgs);
    });
  });

  describe('#process', function () {
    it('does nothing witout any sizes', function () {
      var spawn = sinon.spy();
      batchItem.process(spawn);
      expect(spawn).to.not.have.been.called;
    });

    it('spawns inkscape for each size', function () {
      var spawn = sinon.spy();
      var fakeArgs = [];
      var source = 'example.svg';
      var sizes = [16, 42, 64];
      batchItem = new BatchItem({source: source, sizes: sizes});
      batchItem.getArgs = sinon.stub().returns(fakeArgs);
      batchItem.process(spawn);
      expect(batchItem.getArgs).to.have.been.calledWith(16);
      expect(batchItem.getArgs).to.have.been.calledWith(42);
      expect(batchItem.getArgs).to.have.been.calledWith(64);
      expect(spawn).to.have.callCount(3);
      expect(spawn).to.have.been.calledWith('inkscape', fakeArgs);
    });
  });
});
