const moment = require('moment')
const Promise = require('bluebird')
const axios = require('axios')
const cheerio = require('cheerio')

const amqp = require('amqp-connection-manager')

const connection = amqp.connect(['amqp://crm:crm@localhost'])

module.exports = handler

async function handler ({ startDate = '2022-02-01', currencyId = 'eur' }) {
  const start = moment(startDate)
  const end = moment()
  const days = Math.abs(end.diff(start, 'd') + 1)

  const tempArray = Array.from(Array(days).keys())
  const dateLit = tempArray.map(it => moment(startDate).add(it, 'days').format('YYYY-MM-DD'))

  var channelWrapper = connection.createChannel({
    json: true,
    setup: function (channel) {
      return channel.assertQueue('tasks:set-currencies', { durable: true });
    },
  });

  await Promise.map(dateLit, async d => {
    try {
      const res = await scrape(d, currencyId)

      channelWrapper
        .sendToQueue('tasks:set-currencies', { data: res, date: d, currencyId })
        .then(function () {
          return console.log('Message was sent!  Hooray!') //eslint-disable-line
        })

    } catch (e) {
      console.error('failed date', d, e) //eslint-disable-line
    }
  }, { concurrency: 10 })
}

async function scrape(date, currencyId = 'eur') {
  const url = 'https://minfin.com.ua/ua/currency/banks/' + currencyId + '/' + date + '/';
  let getData = html => {
    let data = [];
    const $ = cheerio.load(html);
    $('.row--collapse').each((i, elem) => {
      data.push({
        bank_name : $(elem).find('.mfcur-table-bankname').text().replace(/\n/g,'').trim(),
        bay : $(elem).find('.mfm-pr0').text().trim().trim().trim().slice(0,5).trim(),
        sale : $(elem).find('.mfm-pl0').text().trim().trim().trim().slice(0,5).trim(),
        date: date,
        currency_id: currencyId,
      });
    });
    return data;
  }

  return axios.get(url)
    .then(response => {
      let html = response.data;
      return getData(html)
    })
    .catch(error => {
      console.log(error) //eslint-disable-line
    })
}
