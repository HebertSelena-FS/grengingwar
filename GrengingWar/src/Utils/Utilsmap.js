// Title: Utils Map
// Author: Selena Wolf 
// Created: 5 / 27 / 22




function Direction8(n, ne, e, se, s, sw, w, nw, player) {
    // ----- row 1 --------
    const home11 = document.getElementById('home/1/1');
    const home12 = document.getElementById('home/1/2');
    const home13 = document.getElementById('home/1/3');
    const home14 = document.getElementById('home/1/4');
    const home15 = document.getElementById('home/1/5');
    const home16 = document.getElementById('home/1/6');
    const home17 = document.getElementById('home/1/7');
    // ----- row 2 --------
    const home21 = document.getElementById('home/2/1');
    const home22 = document.getElementById('home/2/2');
    const home23 = document.getElementById('home/2/3');
    const home24 = document.getElementById('home/2/4');
    const home25 = document.getElementById('home/2/5');
    const home26 = document.getElementById('home/2/6');
    const home27 = document.getElementById('home/2/7');
    // ----- row 3 --------
    const home31 = document.getElementById('home/3/1');
    const home32 = document.getElementById('home/3/2');
    const home33 = document.getElementById('home/3/3');
    const home34 = document.getElementById('home/3/4');
    const home35 = document.getElementById('home/3/5');
    const home36 = document.getElementById('home/3/6');
    const home37 = document.getElementById('home/3/7');
    // ----- row 4 --------
    const home41 = document.getElementById('home/4/1');
    const home42 = document.getElementById('home/4/2');
    const home43 = document.getElementById('home/4/3');
    const home44 = document.getElementById('home/4/4');
    const home45 = document.getElementById('home/4/5');
    const home46 = document.getElementById('home/4/6');
    const home47 = document.getElementById('home/4/7');
    // ----- row 5 --------
    const home51 = document.getElementById('home/5/1');
    const home52 = document.getElementById('home/5/2');
    const home53 = document.getElementById('home/5/3');
    const home54 = document.getElementById('home/5/4');
    const home55 = document.getElementById('home/5/5');
    const home56 = document.getElementById('home/5/6');
    const home57 = document.getElementById('home/5/7');
    // ----- row 6 --------
    const home61 = document.getElementById('home/6/1');
    const home62 = document.getElementById('home/6/2');
    const home63 = document.getElementById('home/6/3');
    const home64 = document.getElementById('home/6/4');
    const home65 = document.getElementById('home/6/5');
    const home66 = document.getElementById('home/6/6');
    const home67 = document.getElementById('home/6/7');
    // ----- row 7 --------
    const home71 = document.getElementById('home/7/1');
    const home72 = document.getElementById('home/7/2');
    const home73 = document.getElementById('home/7/3');
    const home74 = document.getElementById('home/7/4');
    const home75 = document.getElementById('home/7/5');
    const home76 = document.getElementById('home/7/6');
    const home77 = document.getElementById('home/7/7');
        let north = n.style.backgroundColor;
        let northeast = ne.style.backgroundColor;
        let east = e.style.backgroundColor;
        let southeast = se.style.backgroundColor;
        let south = s.style.backgroundColor;
        let southwest = sw.style.backgroundColor;
        let west = w.style.backgroundColor;
        let northwest = nw.style.backgroundColor;
            
        if (north === "yellow" ||
            northeast === "yellow" ||
            east === "yellow" ||
            southeast === "yellow" ||
            south === "yellow" ||
            southwest === "yellow" ||
            west === "yellow" ||
            northwest === "yellow")
        {
            // ---------- row 1 ------------
            home11.style.backgroundColor = 'aqua';
            home12.style.backgroundColor = 'aqua';
            home13.style.backgroundColor = 'aqua';
            home14.style.backgroundColor = 'aqua';
            home15.style.backgroundColor = 'aqua';
            home16.style.backgroundColor = 'aqua';
            home17.style.backgroundColor = 'aqua';
            // ---------- row 2 ------------
            home21.style.backgroundColor = 'aqua';
            home22.style.backgroundColor = 'aqua';
            home23.style.backgroundColor = 'aqua';
            home24.style.backgroundColor = 'aqua';
            home25.style.backgroundColor = 'aqua';
            home26.style.backgroundColor = 'aqua';
            home27.style.backgroundColor = 'aqua';
            // ---------- row 3 ------------
            home31.style.backgroundColor = 'aqua';
            home32.style.backgroundColor = 'aqua';
            home33.style.backgroundColor = 'aqua';
            home34.style.backgroundColor = 'aqua';
            home35.style.backgroundColor = 'aqua';
            home36.style.backgroundColor = 'aqua';
            home37.style.backgroundColor = 'aqua';
            // ---------- row 4 ------------
            home41.style.backgroundColor = 'aqua';
            home42.style.backgroundColor = 'aqua';
            home43.style.backgroundColor = 'aqua';
            home44.style.backgroundColor = 'aqua';
            home45.style.backgroundColor = 'aqua';
            home46.style.backgroundColor = 'aqua';
            home47.style.backgroundColor = 'aqua';
            // ---------- row 5 ------------
            home51.style.backgroundColor = 'aqua';
            home52.style.backgroundColor = 'aqua';
            home53.style.backgroundColor = 'aqua';
            home54.style.backgroundColor = 'aqua';
            home55.style.backgroundColor = 'aqua';
            home56.style.backgroundColor = 'aqua';
            home57.style.backgroundColor = 'aqua';
            // ---------- row 6 ------------
            home61.style.backgroundColor = 'aqua';
            home62.style.backgroundColor = 'aqua';
            home63.style.backgroundColor = 'aqua';
            home64.style.backgroundColor = 'aqua';
            home65.style.backgroundColor = 'aqua';
            home66.style.backgroundColor = 'aqua';
            home67.style.backgroundColor = 'aqua';
            // ---------- row 7 ------------
            home71.style.backgroundColor = 'aqua';
            home72.style.backgroundColor = 'aqua';
            home73.style.backgroundColor = 'aqua';
            home74.style.backgroundColor = 'aqua';
            home75.style.backgroundColor = 'aqua';
            home76.style.backgroundColor = 'aqua';
            home77.style.backgroundColor = 'aqua';
            // -------- location color change --------
            player.style.backgroundColor = 'yellow'
        }
    }
    function Map(sectorid) {
        const sectorcolor = sectorid.style.backgroundColor;
        if (sectorcolor === 'aqua') {
            sectorid.style.backgroundColor = 'yellow';
            
        }
    }
