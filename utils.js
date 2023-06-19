function IsNullOrEmpty(value) {
    return value === undefined || value == null || value.toString().trim() === "";
}

module.exports = {
    IsNullOrEmpty
}