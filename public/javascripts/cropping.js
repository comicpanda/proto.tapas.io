const image = $('#image');
const cropper = new Cropper(image[0], {
  aspectRatio: 1.91 / 1,
  zoomable: false
});

const $download = $('.download').on('click', () => {
  $download[0].href = cropper.getCroppedCanvas().toDataURL();
  $download[0].download = 'crop.jpg';
});

