const fetchPokemon = (name) =>{
    const url = 'https://pokeapi.co/api/v2/pokemon/'+name;
    fetch(url).then(
        (res) =>{
            if( res.status != '200' ){
                changeImage('assets/img/err.gif', null);
            }else{
                return res.json();
            }
        }
    ).then( (data) =>{
        console.log(data);
        getData(data);
        //changeImage(data.sprites.other["official-artwork"].front_default );
        /*screen.innerHTML = `<div>
                                <img style= "transform: scale(200%, 200%); image-rendering: pixelated; " src="${data.sprites.front_default}">
                            </div>`;
        console.log(screen.innerHTML);*/
    } );
};

const buttonSend = document.querySelector('.controls button'); 
const input = document.querySelector('.controls input');
const screen = document.querySelector('.screen');
const image = document.querySelector('.screen div:nth-child(1) img');

const send = buttonSend.addEventListener('click', ()=>{
    if( input.value != '' ){
        fetchPokemon(input.value.toLowerCase());
    }else{
        changeImage('assets/img/err.gif', null);
    }
});
let changeImage = (url, defaulStyle = "/*transform: scale(200%, 200%);*/ height: 50%; width: 50%; object-fit: contain; image-rendering: hight-quality; ") =>{
    image.src = url;
    image.style = defaulStyle;
}
const getData = ( data )=>{
    //name, types, abilities, weight, heght, stats
    let obj ={};
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    const type =  getType( data.types );
    const abilities = getAbilities( data.abilities ); //array
    const stats = getStats( data.stats ); //array

    obj['name'] = name;
    obj['height'] = height;
    obj['weight'] = weight;
    obj['type'] = type; 
    obj['abilities'] = abilities;
    obj['stats'] = stats;
    // const t = document.querySelector('.statistics-container .top span');
    // t.innerText = type;
    console.log(obj);

}
const getType = ( types ) => {
    return types[0].type.name; 
}
const getStats = ( stats ) => {
    return {
        'hp':{
            'base_stat': stats[0].base_stat,
            'effort': stats[0].effort
        },
        'attack':{
            'base_stat': stats[1].base_stat,
            'effort': stats[1].effort
        },
        'defense':{
            'base_stat': stats[2].base_stat,
            'effort': stats[2].effort
        },
        'special-attack':{
            'base_stat': stats[3].base_stat,
            'effort': stats[3].effort
        },
        'special-defense':{
            'base_stat': stats[4].base_stat,
            'effort': stats[4].effort
        },
        'speed':{
            'base_stat': stats[5].base_stat,
            'effort': stats[5].effort
        }
    };
}
const getAbilities = ( abilities ) => {
    let obj = [];
    for( var i = 0; i < abilities.length; i++ ){
        obj.push(abilities[i].ability.name);
    }
    return obj;
}