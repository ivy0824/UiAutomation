const deleteFromRight = async(page, tagName) => {
    const input = await page.$eval(tagName, el => el.value);
    await  page.focus(tagName);
    await page.keyboard.down('Shift');
    for(let i= 0; i< input.length; i++){
          //console.log('位移数', i)
          await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('Delete');
}

const deleteFromLeft = async(page, tagName) => {
    const input = await page.$eval(tagName, el => el.value);
    await  page.focus(tagName);
    await page.keyboard.down('Shift');
    for(let i= 0; i< input.length; i++){
          //console.log('位移数', i)
          await page.keyboard.press('ArrowLeft');
    }
    await page.keyboard.press('Delete');
}

module.exports={
    deleteFromRight,
    deleteFromLeft
};





  