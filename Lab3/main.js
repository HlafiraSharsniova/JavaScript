
    document.addEventListener('keydown', function(e){
        let key = e.key;
        let drum = document.querySelector('[data-d='+key+']');
        let audio = document.querySelector('[data-a='+key+']');

        drum.classList.add('hit');
        setTimeout(() =>{
            drum.classList.remove('hit');
        },100);
        audio.currentTime = 0;
        audio.play();
    });
