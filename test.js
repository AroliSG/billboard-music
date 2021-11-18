const billboards = require ('./app');

billboards (data => {
    console.log (data)
}, 
    {
       top: '200', // global - 200 - 100 - artist
       date: '2020-02-22' // date example: 2008-08-04 if not specifid will be todays date
    }
)