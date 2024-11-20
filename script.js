// Opciones del reproductor de YouTube
const playerOptions = {
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    enablejsapi: 1,
    iv_load_policy: 3,
    loop: 1,
    modestbranding: 1,
    mute: 1,
    rel: 0,
    showinfo: 0,
    playsinline: 1
};

// ID del video de YouTube
const videoID = "iHiGyFz3oCw";

// Contenedor del reproductor de YouTube
const playerContainer = {
    player: null,

    // Carga la API de YouTube
    loadYouTubeAPI: function() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    // Inicializa el reproductor cuando la API está lista
    onYouTubeIframeAPIReady: function() {
        playerContainer.player = new YT.Player("yt-player", {
            videoId: videoID,
            playerVars: { ...playerOptions, playlist: videoID },
            events: {
                onReady: playerContainer.onPlayerReady,
                onStateChange: playerContainer.onPlayerStateChange
            }
        });
    },

    // Reproducir el video y configurar el redimensionamiento cuando el reproductor está listo
    onPlayerReady: function(event) {
        event.target.playVideo();
        playerContainer.resizeVideo();
        window.addEventListener("resize", playerContainer.resizeVideo);
    },

    // Redimensionar el video según el tamaño de la ventana
    resizeVideo: function() {
        const videoRatio = 16 / 9;
        const windowRatio = window.innerWidth / window.innerHeight;
        const videoElement = document.getElementById("yt-player");

        if (windowRatio > videoRatio) {
            videoElement.style.width = "100vw";
            videoElement.style.height = "calc(100vw * 9 / 16)";
        } else {
            videoElement.style.width = "calc(100vh * 16 / 9)";
            videoElement.style.height = "100vh";
        }
    },

    // Volver al inicio del video cuando termina, sin parpadeo
    onPlayerStateChange: function(event) {
        if (event.data === YT.PlayerState.ENDED) {
            playerContainer.player.seekTo(0);
        }
    }
};

// Cargar la API de YouTube
playerContainer.loadYouTubeAPI();

// Asignar la función de inicialización al objeto global
window.onYouTubeIframeAPIReady = playerContainer.onYouTubeIframeAPIReady;

// Animación de los números de estadísticas
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;

    const updateNumber = () => {
        if (current < target) {
            current += increment;
            number.innerText = Math.ceil(current);
            setTimeout(updateNumber, 20);
        } else {
            number.innerText = target;
        }
    };

    updateNumber();
});