angular.module('AlertDemoGenerator').filter('getPaginationPages', function () {
  return function (pages, currentPage, pagesToDisplay) {
    if (currentPage < 2) {
      return pages.slice(0, pagesToDisplay);
    } else if (currentPage > pages.length + 1 - pagesToDisplay) {
      return pages.slice(pages.length - pagesToDisplay, pages.length - 1);
    } else {
      return pages.slice(currentPage - 2, currentPage + 1);
    }
  };
});
