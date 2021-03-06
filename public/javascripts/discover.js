$('.carousel').carousel({
  interval: false
});
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
'<div class="arow align-items-start">',
'  <img src="{{src}}" height="110">',
'  <div class="desc">',
'    <h3 class="title">{{title}}</h3>',
'    <p class="author">{{author}}</p>',
'    <p class="stats">',
'      <img src="/images/view.png" width="18" height="12">&nbsp;15.1k<img class="ml-3" src="/images/bookmarked.png" width="12" height="18">&nbsp;11k',
'    </p>',
'  </div>',
'</div>'].join('');

const $newUpdate = $('.js-new-update');
const $trending = $('.js-trending');
const $popular = $('.js-popular');
const $weekly = $('.js-weekly');
const times = [2,4,3,6];
const weekly = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const weeklySelector = ['fri', 'sat', 'sun', 'mon', 'tue', 'wed', 'thr'];
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
  data.forEach((item, idx) => {
    const i = Math.floor(idx/3);
    let weekDay = weekly[i];
    if (lastWeekDay !== weekDay) {
      lastWeekDay = weekDay;
      weekDay = `<p class="item-label"><span class="item-label-inner">${weekDay}</span></p>`;
    } else {
      weekDay = '';
    }
    $weekly.find(`.js-${weeklySelector[i]}`).append(templateCompile(weeklyMarkup, { week: weekDay, src: item.book_cover_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
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
