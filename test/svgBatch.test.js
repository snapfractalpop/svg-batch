var SvgBatch = require('../js/svgBatch.js');
var svgBatch;

describe('SvgBatch', function () {
  beforeEach(function () {
    svgBatch = new SvgBatch();
  });

  it('has an initially empty items array', function () {
    expect(svgBatch._items).to.be.an('Array');
    expect(svgBatch._items).to.have.length(0);
  });

  describe('#getItems', function () {
    it('returns the item array', function () {
      expect(svgBatch.getItems()).to.equal(svgBatch._items);
    });
  });

  describe('#add', function () {
    it('adds an item to the batch', function () {
      var item = {};
      svgBatch.add(item);
      expect(svgBatch._items).to.include(item);
    });
  });

  describe('#process', function () {
    it('processes all sizes of all items in batch', function () {
      var spawn = {};
      var spy1 = sinon.spy();
      var spy2 = sinon.spy();
      var item1 = {process: spy1};
      var item2 = {process: spy2};
      svgBatch._items = [item1, item2];

      svgBatch.process(spawn);
      expect(spy1).to.have.been.calledWith(spawn);
      expect(spy2).to.have.been.calledWith(spawn);
    });
  });
});

