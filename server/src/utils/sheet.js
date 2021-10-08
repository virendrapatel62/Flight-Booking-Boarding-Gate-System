function createSheetSeries() {
  return arrayOf(30).map((_, index) => {
    if (index >= 26) {
      return String.fromCharCode(65) + String.fromCharCode(65 + index - 26);
    }
    return String.fromCharCode(65 + index);
  });
}

function arrayOf(length) {
  return new Array(length).fill().map((_, index) => index);
}

export { createSheetSeries, arrayOf };
