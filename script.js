document.addEventListener("DOMContentLoaded", function() {
    fetchRandomInfo();

    document.getElementById("toggleButton").addEventListener("click", function() {
        const englishDescription = document.getElementById("englishDescription");
        const isVisible = englishDescription.style.display === "block";
        englishDescription.style.display = isVisible ? "none" : "block";
        this.textContent = isVisible ? "显示英文解释" : "隐藏英文解释";
    });
});

function fetchRandomInfo() {
    fetch('ip/assets/output.json')
        .then(response => response.json())
        .then(data => {
            const keys = Object.keys(data);
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = keys[randomIndex];
            const info = data[randomKey];

            document.getElementById("title").textContent = info.title;
            document.getElementById("definition").textContent = info.definition;
            document.getElementById("description").textContent = info.description;
            document.getElementById("long_description").textContent = info.long_description;
            document.getElementById("english_description").textContent = info.english_description;

            const examplesContainer = document.getElementById("examples");
            examplesContainer.innerHTML = '';
            info.examples.forEach(example => {
                const exampleDiv = document.createElement("div");
                exampleDiv.className = "example";
                exampleDiv.innerHTML = `
                    <span class="example-text">${example.english}</span>
                    <span class="example-text">${example.chinese}</span>
                    <button class="play-button" data-src="${example.audio}">Play Audio</button>
                    <div class="divider"></div>
                `;
                examplesContainer.appendChild(exampleDiv);
            });

            document.querySelectorAll(".play-button").forEach(button => {
                button.addEventListener("click", function() {
                    const audio = new Audio(this.dataset.src);
                    audio.play();
                });
            });
        })
        .catch(error => console.error('Request failed:', error));
}