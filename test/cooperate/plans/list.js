const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#cooperate/plans/list', function () {
  before(async () => {
    constance = await init();
  });

  after(async () => {
    const { browser } = constance;
    await browser.close();
  });

  describe('#UI test', function () {
    it('this page should have 4 labels', async function () {
      const { page, browser } = constance;
      await page.goto(constant.host + 'cooperate/plans/list');
      await timeout(1000);
      const labels = await page.$$('.ant-radio-group label');
      assert.equal(labels.length, 0, 'lable = 4');
      await page.screenshot({ path: filename + '.png' });
    });
    it('table should hava 10 th', async () => {
      const { page, browser } = constance;
      const ths = await page.$$('.ant-table-thead th');
      assert(ths.length == 10, 'ths = 10');
    })
  });
});
