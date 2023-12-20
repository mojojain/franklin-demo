export default function decorate(block) {
    const rootPath = block.innerText.trim();
    console.log(rootPath);

    fetch('/query-index.json').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        const ul = document.createElement('ul');

        // Filter data based on root path
        let filteredData = data.data;
        if (rootPath) filteredData = data.data.filter(page => page.path.indexOf(rootPath) !== -1);

        filteredData.forEach((item) => {
            const li = document.createElement('li');

            const div = document.createElement('div');
            div.classList.add('page-list__info');
            
            const a = document.createElement('a');
            a.href = `${item.path}`;
            a.textContent = item.title;

            const img = document.createElement('img');
            img.src = `${item.image.startsWith('/default-meta-image.png') ? 'https://placehold.co/250x250?text=No+Image' : item.image}`;
            img.alt = `${item.title}`;

            const p = document.createElement('p');
            p.textContent = item.description ? item.description : 'No description available';

            li.append(a);
            div.append(img);
            div.append(p);
            li.append(div);

            ul.append(li);
        });
        block.textContent = '';
        block.append(ul);
    });
}
