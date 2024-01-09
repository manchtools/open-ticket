// place files you want to import through the `$lib` alias in this folder.

export function parsePojo(pojo) {
	JSON.parse(JSON.stringify(pojo));
}
