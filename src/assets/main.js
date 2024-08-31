const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC6QdRLfVp8scBzNRXx5Qs8w&part=snippet%2Cid&order=date&maxResults=9';


const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd253975cddmsh04dec0da120ccc7p133228jsn3f0c4300e232',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

// hay varias maneras de hacer fetch
// este code snippet proviene de la pagina rapidapi
// try {
// 	const response = await fetch(API, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// codigo del curso Asincronismo del prof. Oscar Barajas

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options)
    const data = await response.json()
    return data
}

// se hace una funcion anonima que se llama asi misma, o se ejecuta apenas llegue esta linea de codigo

(async () => {
    try {
        const videos = await fetchData(API);
        // Recorre el array obtenido de la API de youtube
        // aplica un .slice(0,4) para mostrar solo 4
        // join ('') para quitar el separador de coma "," u otro separador y siga iterando todo el HTML
        let view = `
        ${videos.items.map(video => `
             <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,4).join('')}
        `; 

        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();