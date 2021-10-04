
const units =
{
    bytes: {
        en: "Bytes",
        ar: "بايتس"
    },
    kb: {
        en: "KB",
        ar: "كيلو بايت"
    },
    mb: {
        en: "MB",
        ar: "ميجا بايت"
    },
    gb: {
        en: "GB",
        ar: "جيجا بايت"
    }
};

export const FORMAT_BYETS = (bytes, lang = 'en') => {
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
    var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

    // return bytes if less than a KB
    if (bytes < kiloBytes) return bytes + units.bytes[lang];
    // return KB if less than a MB
    else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + units.kb[lang];
    // return MB if less than a GB
    else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + units.mb[lang];
    // return GB if less than a TB
    else return (bytes / gigaBytes).toFixed(decimal) + units.gb[lang];
}

