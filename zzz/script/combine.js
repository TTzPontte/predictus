const sharp = require('sharp');
const fs = require('fs');

const image1 = '/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/output/page-1.jpg';
const image2 = '/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/output/page-2.jpg';
const image3 = '/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/output/page-3.jpg';

sharp(image1)
    .jpeg()
    .toBuffer()
    .then((data1) => {
        console.log('Image 1 dimensions:', sharp(data1).metadata.width, 'x', sharp(data1).metadata.height);

        return sharp(image2)
            .jpeg()
            .toBuffer()
            .then((data2) => {
                console.log('Image 2 dimensions:', sharp(data2).metadata.width, 'x', sharp(data2).metadata.height);

                return sharp(image3)
                    .jpeg()
                    .toBuffer()
                    .then((data3) => {
                        console.log('Image 3 dimensions:', sharp(data3).metadata.width, 'x', sharp(data3).metadata.height);

                        const finalImage = sharp({
                            create: {
                                width: Math.max(sharp(data1).metadata.width, sharp(data2).metadata.width, sharp(data3).metadata.width),
                                height: sharp(data1).metadata.height + sharp(data2).metadata.height + sharp(data3).metadata.height,
                                channels: 3,
                                background: { r: 255, g: 255, b: 255 }
                            }
                        });
                        console.log('Final image dimensions:', finalImage.metadata.width, 'x', finalImage.metadata.height);

                        return finalImage
                            .composite([
                                { input: data1, gravity: 'northwest' },
                                { input: data2, gravity: 'northwest', top: sharp(data1).metadata.height },
                                { input: data3, gravity: 'northwest', top: sharp(data1).metadata.height + sharp(data2).metadata.height }
                            ])
                            .jpeg()
                            .toBuffer();
                    });
            });
    })
    .then((finalData) => {
        fs.writeFileSync('/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/output/final-image.jpg', finalData);
        console.log('Final image saved.');
    })
    .catch((err) => {
        console.error(err);
    });
