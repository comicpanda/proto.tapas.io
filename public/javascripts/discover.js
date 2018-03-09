// $('.carousel').carousel({
//   interval: false
// });
const newUpdateMarkup = ['',
'<div class="item">',
'  <div class="wrap">',
'    <img src="{{src}}">',
'    <div class="desc">',
'      <h3 class="title">{{title}}</h3>',
'      <p class="up">{{hour}} hours ago</p>',
'    </div>',
'  </div>',
'</div>'].join('');

const popularMarkup = ['',
'<div class="item">',
'  <div class="wrap">',
'    <img src="{{src}}">',
'    <div class="desc">',
'      <h3 class="title">{{title}}</h3>',
'      <p class="author">{{author}}</p>',
'    </div>',
'  </div>',
'</div>'].join('');

const trendingMarkup = ['',
'<div class="arow">',
  '<span class="num">{{num}}</span>',
  '<img src="{{src}}" height="70" class="rounded">',
  '<div class="desc">',
    '<h3 class="title">{{title}}</h3>',
    '<p class="author">{{author}}</p>',
    '<p class="stats">',
      '<img src="/images/view.png" width="18" height="12">&nbsp;15.1k<img class="ml-3" src="/images/bookmarked.png" width="12" height="18">&nbsp;11k</p>',
  '</div>',
'</div>'].join('');

const weeklyMarkup = ['',
'<div class="item">',
'  <div class="wrap">',
'    {{week}}',
'    <img src="{{src}}">',
'    <div class="desc">',
'      <h3 class="title">{{title}}</h3>',
'      <p class="author">{{author}}</p>',
'    </div>',
'  </div>',
'</div>'].join('');

const $newUpdate = $('.js-new-update');
const $trending = $('.js-trending');
const $popular = $('.js-popular');
const $weekly = $('.js-weekly');
const templateCompile = (str, params) => {
  if(params === undefined || params === null) {
    return str;
  }

  if (typeof params === 'object') {
    params = params || {};
    const replaceFn = function (key, value) {
      str = str.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'gi'), value);
    };
    $.each(params, function (key, value) {
      if (value === undefined) {
        value = '';
      }
      if (value !== null && typeof value === 'object') {
        $.each(value, function (_key, _value) {
          replaceFn(key + '.' + _key, _value);
        });
      } else {
        replaceFn(key, value);
      }
    });
    return str.replace(/\{\{\w+\}\}/g, '');
  } else {
    return str.replace(/\{\{\w+\}\}/g, params);
  }
};
const times = [2,4,3,6];
const weekly = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
$.getJSON( "/javascripts/new-update.json", data => {
  $newUpdate.append('<div class="item empty"/>');
  data.forEach((item, idx ) => {
    $newUpdate.append(templateCompile(newUpdateMarkup, { hour: times[idx % 4], src: item.book_cover_url , title: item.title}));
  });
  $newUpdate.append('<div class="item empty"/>');
});

$.getJSON( '/javascripts/popular.json', data => {
  $popular.append('<div class="item empty"/>');
  data.forEach(item => {
    $popular.append(templateCompile(popularMarkup, { src: item.book_cover_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $popular.append('<div class="item empty"/>');
});
let lastWeekDay = '';
$.getJSON( '/javascripts/weekly.json', data => {
  $weekly.append('<div class="item empty"/>');
  data.forEach((item, idx) => {
    let weekDay = weekly[Math.floor(idx/3)];
    if (lastWeekDay !== weekDay) {
      lastWeekDay = weekDay;
      weekDay = `<p class="item-label"><span class="item-label-inner">${weekDay}</span></p>`;
    } else {
      weekDay = '';
    }
    $weekly.append(templateCompile(weeklyMarkup, { week: weekDay, src: item.book_cover_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $weekly.append('<div class="item empty"/>');
});

$.getJSON( '/javascripts/trending.json', data => {
  const first = data.slice(0, 5);
  const second = data.slice(5, 10);
  const $first = $trending.find('.js-first');
  const $second = $trending.find('.js-second');

  first.forEach((item, idx) => {
    $first.append(templateCompile(trendingMarkup, { num: idx + 1, src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}))
  });
  second.forEach((item, idx) => {
    $second.append(templateCompile(trendingMarkup, { num: idx + 6, src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}))
  });
});
