const tile = ['',
'<div class="item">',
'  <div class="wrap">',
'    <img src="{{src}}" width="100">',
'    <h3 class="title">{{title}}</h3>',
'    <p class="author">{{author}}</p>',
'  </div>',
'</div>'].join('');

const $popular = $('.js-popular');
const $trending = $('.js-trending');
const $newnoteworthy = $('.js-new-noteworthy');
$.getJSON("/javascripts/ugc-comic-popular.json", data => {
  data.forEach(item => {
    $popular.append(templateCompile(tile, { src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $popular.append('<div class="item empty"/>');
});

$.getJSON('/javascripts/ugc-comic-trending.json', data => {
  data.forEach(item => {
    $trending.append(templateCompile(tile, { src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $trending.append('<div class="item empty"/>');
  //https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
  data.sort(() => Math.random() - 0.5).forEach(item => {
    $newnoteworthy.append(templateCompile(tile, { src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $newnoteworthy.append('<div class="item empty"/>');
});
