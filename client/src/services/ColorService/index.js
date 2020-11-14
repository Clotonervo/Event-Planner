/**
 * Contains common methods for dealing with colors.
 */
var ColorService = {
  formatHex: function (value) {
    if (!value.includes("#")) {
      return "#" + value;
    }

    return value;
  },

  formatRawHex: function (value) {
    return value.replace("#", "");
  },
};

export default ColorService;
