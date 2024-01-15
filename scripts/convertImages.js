const sharp = require('sharp');
const fs = require('fs/promises');
const glob = require('glob');

const convert = async (image, outpath) => {
	await sharp(image).resize({ width: 2500, withoutEnlargement: true }).toFile(outpath);
};

const removeAvifFiles = async () => {
	console.log('removing avif files');
	const images = await glob.glob('{blog,docs,static}/**/*.avif');
	for (const image of images) {
		await fs.unlink(image);
	}
};

const convertImagesToWebp = async () => {
	console.log('converting images to webp');
	const paths = await glob.glob('{blog,docs,static}/**/*.{png,jpg}');
	for (const imagePaths of paths) {
		await convert(imagePaths, imagePaths + '.webp');
	}
};

const convertPathsToWebp = async () => {
	console.log('converting image paths to webp');
	const files = await glob.glob('{blog,docs,src}/**/*.{md,mdx,js,jsx}');
	for (const file of files) {
		let fileContent = await fs.readFile(file, 'utf-8');
		fileContent = fileContent.replaceAll(/\.(png|jpg)("|\)| ")/g, '.$1.webp$2');
		await fs.writeFile(file, fileContent);
	}
};

const main = async () => {
	// await removeAvifFiles(); // not needed anymore
	await convertImagesToWebp();
	// await convertPathsToWebp(); // not needed anymore
};

main();