function Direction3(c1, c2, c3, player) {
    // ----- row 1 --------
    const home11 = document.getElementById('home/1/1');
    const home12 = document.getElementById('home/1/2');
    const home13 = document.getElementById('home/1/3');
    const home14 = document.getElementById('home/1/4');
    const home15 = document.getElementById('home/1/5');
    const home16 = document.getElementById('home/1/6');
    const home17 = document.getElementById('home/1/7');
    // ----- row 2 --------
    const home21 = document.getElementById('home/2/1');
    const home22 = document.getElementById('home/2/2');
    const home23 = document.getElementById('home/2/3');
    const home24 = document.getElementById('home/2/4');
    const home25 = document.getElementById('home/2/5');
    const home26 = document.getElementById('home/2/6');
    const home27 = document.getElementById('home/2/7');
    // ----- row 3 --------
    const home31 = document.getElementById('home/3/1');
    const home32 = document.getElementById('home/3/2');
    const home33 = document.getElementById('home/3/3');
    const home34 = document.getElementById('home/3/4');
    const home35 = document.getElementById('home/3/5');
    const home36 = document.getElementById('home/3/6');
    const home37 = document.getElementById('home/3/7');
    // ----- row 4 --------
    const home41 = document.getElementById('home/4/1');
    const home42 = document.getElementById('home/4/2');
    const home43 = document.getElementById('home/4/3');
    const home44 = document.getElementById('home/4/4');
    const home45 = document.getElementById('home/4/5');
    const home46 = document.getElementById('home/4/6');
    const home47 = document.getElementById('home/4/7');
    // ----- row 5 --------
    const home51 = document.getElementById('home/5/1');
    const home52 = document.getElementById('home/5/2');
    const home53 = document.getElementById('home/5/3');
    const home54 = document.getElementById('home/5/4');
    const home55 = document.getElementById('home/5/5');
    const home56 = document.getElementById('home/5/6');
    const home57 = document.getElementById('home/5/7');
    // ----- row 6 --------
    const home61 = document.getElementById('home/6/1');
    const home62 = document.getElementById('home/6/2');
    const home63 = document.getElementById('home/6/3');
    const home64 = document.getElementById('home/6/4');
    const home65 = document.getElementById('home/6/5');
    const home66 = document.getElementById('home/6/6');
    const home67 = document.getElementById('home/6/7');
    // ----- row 7 --------
    const home71 = document.getElementById('home/7/1');
    const home72 = document.getElementById('home/7/2');
    const home73 = document.getElementById('home/7/3');
    const home74 = document.getElementById('home/7/4');
    const home75 = document.getElementById('home/7/5');
    const home76 = document.getElementById('home/7/6');
    const home77 = document.getElementById('home/7/7');
    const d1 = c1.style.backgroundColor;
    const d2 = c2.style.backgroundColor;
    const d3 = c3.style.backgroundColor;

    if (d1 === 'yellow' || d2 === 'yellow' || d3 === 'yellow') {
// ---------- row 1 ------------
home11.style.backgroundColor = 'aqua';
home12.style.backgroundColor = 'aqua';
home13.style.backgroundColor = 'aqua';
home14.style.backgroundColor = 'aqua';
home15.style.backgroundColor = 'aqua';
home16.style.backgroundColor = 'aqua';
home17.style.backgroundColor = 'aqua';
// ---------- row 2 ------------
home21.style.backgroundColor = 'aqua';
home22.style.backgroundColor = 'aqua';
home23.style.backgroundColor = 'aqua';
home24.style.backgroundColor = 'aqua';
home25.style.backgroundColor = 'aqua';
home26.style.backgroundColor = 'aqua';
home27.style.backgroundColor = 'aqua';
// ---------- row 3 ------------
home31.style.backgroundColor = 'aqua';
home32.style.backgroundColor = 'aqua';
home33.style.backgroundColor = 'aqua';
home34.style.backgroundColor = 'aqua';
home35.style.backgroundColor = 'aqua';
home36.style.backgroundColor = 'aqua';
home37.style.backgroundColor = 'aqua';
// ---------- row 4 ------------
home41.style.backgroundColor = 'aqua';
home42.style.backgroundColor = 'aqua';
home43.style.backgroundColor = 'aqua';
home44.style.backgroundColor = 'aqua';
home45.style.backgroundColor = 'aqua';
home46.style.backgroundColor = 'aqua';
home47.style.backgroundColor = 'aqua';
// ---------- row 5 ------------
home51.style.backgroundColor = 'aqua';
home52.style.backgroundColor = 'aqua';
home53.style.backgroundColor = 'aqua';
home54.style.backgroundColor = 'aqua';
home55.style.backgroundColor = 'aqua';
home56.style.backgroundColor = 'aqua';
home57.style.backgroundColor = 'aqua';
// ---------- row 6 ------------
home61.style.backgroundColor = 'aqua';
home62.style.backgroundColor = 'aqua';
home63.style.backgroundColor = 'aqua';
home64.style.backgroundColor = 'aqua';
home65.style.backgroundColor = 'aqua';
home66.style.backgroundColor = 'aqua';
home67.style.backgroundColor = 'aqua';
// ---------- row 7 ------------
home71.style.backgroundColor = 'aqua';
home72.style.backgroundColor = 'aqua';
home73.style.backgroundColor = 'aqua';
home74.style.backgroundColor = 'aqua';
home75.style.backgroundColor = 'aqua';
home76.style.backgroundColor = 'aqua';
home77.style.backgroundColor = 'aqua';
        player.style.backgroundColor = 'yellow'

    }
        
}
function Direction5(d1, d2, d3, d4, d5, player) {
    // ----- row 1 --------
    const home11 = document.getElementById('home/1/1');
    const home12 = document.getElementById('home/1/2');
    const home13 = document.getElementById('home/1/3');
    const home14 = document.getElementById('home/1/4');
    const home15 = document.getElementById('home/1/5');
    const home16 = document.getElementById('home/1/6');
    const home17 = document.getElementById('home/1/7');
    // ----- row 2 --------
    const home21 = document.getElementById('home/2/1');
    const home22 = document.getElementById('home/2/2');
    const home23 = document.getElementById('home/2/3');
    const home24 = document.getElementById('home/2/4');
    const home25 = document.getElementById('home/2/5');
    const home26 = document.getElementById('home/2/6');
    const home27 = document.getElementById('home/2/7');
    // ----- row 3 --------
    const home31 = document.getElementById('home/3/1');
    const home32 = document.getElementById('home/3/2');
    const home33 = document.getElementById('home/3/3');
    const home34 = document.getElementById('home/3/4');
    const home35 = document.getElementById('home/3/5');
    const home36 = document.getElementById('home/3/6');
    const home37 = document.getElementById('home/3/7');
    // ----- row 4 --------
    const home41 = document.getElementById('home/4/1');
    const home42 = document.getElementById('home/4/2');
    const home43 = document.getElementById('home/4/3');
    const home44 = document.getElementById('home/4/4');
    const home45 = document.getElementById('home/4/5');
    const home46 = document.getElementById('home/4/6');
    const home47 = document.getElementById('home/4/7');
    // ----- row 5 --------
    const home51 = document.getElementById('home/5/1');
    const home52 = document.getElementById('home/5/2');
    const home53 = document.getElementById('home/5/3');
    const home54 = document.getElementById('home/5/4');
    const home55 = document.getElementById('home/5/5');
    const home56 = document.getElementById('home/5/6');
    const home57 = document.getElementById('home/5/7');
    // ----- row 6 --------
    const home61 = document.getElementById('home/6/1');
    const home62 = document.getElementById('home/6/2');
    const home63 = document.getElementById('home/6/3');
    const home64 = document.getElementById('home/6/4');
    const home65 = document.getElementById('home/6/5');
    const home66 = document.getElementById('home/6/6');
    const home67 = document.getElementById('home/6/7');
    // ----- row 7 --------
    const home71 = document.getElementById('home/7/1');
    const home72 = document.getElementById('home/7/2');
    const home73 = document.getElementById('home/7/3');
    const home74 = document.getElementById('home/7/4');
    const home75 = document.getElementById('home/7/5');
    const home76 = document.getElementById('home/7/6');
    const home77 = document.getElementById('home/7/7');
    const w1 = d1.style.backgroundColor;
    const w2 = d2.style.backgroundColor;
    const w3 = d3.style.backgroundColor;
    const w4 = d4.style.backgroundColor;
    const w5 = d5.style.backgroundColor;
    if (w1 === "yellow" || w2 === "yellow" || w3 === "yellow" || w4 === "yellow" || w5 === "yellow" ) {
// ---------- row 1 ------------
home11.style.backgroundColor = 'aqua';
home12.style.backgroundColor = 'aqua';
home13.style.backgroundColor = 'aqua';
home14.style.backgroundColor = 'aqua';
home15.style.backgroundColor = 'aqua';
home16.style.backgroundColor = 'aqua';
home17.style.backgroundColor = 'aqua';
// ---------- row 2 ------------
home21.style.backgroundColor = 'aqua';
home22.style.backgroundColor = 'aqua';
home23.style.backgroundColor = 'aqua';
home24.style.backgroundColor = 'aqua';
home25.style.backgroundColor = 'aqua';
home26.style.backgroundColor = 'aqua';
home27.style.backgroundColor = 'aqua';
// ---------- row 3 ------------
home31.style.backgroundColor = 'aqua';
home32.style.backgroundColor = 'aqua';
home33.style.backgroundColor = 'aqua';
home34.style.backgroundColor = 'aqua';
home35.style.backgroundColor = 'aqua';
home36.style.backgroundColor = 'aqua';
home37.style.backgroundColor = 'aqua';
// ---------- row 4 ------------
home41.style.backgroundColor = 'aqua';
home42.style.backgroundColor = 'aqua';
home43.style.backgroundColor = 'aqua';
home44.style.backgroundColor = 'aqua';
home45.style.backgroundColor = 'aqua';
home46.style.backgroundColor = 'aqua';
home47.style.backgroundColor = 'aqua';
// ---------- row 5 ------------
home51.style.backgroundColor = 'aqua';
home52.style.backgroundColor = 'aqua';
home53.style.backgroundColor = 'aqua';
home54.style.backgroundColor = 'aqua';
home55.style.backgroundColor = 'aqua';
home56.style.backgroundColor = 'aqua';
home57.style.backgroundColor = 'aqua';
// ---------- row 6 ------------
home61.style.backgroundColor = 'aqua';
home62.style.backgroundColor = 'aqua';
home63.style.backgroundColor = 'aqua';
home64.style.backgroundColor = 'aqua';
home65.style.backgroundColor = 'aqua';
home66.style.backgroundColor = 'aqua';
home67.style.backgroundColor = 'aqua';
// ---------- row 7 ------------
home71.style.backgroundColor = 'aqua';
home72.style.backgroundColor = 'aqua';
home73.style.backgroundColor = 'aqua';
home74.style.backgroundColor = 'aqua';
home75.style.backgroundColor = 'aqua';
home76.style.backgroundColor = 'aqua';
home77.style.backgroundColor = 'aqua';
            // -------- location color change --------
            player.style.backgroundColor = 'yellow'
        }
    }
function Spawn() {
    let spawn = `
    <Tree />`
    let container = document.getElementById('resources');
    let div = document.createElement('div')
    container.appendChild(div)
    div.innerHTML = spawn
   
}

export {
    Map,
    Direction8,
    Direction5,
    Direction3,
    Spawn,
}