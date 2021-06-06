function calculateResistance(){
    const rangelowervalue = document.getElementById('range-lower').value;
    const rangehighervalue = document.getElementById('range-higher').value;
    if(!rangelowervalue.length || !rangehighervalue.length){
        alert("Neither input can be empty.");
        return;
    }
    const LowerBound = parseInt(rangelowervalue);
    const UpperBound = parseInt(rangehighervalue);
    if(LowerBound > UpperBound){
        alert("The upper bound must be greater or equal to the lower bound.")
        return;
    }
    const mid = (LowerBound + UpperBound) / 2;
    const range = (UpperBound - LowerBound) / 2;
    let res = 0, onek = 0, fivek = 0, tenk = 0; // fivek refers to 5.1k
    var count, i, j, k, testRes, dist, done = 0;
    const max = 50; // max resistors
    const valid = []
    while(mid - res > 10000){
        if(mid - res > 10000){
            res += 10000;
            tenk ++;
        } else if(mid - res > 5100){
            res += 5100;
            fivek ++;
        } else {
            res += 1000;
            onek ++;
        }
    }
    for(count = 2; mid - res > range && count <= max && done < 3; count ++){
        for(i = count; i >= 0 && done < 3; i--){
            for(j = count - i; j >= 0 && done < 3; j--){
                k = count - i - j;
                testRes = 1/(i/1000+j/5100+k/10000)
                dist = Math.abs(mid - res - testRes)
                if(dist < range){
                    valid.push([i, j, k])
                    done ++;
                }
            }
        }
    }
    done = 0;
    
    while(mid - res > 5100){
        if(mid - res > 5100){
            res += 5100;
            fivek ++;
        } else {
            res += 1000;
            onek ++;
        }
    }
    for(count = 2; mid - res > range && count <= max && done < 3; count ++){
        for(i = count; i >= 0 && done < 3; i--){
            for(j = count - i; j >= 0 && done < 3; j--){
                k = count - i - j;
                testRes = 1/(i/1000+j/5100+k/10000)
                dist = Math.abs(mid - res - testRes)
                if(dist < range){
                    valid.push([i, j, k])
                    done ++;
                }
            }
        }
    }
    done = 0;
    
    while(mid - res > 1000){
        res += 1000;
        onek ++;
    }
    for(count = 2; mid - res > range && count <= max && done < 3; count ++){
        for(i = count; i >= 0 && done < 3; i--){
            for(j = count - i; j >= 0 && done < 3; j--){
                k = count - i - j;
                testRes = 1/(i/1000+j/5100+k/10000)
                dist = Math.abs(mid - res - testRes)
                if(dist < range){
                    valid.push([i, j, k])
                    done ++;
                }
            }
        }
    }

    const ShowLong = document.getElementById('long-display').checked;
    const resistors = valid.map( set => 
        `<div class="resistor-row">${set[0]+onek}x 1kΩ<span class="optional${ShowLong?"":" hidden"}">&nbsp;Resistors</span>, `+
        `${set[1]+fivek}x 5.1kΩ<span class="optional${ShowLong?"":" hidden"}">&nbsp;Resistors</span>, `+
        `and ${set[2]+tenk}x 10kΩ<span class="optional${ShowLong?"":" hidden"}">&nbsp;Resistors</span>.</div>`
    );
    document.getElementById('resistors').innerHTML = "Valid resistor setups:"+resistors.join('\n');
}

function longDisplay(){
    const ShowLong = document.getElementById('long-display').checked;
    const DisplayedResistors = document.getElementsByClassName('optional');
    for(var elem of DisplayedResistors)
        elem.className = `optional${ShowLong?"":" hidden"}`
}

document.onkeydown=() => {
    if(window.event.keyCode=='13'){
        calculateResistance();
    }
}