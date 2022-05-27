const cheerio = require('cheerio');
const axios = require ('axios').default;

const api_url = 'https://www.billboard.com/charts';

    /**
     * @param {NameId} chartTypes
    **/
//singa tu madre
const chartTypes = {
    '100': 'hot-100/',
    '200': 'the-billboard-200/',
    'artist': 'artist-100/',
    'global': 'billboard-global-200/',
}

    /**
     * @param {*} cheerioId 
     * @param {*} $ 
     * @returns 
    **/
 
const Song = (cheerioId, $) => {
    const resolver = (name) => {
        let e;
            // cover image
        if (name === '.c-lazy-image__img' ) e =  $(name, cheerioId) ["0"] ['attribs'] ['data-lazy-src'];
            // the rest of elements
        else e = $(name, cheerioId).text ().replace(/\r?\n|\r/g, " ");

        return e == '' ? null : e;
    }

    return {
        title: resolver ('.c-title'),
        artist: resolver ('.c-label'),
        image: resolver ('.c-lazy-image__img')
    }
};

    /**
     * @param {function} callback 
     * @param {Object} obj 
    **/

module.exports = async (callback, obj) => {
    const map = [];
    if (obj.date && obj.date.split ('-').length < 3)  throw 'date is invalid, it should looks like year-month-day';
    
    axios.get (`${api_url}/${chartTypes [obj.top ? obj.top : 100]}${obj.date ? obj.date : '/'}`)
    .then (res => {
        const $             = cheerio.load (res.data);
        const chartList     = $('.o-chart-results-list-row-container');

        for (let i = 0; i < chartList.length; i++) {
            let song = Song (chartList [i], $);
            if (song.title) {
                let a = $(this)
                    // only when artist chart is requested
                if (obj.top == "artist") {
                    map.push ({
                        artist: song.title.trim (),
                        rank: map.length + 1
                    });
                }
                    // global, hot 100 hot 200
                else {
                    map.push ({
                        title: song.title.trim (),
                        artist: song.artist,
                        rank: map.length+1,
                        image: song.image
                    });
                }
            };
            if (i == chartList.length-1) callback (map);
        }
        if (chartList.length === 0) callback ({ 
            error: false, 
            status: 200, 
            message: 'connection was stablished but not data was received.'
        });
    }) 
        .catch (e => {callback ({ 
            error: true, 
            status: 404, 
            message: 'double check your provided date or chart'
        })
    }
    );
}
 