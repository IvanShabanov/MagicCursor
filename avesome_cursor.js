class AvesomeCursor {

    constructor() {
        this.posX = 0;
        this.posY = 0;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    addStrite(x, y, sx, sy, alfa, cr, cg, cb) {

        let Sprites = document.querySelectorAll('.AC_sprites');
        let canAdd = true;
        if (Sprites.length < 1000) {
            if (Sprites.length > 1) {

                for (let i = 0; i < Sprites.length; i++) {

                    if (
                        (Math.round(x) == Math.round(parseFloat(Sprites[i].dataset.x))) &&
                        (Math.round(y) == Math.round(parseFloat(Sprites[i].dataset.y)))
                    ) {
                        canAdd = false;
                    }
                    /*
                    const lx = Sprites[i].dataset.x - x;
                    const ly = Sprites[i].dataset.y - y;
                    const l = Math.sqrt((lx * lx) + (ly * ly));
                    if (l > 1) {
                        Sprites[i].dataset.sx = Sprites[i].dataset.sx + (lx / (l * 1000));
                        Sprites[i].dataset.sy = Sprites[i].dataset.sy + (ly / (l * 1000));
                    }
                    */
                };

            };
            if (canAdd) {
                let element = document.createElement('div');
                element.classList.add('AC_sprites');
                element.dataset.x = x;
                element.dataset.y = y;
                element.dataset.sx = sx;
                element.dataset.sy = sy;
                element.dataset.cr = cr;
                element.dataset.cg = cg;
                element.dataset.cb = cb;

                element.dataset.alfa = alfa;
                element.style.width = '9px';
                element.style.height = '9px';
                element.style.marginTop = '-5px';
                element.style.marginLeft = '-5px';
                element.style.borderRadius = '50%';
                element.style.position = 'absolute';
                element.style.left = '' + x + 'px';
                element.style.top = '' + y + 'px';
                element.style.background = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
                /* element.style.background = 'radial-gradient(circle, rgba(' + cr + ',' + cg + ',' + cb + ', 1) 0%, rgba(' + cr + ',' + cg + ',' + cb + ',0) 90%)'; */
                element.style.opacity = alfa;
                document.body.appendChild(element);
            }
        }

    }

    timer() {
        let obthis = this;
        const Width =  Math.max(
            document.documentElement["clientWidth"],
            document.body["scrollWidth"],
            document.documentElement["scrollWidth"],
            document.body["offsetWidth"],
            document.documentElement["offsetWidth"]
        );

        const Height = Math.max(
            document.documentElement["clientHeight"],
            document.body["clientHeight"],
            document.documentElement["scrollHeight"],
            document.body["offsetHeight"],
            document.documentElement["offsetHeight"]
        );
        let addSprites = [];
        let Sprites = document.querySelectorAll('.AC_sprites');
        if (Sprites.length > 0) {

            Sprites.forEach(function (element, index) {
                const x = parseFloat(element.dataset.x) + (parseFloat(element.dataset.sx) * 0.7);
                const y = parseFloat(element.dataset.y) + (parseFloat(element.dataset.sy) * 0.7);
                const sx = parseFloat(element.dataset.sx) * 0.75;
                const sy = parseFloat(element.dataset.sy) * 0.75;
                const alfa = parseFloat(element.dataset.alfa) * 0.9;
                const speed = Math.sqrt((sx * sx) + (sy * sy));
                const rand = obthis.getRandomInt(40, 100);
                if (
                    /*(Math.sqrt((sx * sx) + (sy * sy)) > 0.1) &&*/
                    (alfa > 0.2) &&
                    ((x > 10) && (x < Width - 10)) &&
                    ((y > 10) && (y < Height - 10))
                    /**/
                ) {
                    element.dataset.x = x;
                    element.dataset.y = y;
                    element.dataset.sx = sx;
                    element.dataset.sy = sy;
                    element.dataset.alfa = alfa;

                    element.style.left = '' + x + 'px';
                    element.style.top = '' + y + 'px';
                    element.style.opacity = alfa;

                    if ((alfa < 0.8) && (speed > 20)) {
                        /* for (let i = 0; i < 7; i = i + 2) { */
                            const alfarad = Math.random() * 6;
                            let nx = x + Math.cos(alfarad) * 20;
                            let ny = y + Math.sin(alfarad) * 20;
                            const nsx = nx - x + (sx * 0.5);
                            const nsy = ny - y + (sy * 0.5);
                            nx = x + Math.cos(alfarad) * 3;
                            ny = y + Math.sin(alfarad) * 3;

                            addSprites[addSprites.length] = [ nx, ny, nsx, nsy, 1 - alfa, element.dataset.cr, element.dataset.cg, element.dataset.cb];
                        /* } */
                    }
                } else {
                    document.body.removeChild(element);
                }

            });
            if (addSprites.length > 0) {
                for (let i = 0; i < addSprites.length; i++) {
                    this.addStrite(
                        addSprites[i][0],
                        addSprites[i][1],
                        addSprites[i][2],
                        addSprites[i][3],
                        addSprites[i][4],
                        addSprites[i][5],
                        addSprites[i][6],
                        addSprites[i][7]
                    );
                }
            }
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    let Ac = new AvesomeCursor();
    let acrunning = true;

    let cr = Ac.getRandomInt(0, 255);
    let cg = Ac.getRandomInt(0, 255);
    let cb = Ac.getRandomInt(0, 255);
    let colocChangeTimer;
    cr = 0;
    cg = 0;
    cb = 0;
    document.querySelector('body').style.background = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
    cr = Ac.getRandomInt(0, 255);
    cg = Ac.getRandomInt(0, 255);
    cb = Ac.getRandomInt(0, 255);

    document.addEventListener('click', function () {
        acrunning = !acrunning;
    })
    document.addEventListener('mousemove', function (event) {
        if ((Ac.posX > 0) && (Ac.posY > 0)) {
            const sx = (event.pageX - Ac.posX) * 3;
            const sy = (event.pageY - Ac.posY) * 3;
            if (Math.sqrt((sx * sx) + (sy * sy)) > 25) {
                Ac.addStrite(Ac.posX - sx, Ac.posY - sy, sx, sy, 1, cr, cg, cb);
                clearTimeout(colocChangeTimer);
                colocChangeTimer = setTimeout(function () {
                    cr = Ac.getRandomInt(128, 255);
                    cg = Ac.getRandomInt(128, 255);
                    cb = Ac.getRandomInt(128, 255);
                }, 300);

            }
        };
        Ac.posX = event.pageX;
        Ac.posY = event.pageY;
    });



    runAc();

    function runAc() {
        if (acrunning) {
            Ac.timer();
        }
        setTimeout(function () {
            runAc();
        }, 40);
    }
});