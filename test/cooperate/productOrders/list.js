const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#cooperate/productOrders/list', function () {
  before(async () => {
    constance = await init();
  });

  after(async () => {
    const { browser } = constance;
    await browser.close();
  });

  describe('#UI test', function () {
    it('table should hava 11 th', async () => {
      const { page, browser } = constance;
      await page.goto(constant.host + 'cooperate/productOrders/list');
      await timeout(1000);
      const ths = await page.$$('.ant-table-thead th');
      assert.equal(ths.length, 1, 'ths = 11');
      await page.screenshot({ path: filename + '.png' });
    })
  });
});
